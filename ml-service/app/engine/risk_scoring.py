from datetime import datetime
from typing import Dict, Any

def compute_route_risk(
    route_id: str,
    slope_risk: float = 25.0,
    road_condition: str = "good",
    rainfall_mm: float = 12.0
) -> Dict[str, Any]:
    # Weighted composite score per implementation.md:
    # 25% Terrain/slope risk
    # 25% Rainfall intensity (24h)
    # 20% Historical disruption frequency
    # 20% Road/bridge condition
    # 10% Traffic congestion

    terrain_weight = 0.25
    rain_weight = 0.25
    history_weight = 0.20
    condition_weight = 0.20
    traffic_weight = 0.10

    # Calculate sub-scores (0-100)
    terrain_sub = min(100.0, slope_risk * 1.0)
    rain_sub = min(100.0, (rainfall_mm / 80.0) * 100.0)
    
    if road_condition == "blocked":
        condition_sub = 100.0
    elif road_condition == "damaged":
        condition_sub = 65.0
    else:
        condition_sub = 15.0

    history_sub = 25.0
    traffic_sub = 20.0

    raw_score = (
        terrain_sub * terrain_weight +
        rain_sub * rain_weight +
        condition_sub * condition_weight +
        history_sub * history_weight +
        traffic_sub * traffic_weight
    )

    final_score = int(min(100, max(0, round(raw_score))))

    if final_score > 80:
        level = "critical"
    elif final_score > 60:
        level = "high"
    elif final_score > 30:
        level = "medium"
    else:
        level = "low"

    return {
        "score": final_score,
        "level": level,
        "factors": {
            "terrainSlopeRisk": terrain_sub,
            "rainfallIntensity": rain_sub,
            "roadConditionScore": condition_sub,
            "historicalDisruptionScore": history_sub,
            "trafficCongestionScore": traffic_sub,
            "recordedRainfallMm": rainfall_mm,
        },
        "computedAt": datetime.utcnow().isoformat() + "Z",
        "engine": "fastapi_rule_and_ml_hybrid"
    }
