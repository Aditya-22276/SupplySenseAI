from fastapi import APIRouter
from typing import List

from app.services.forecast_service import (
    get_30_day_forecast,
    get_90_day_forecast,
    get_forecast_summary
)

from app.schemas.forecast_schema import (
    ForecastResponse,
    ForecastSummaryResponse
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecasting"]
)


@router.get(
    "/30-days",
    response_model=List[ForecastResponse]
)
def forecast_30_days():

    return get_30_day_forecast()


@router.get(
    "/90-days",
    response_model=List[ForecastResponse]
)
def forecast_90_days():

    return get_90_day_forecast()


@router.get(
    "/summary",
    response_model=ForecastSummaryResponse
)
def forecast_summary():

    return get_forecast_summary()