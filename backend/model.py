import torch
from torchvision import transforms
from PIL import Image
import numpy as np
from pathlib import Path
import segmentation_models_pytorch as smp

# -------------------------
# Device setup
# -------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -------------------------
# Model path
# -------------------------
model_path = Path(__file__).parent.parent / "models" / "flood_unet.pth"

# -------------------------
# Load model (Segmentation Models PyTorch)
# -------------------------
model = smp.Unet(
    encoder_name="resnet34",  # Update if a different encoder was used
    encoder_weights=None,
    in_channels=3,
    classes=1
)
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

# -------------------------
# Image preprocessing
# -------------------------
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
])

# -------------------------
# Inference function
# -------------------------
def predict(image: Image.Image):
    """
    Input: PIL Image
    Output: binary mask numpy array + alert message
    """
    image_tensor = transform(image).unsqueeze(0).to(device)  # [1, 3, 256, 256]

    with torch.no_grad():
        pred = model(image_tensor)
        pred = torch.sigmoid(pred)
        mask = pred.squeeze().cpu().numpy()
        mask_binary = (mask > 0.5).astype(int)

    alert = "⚠️ Flood detected!" if mask_binary.sum() > 0 else "✅ No flood detected"
    return mask_binary, alert

# -------------------------
# Optional helper to load image from file path
# -------------------------
def load_image(file_path: str) -> Image.Image:
    return Image.open(file_path).convert("RGB")
