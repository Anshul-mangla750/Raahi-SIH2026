from fastapi import APIRouter
from app.models.schemas import RouteSuggestRequest, RouteSuggestResponse
from app.engine.route_optimizer import optimize_route

router = APIRouter(prefix="/route", tags=["Route Suggestion"])

@router.post("/suggest", response_model=RouteSuggestResponse)
async def suggest_route(payload: RouteSuggestRequest):
    result = optimize_route(
        origin=payload.originDistrictId,
        destination=payload.destDistrictId,
        commodity=payload.commodityType or "general",
        weight_kg=payload.weightKg or 1000.0
    )
    return result
