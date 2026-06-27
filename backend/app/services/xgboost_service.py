from app.ml.xgboost_forecasting import (
    predict_next_30_days
)


def get_xgboost_forecast():

    forecast = predict_next_30_days()

    return [
        {
            "date": str(row["ds"].date()),
            "prediction": float(
                row["prediction"]
            )
        }
        for _, row in forecast.iterrows()
    ]