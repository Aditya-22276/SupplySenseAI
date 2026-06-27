from fastapi import APIRouter

from app.services.lightgbm_service import (
    get_lightgbm_forecast
)

router = APIRouter(
    prefix="/forecast",
    tags=["LightGBM Forecasting"]
)


@router.get("/lightgbm")
def lightgbm_forecast():

    return get_lightgbm_forecast()