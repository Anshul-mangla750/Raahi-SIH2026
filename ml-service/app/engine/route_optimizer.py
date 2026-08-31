from typing import Dict, Any, List

NER_DISTANCES: Dict[str, Dict[str, float]] = {
    "kamrup": {
        "sonitpur": 175.0,
        "east_khasi": 98.0,
        "cachar": 310.0,
        "dimapur": 270.0,
        "papum_pare": 330.0,
        "west_tripura": 550.0,
    },
    "cachar": {
        "aizawl": 168.0,
        "imphal_west": 240.0,
        "kamrup": 310.0,
    },
    "dimapur": {
        "kohima": 74.0,
        "imphal_west": 215.0,
        "kamrup": 270.0,
    }
}

def optimize_route(
    origin: str,
    destination: str,
    commodity: str = "general",
    weight_kg: float = 1000.0
) -> Dict[str, Any]:
    base_distance = NER_DISTANCES.get(origin, {}).get(destination, 185.0)
    avg_speed = 45.0  # km/h in hill terrain
    base_hours = round(base_distance / avg_speed, 1)
    base_fuel = round(base_distance * 14.5, 0)

    # Priority penalty / risk check
    risk_score = 18
    if "imphal" in destination or "dima" in destination:
        risk_score = 75
    elif "aizawl" in destination:
        risk_score = 62

    primary = {
        "name": f"Primary Highway ({origin.title()} → {destination.title()})",
        "distanceKm": base_distance,
        "estimatedHours": base_hours,
        "fuelCostEstimate": base_fuel,
        "riskScore": risk_score,
        "riskLevel": "high" if risk_score > 60 else "low",
        "efficiencyGain": "Direct corridor"
    }

    alternates = [
        {
            "name": f"Low Elevation Foothill Bypass ({origin.title()} → {destination.title()})",
            "distanceKm": round(base_distance * 1.12, 1),
            "estimatedHours": round(base_hours * 1.18, 1),
            "fuelCostEstimate": round(base_fuel * 1.06, 0),
            "riskScore": max(12, risk_score - 35),
            "riskLevel": "low",
            "efficiencyGain": "Avoids high-risk landslide slopes"
        },
        {
            "name": f"Riverine Freight Conjunction Bypass",
            "distanceKm": round(base_distance * 1.25, 1),
            "estimatedHours": round(base_hours * 1.30, 1),
            "fuelCostEstimate": round(base_fuel * 1.15, 0),
            "riskScore": 15,
            "riskLevel": "low",
            "efficiencyGain": "Maximum bridge load tolerance"
        }
    ]

    return {
        "primaryRoute": primary,
        "alternateRoutes": alternates
    }
