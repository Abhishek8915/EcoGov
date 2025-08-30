from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io
from model import predict

app = FastAPI(title="Coastal Flood Alert System")

@app.post("/predict/flood")
async def flood_predict(file: UploadFile = File(...)):
    try:
        # Load image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Predict
        mask, alert = predict(image)

        return JSONResponse({
            "alert": alert,
            "mask_shape": mask.shape.tolist()
        })

    except Exception as e:
        return JSONResponse({"error": str(e)})
