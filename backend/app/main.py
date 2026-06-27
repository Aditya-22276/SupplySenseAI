from fastapi import FastAPI

from app.database.session import engine
from app.database.init_db import init_db

from app.api.analytics import router as analytics_router
from app.api.forecast import router as forecast_router
from app.api.xgboost import router as xgboost_router
from app.api.lightgbm import router as lightgbm_router
from app.api.model_comparison import (
    router as model_comparison_router
)
from fastapi.middleware.cors import CORSMiddleware
from app.api.inventory import router as inventory_router
from app.api.warehouse import router as warehouse_router
from app.api.supplier import router as supplier_router
from app.api.executive import router as executive_router
from app.api.recommendation import router as recommendation_router
from app.api.lstm import (
    router as lstm_router
)
from app.api.copilot import (
    router as copilot_router
)
from app.api.risk import router as risk_router
from app.api.reports import (
    router as reports_router
)
from app.api.notifications import (
    router as notifications_router
)


app = FastAPI(
    title="SupplySense AI",
    description="AI-Powered Supply Chain Analytics Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routes
app.include_router(analytics_router)
app.include_router(forecast_router)
app.include_router(xgboost_router)
app.include_router(lightgbm_router)
app.include_router(model_comparison_router)
app.include_router(inventory_router)
app.include_router(warehouse_router)
app.include_router(supplier_router)
app.include_router(executive_router)
app.include_router(recommendation_router)
app.include_router(lstm_router)
app.include_router(
    copilot_router,
    prefix="/copilot",
    tags=["AI Copilot"]
)
app.include_router(risk_router)
app.include_router(reports_router)
app.include_router(notifications_router)
    
@app.on_event("startup")
def startup():
    try:
        # Create tables if they don't exist
        init_db()

        # Test database connection
        connection = engine.connect()

        print("Database Connected Successfully")

        connection.close()

    except Exception as e:
        print("Database Connection Failed")
        print(e)


@app.get("/")
def root():
    return {
        "message": "Welcome to SupplySense AI"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

