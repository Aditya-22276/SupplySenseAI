from pydantic import BaseModel


class MonthlyForecastResponse(BaseModel):
    month: str
    predicted_revenue: float