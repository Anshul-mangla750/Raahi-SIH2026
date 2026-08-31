from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class WeatherSnapshot(BaseModel):
    city: Optional[str] = "Guwahati"
    temp_celsius: Optional[float] = 24.0
    rainfall_24h_mm: Optional[float] = 12.0
    humidity_percent: Optional[float] = 78.0
    wind_kmh: Optional[float] = 12.0

class RouteScoreRequest(BaseModel):
    routeId: str
    roadIds: Optional[List[str]] = []
    slopeRisk: Optional[float] = 25.0
    roadCondition: Optional[str] = "good"
    weatherSnapshot: Optional[WeatherSnapshot] = None

class RiskScoreResponse(BaseModel):
    score: int
    level: str
    factors: Dict[str, Any]
    computedAt: str
    engine: str

class DisruptionPredictRequest(BaseModel):
    districtId: str
    weatherSnapshot: Optional[WeatherSnapshot] = None

class DisruptionPredictResponse(BaseModel):
    districtId: str
    landslideRisk: str
    floodRisk: str
    confidenceScore: float
    recommendedBufferDays: int

class RouteSuggestRequest(BaseModel):
    originDistrictId: str
    destDistrictId: str
    commodityType: Optional[str] = "general"
    weightKg: Optional[float] = 1000.0

class RouteOption(BaseModel):
    name: str
    distanceKm: float
    estimatedHours: float
    fuelCostEstimate: float
    riskScore: int
    riskLevel: str
    efficiencyGain: Optional[str] = None

class RouteSuggestResponse(BaseModel):
    primaryRoute: RouteOption
    alternateRoutes: List[RouteOption]
