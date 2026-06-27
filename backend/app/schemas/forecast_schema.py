from pydantic import BaseModel


class ForecastResponse(BaseModel):
    date: str
    prediction: float
    lower_bound: float
    upper_bound: float

class ForecastSummaryResponse(BaseModel):
    forecast_days: int
    total_predicted_revenue: float
    average_daily_prediction: float
    highest_prediction: float
    lowest_prediction: float