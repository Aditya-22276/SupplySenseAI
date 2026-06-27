from app.ml.forecasting_models import (
    forecast_next_30_days,
    forecast_next_90_days
)


def get_30_day_forecast():

    forecast = forecast_next_30_days()

    result = forecast.tail(30)

    return [
        {
            "date": str(row["ds"].date()),
            "prediction": float(row["yhat"]),
            "lower_bound": float(row["yhat_lower"]),
            "upper_bound": float(row["yhat_upper"])
        }
        for _, row in result.iterrows()
    ]

def get_90_day_forecast():

    forecast = forecast_next_90_days()

    result = forecast.tail(90)

    return [
        {
            "date": str(row["ds"].date()),
            "prediction": float(row["yhat"]),
            "lower_bound": float(row["yhat_lower"]),
            "upper_bound": float(row["yhat_upper"])
        }
        for _, row in result.iterrows()
    ]

def get_forecast_summary():

    forecast = forecast_next_90_days()

    predictions = forecast.tail(90)["yhat"]

    return {
        "forecast_days": 90,
        "total_predicted_revenue": float(
            predictions.sum()
        ),
        "average_daily_prediction": float(
            predictions.mean()
        ),
        "highest_prediction": float(
            predictions.max()
        ),
        "lowest_prediction": float(
            predictions.min()
        )
    }