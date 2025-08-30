# spill_model.py
from PIL import Image, ImageOps
import numpy as np
import io, base64
from typing import Dict, Any

def _image_to_base64_png(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")

def _overlay_mask(rgb: Image.Image, mask: np.ndarray, alpha: float = 0.4) -> Image.Image:
    # red overlay on masked regions
    overlay = Image.new("RGBA", rgb.size, (255, 0, 0, 0))
    m = (mask > 0).astype(np.uint8) * int(255 * alpha)
    a = Image.fromarray(m).resize(rgb.size, resample=Image.NEAREST)
    overlay.putalpha(a)
    return Image.alpha_composite(rgb.convert("RGBA"), overlay)

def detect_spill_heuristic(image: Image.Image) -> Dict[str, Any]:
    """
    Heuristic detector: looks for dark, low-texture patches (typical oil slick look) on water.
    Works on generic RGB imagery. Fast + demo-friendly.
    """
    # Normalize input
    rgb = ImageOps.exif_transpose(image).convert("RGB")
    small = rgb.resize((512, 512))
    arr = np.asarray(small).astype(np.float32)

    # 1) Estimate "water-ish" pixels: high NDWI-ish proxy using G vs R/B (rough heuristic)
    R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]
    # Simple water score (no real NDWI bands available): green higher than red & blue
    water_score = (G - (R + B) * 0.5)
    water_mask = water_score > 5  # tweakable threshold

    # 2) Within water, find unusually dark, low-variance patches (candidate slick)
    gray = (0.299 * R + 0.587 * G + 0.114 * B)
    # local darkness threshold (percentile over water)
    water_vals = gray[water_mask]
    if water_vals.size == 0:
        # No water found: return safe
        return {
            "alert": "✅ No spill detected (no water found)",
            "coverage_pct": 0.0,
            "mask_base64": None
        }
    dark_thresh = max(10.0, np.percentile(water_vals, 20))
    dark_mask = (gray < dark_thresh) & water_mask

    # Simple morphological clean-up (3x3)
    from scipy.ndimage import binary_opening, binary_closing
    clean = binary_closing(binary_opening(dark_mask, iterations=1), iterations=1)

    # Compute coverage (% of water area)
    water_area = max(1, int(water_mask.sum()))
    slick_area = int(clean.sum())
    coverage = 100.0 * slick_area / water_area

    # Prepare outputs
    mask_img = Image.fromarray((clean.astype(np.uint8) * 255))
    overlay = _overlay_mask(small, clean)
    # Merge overlay with original size for nicer preview
    overlay_full = overlay.resize(rgb.size, resample=Image.NEAREST)
    mask_full = mask_img.resize(rgb.size, resample=Image.NEAREST)

    alert = "⚠️ Possible oil/chemical slick detected" if coverage >= 0.5 else "✅ No spill detected"
    return {
        "alert": alert,
        "coverage_pct": round(float(coverage), 2),
        "mask_base64": _image_to_base64_png(mask_full),
        "overlay_base64": _image_to_base64_png(overlay_full),
    }

# --- Optional ML upgrade path (kept same output schema) ---
# You can implement detect_spill_cnn(image: Image.Image) later and select by mode.
def detect_spill_cnn(image: Image.Image):
    """
    Placeholder for a fine-tuned MobileNet/ResNet classifier/segmenter.
    Keep return keys identical to heuristic for drop-in replacement.
    """
    raise NotImplementedError("CNN mode not implemented yet")
