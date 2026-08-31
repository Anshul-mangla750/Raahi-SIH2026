from fastapi import APIRouter
from app.models.schemas import RouteScoreRequest, RiskScoreResponse
from app.engine.risk_scoring import compute_route_risk

router = APIRouter(prefix="/risk", tags=["Risk Scoring"])

@router.post("/route-score", response_model=RiskScoreResponse)
async def get_route_score(payload: RouteScoreRequest):
    rainfall = payload.weatherSnapshot.rainfall_24h_mm if payload.weatherSnapshot else 12.0
    slope = payload.slopeRisk or 25.0
    condition = payload.roadCondition or "good"

    result = compute_route_risk(
        route_id=payload.routeId,
        slope_risk=slope,
        road_condition=condition,
        rainfall_mm=rainfall
    )
    return result
