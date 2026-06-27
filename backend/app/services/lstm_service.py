from app.ml.lstm_forecasting import (
    predict_next_30_days
)


def get_lstm_forecast():

    forecast = predict_next_30_days()

    forecast["ds"] = (
        forecast["ds"]
        .astype(str)
    )

    return forecast.to_dict(
        orient="records"
    )