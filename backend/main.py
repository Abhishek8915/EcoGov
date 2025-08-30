# from fastapi import FastAPI, UploadFile, File
# from fastapi.responses import JSONResponse
# from PIL import Image
# import io
# from model import predict
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(title="Coastal Flood Alert System")

# origins = [
#     "http://localhost:8080",   # React/Next.js dev server
#     "http://127.0.0.1:8000",

# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],   # allow everything (good for dev/hackathon)
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# async def root():
#     return {"message": "Coastal Flood Alert API is running 🚀"}


# @app.post("/predict/flood")
# async def flood_predict(file: UploadFile = File(...)):
#     try:
#         # Load image
#         contents = await file.read()
#         image = Image.open(io.BytesIO(contents)).convert("RGB")

#         # Predict
#         mask, alert = predict(image)

#         return JSONResponse({
#             "alert": alert,
#             "mask_shape": list(mask.shape)  # safe for tuples
#         })

#     except Exception as e:
#         return JSONResponse({"error": str(e)})




############################################################


from fastapi import FastAPI, UploadFile, File, Query
from fastapi.responses import JSONResponse
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware
from model import predict, predict_from_latlon  # import both models

app = FastAPI(title="Coastal Flood Alert System")

# -------------------------
# CORS setup
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow everything (good for dev/hackathon)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Root route
# -------------------------
@app.get("/")
async def root():
    return {"message": "Coastal Flood Alert API is running 🚀"}

# -------------------------
# Flood image prediction
# -------------------------
@app.post("/predict/flood")
async def flood_predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        mask, alert = predict(image)
        return JSONResponse({
            "alert": alert,
            "mask_shape": list(mask.shape)  # works for NumPy or tuple
        })
    except Exception as e:
        return JSONResponse({"error": str(e)})

# -------------------------
# Location-based prediction
# -------------------------
@app.get("/predict/location")
async def location_predict(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude")
):
    try:
        result = predict_from_latlon(lat, lon)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({"error": str(e)})


# main.py (add near other imports)
from spill_model import detect_spill_heuristic  # new

# ... keep existing routes ...

# -------------------------
# Spill detection (image upload)
# -------------------------
# from fastapi import Form

# @app.post("/detect/spill")
# async def detect_spill(
#     file: UploadFile = File(...),
#     mode: str = Form("heuristic")  # "heuristic" now, "cnn" later
# ):
#     try:
#         contents = await file.read()
#         from PIL import Image
#         import io
#         image = Image.open(io.BytesIO(contents)).convert("RGB")

#         if mode == "heuristic":
#             result = detect_spill_heuristic(image)
#         else:
#             # placeholder—switch to CNN when ready
#             result = detect_spill_heuristic(image)

#         return JSONResponse(result)
#     except Exception as e:
#         return JSONResponse({"error": str(e)})
