# import torch
# from torchvision import transforms
# from PIL import Image
# import numpy as np
# from pathlib import Path
# import segmentation_models_pytorch as smp

# # -------------------------
# # Device setup
# # -------------------------
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # -------------------------
# # Model path
# # -------------------------
# model_path = Path(__file__).parent.parent / "models" / "flood_unet.pth"

# # -------------------------
# # Load model (Segmentation Models PyTorch)
# # -------------------------
# model = smp.Unet(
#     encoder_name="resnet34",  # Update if a different encoder was used
#     encoder_weights=None,
#     in_channels=3,
#     classes=1
# )
# model.load_state_dict(torch.load(model_path, map_location=device))
# model.to(device)
# model.eval()

# # -------------------------
# # Image preprocessing
# # -------------------------
# transform = transforms.Compose([
#     transforms.Resize((256, 256)),
#     transforms.ToTensor(),
# ])

# # -------------------------
# # Inference function
# # -------------------------
# def predict(image: Image.Image):
#     """
#     Input: PIL Image
#     Output: binary mask numpy array + alert message
#     """
#     image_tensor = transform(image).unsqueeze(0).to(device)  # [1, 3, 256, 256]

#     with torch.no_grad():
#         pred = model(image_tensor)
#         pred = torch.sigmoid(pred)
#         mask = pred.squeeze().cpu().numpy()
#         mask_binary = (mask > 0.5).astype(int)

#     alert = "⚠️ Flood detected!" if mask_binary.sum() > 0 else "✅ No flood detected"
#     return mask_binary, alert

# # -------------------------
# # Optional helper to load image from file path
# # -------------------------
# def load_image(file_path: str) -> Image.Image:
#     return Image.open(file_path).convert("RGB")


####################################################################


import torch
from torchvision import transforms
from PIL import Image
import numpy as np
from pathlib import Path
import segmentation_models_pytorch as smp
import joblib

# -------------------------
# Device setup
# -------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -------------------------
# UNet Model path
# -------------------------
unet_model_path = Path(__file__).parent.parent / "models" / "flood_unet.pth"

# -------------------------
# Load UNet model (Segmentation Models PyTorch)
# -------------------------
unet_model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights=None,
    in_channels=3,
    classes=1
)
unet_model.load_state_dict(torch.load(unet_model_path, map_location=device))
unet_model.to(device)
unet_model.eval()

# -------------------------
# Image preprocessing
# -------------------------
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
])

# -------------------------
# UNet Inference function
# -------------------------


def predict(image: Image.Image):
    """
    Input: PIL Image
    Output: binary mask numpy array + alert message
    """
    image_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        pred = unet_model(image_tensor)
        pred = torch.sigmoid(pred)
        mask = pred.squeeze().cpu().numpy()
        mask_binary = (mask > 0.5).astype(int)

    alert = "⚠️ Flood detected!" if mask_binary.sum() > 0 else "✅ No flood detected"
    return mask_binary, alert


# -------------------------
# XGBoost Model path
# -------------------------
xgb_model_path = Path(__file__).parent.parent / \
    "models" / "xgb_best_model.joblib"
xgb_model = joblib.load(xgb_model_path)

# -------------------------
# Lat/Lon-based prediction
# -------------------------


def predict_from_latlon(lat: float, lon: float):
    """
    Input: latitude and longitude
    Output: features + risk score + alert
    """
    # Dummy feature values (hackathon/demo)
    features = {
        "NDVI_mean": 0.462,
        "NDWI_mean": -0.052,
        "Sentinel1_VH_mean": -19.765,
        "Elevation": 33.635,
        "Slope": 2.86,
        "Annual_rainfall": 2059.63,
        "Distance_to_coast": 1296.51
    }

    X = np.array(list(features.values())).reshape(1, -1)

    risk_score = xgb_model.predict_proba(X)[0][1]  # probability of class 1

    alert = "⚠️ High Risk" if risk_score > 0.5 else "✅ Low Risk"

    return {
        "latitude": lat,
        "longitude": lon,
        "features": features,
        "risk_score": float(risk_score),
        "alert": alert
    }

# -------------------------
# Optional helper to load image from file path
# -------------------------


def load_image(file_path: str) -> Image.Image:
    return Image.open(file_path).convert("RGB")
