import logging
import os

import joblib
import pandas as pd

from app.ml.forecasting_models import (
    prepare_forecasting_data
)

logger = logging.getLogger(__name__)

MODEL_PATH = "app/models_saved/xgboost.pkl"


def predict_next_30_days():

    try:

        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found: {MODEL_PATH}"
            )

        logger.info("Loading XGBoost model...")

        model = joblib.load(MODEL_PATH)

        logger.info("Model loaded successfully.")

        df = prepare_forecasting_data()

        if df.empty:
            raise ValueError(
                "Forecasting dataset is empty."
            )

        last_date = df["ds"].max()

        future_dates = pd.date_range(
            start=last_date + pd.Timedelta(days=1),
            periods=30,
            freq="D"
        )

        future_df = pd.DataFrame(
            {
                "ds": future_dates
            }
        )

        future_df["year"] = future_df["ds"].dt.year
        future_df["month"] = future_df["ds"].dt.month
        future_df["day"] = future_df["ds"].dt.day
        future_df["day_of_week"] = (
            future_df["ds"].dt.dayofweek
        )

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

        logger.info(
            "XGBoost 30-day forecast generated successfully."
        )

        return future_df[
            [
                "ds",
                "prediction"
            ]
        ]

    except Exception as e:

        logger.exception(
            "XGBoost Forecast Failed"
        )

        raise Exception(
            f"XGBoost Forecast Error: {e}"
        )