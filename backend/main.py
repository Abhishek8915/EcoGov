from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io
from model import predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Coastal Flood Alert System")

origins = [
    "http://localhost:8080",   # React/Next.js dev server
    "http://127.0.0.1:8000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow everything (good for dev/hackathon)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Coastal Flood Alert API is running 🚀"}


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
            "mask_shape": list(mask.shape)  # safe for tuples
        })

    except Exception as e:
        return JSONResponse({"error": str(e)})
