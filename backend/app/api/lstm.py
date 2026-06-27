from fastapi import APIRouter

from app.services.lstm_service import (
    get_lstm_forecast
)

router = APIRouter(
    prefix="/forecast",
    tags=["LSTM Forecast"]
)


@router.get("/lstm")
def lstm_forecast():
    return get_lstm_forecast()