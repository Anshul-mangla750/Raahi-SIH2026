from fastapi import APIRouter
from app.models.schemas import DisruptionPredictRequest, DisruptionPredictResponse

router = APIRouter(prefix="/risk", tags=["Disruption Prediction"])

@router.post("/disruption-predict", response_model=DisruptionPredictResponse)
async def predict_disruption(payload: DisruptionPredictRequest):
    did = payload.districtId.lower()
    
    landslide = "Low"
    flood = "Low"
    buffer_days = 15

    if "dima" in did or "khasi" in did:
        landslide = "High"
        buffer_days = 30
    elif "cachar" in did or "kamrup" in did:
        flood = "Medium"
        buffer_days = 20
    elif "imphal" in did:
        landslide = "High"
        flood = "High"
        buffer_days = 45

    return {
        "districtId": payload.districtId,
        "landslideRisk": landslide,
        "floodRisk": flood,
        "confidenceScore": 0.91,
        "recommendedBufferDays": buffer_days
    }
