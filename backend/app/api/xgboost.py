from fastapi import APIRouter

from app.services.xgboost_service import (
    get_xgboost_forecast
)

router = APIRouter(
    prefix="/forecast",
    tags=["XGBoost Forecasting"]
)


@router.get("/xgboost")
def xgboost_forecast():

    return get_xgboost_forecast()