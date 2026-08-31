from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import risk, disruption, route_suggestion

app = FastAPI(
    title="NER Smart Logistics ML & Risk Engine",
    description="Microservice providing route risk scoring, disruption forecasting, and alternate route generation for North East India.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(risk.router)
app.include_router(disruption.router)
app.include_router(route_suggestion.router)

@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "NER LogiSmart ML Engine (FastAPI)",
        "engineMode": "hybrid_rule_and_ml",
        "supportedRegions": ["Assam", "Meghalaya", "Manipur", "Nagaland", "Tripura", "Mizoram", "Arunachal Pradesh", "Sikkim"]
    }
