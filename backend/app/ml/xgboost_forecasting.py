import pandas as pd
import joblib

from app.ml.forecasting_models import (
    prepare_forecasting_data
)

MODEL_PATH = "app/models_saved/xgboost.pkl"


def predict_next_30_days():

    model = joblib.load(MODEL_PATH)

    df = prepare_forecasting_data()

    last_date = df["ds"].max()

    future_dates = pd.date_range(
        start=last_date + pd.Timedelta(days=1),
        periods=30
    )

    future_df = pd.DataFrame({
        "ds": future_dates
    })

    future_df["year"] = future_df["ds"].dt.year
    future_df["month"] = future_df["ds"].dt.month
    future_df["day"] = future_df["ds"].dt.day
    future_df["day_of_week"] = future_df["ds"].dt.dayofweek

    X_future = future_df[
        [
            "year",
            "month",
            "day",
            "day_of_week"
        ]
    ]

    future_df["prediction"] = model.predict(
        X_future
    )

    return future_df[
        ["ds", "prediction"]
    ]