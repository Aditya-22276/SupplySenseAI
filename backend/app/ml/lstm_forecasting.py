import logging
import os

import joblib
import numpy as np
import pandas as pd

from tensorflow.keras.models import load_model

from app.ml.forecasting_models import (
    prepare_forecasting_data
)

logger = logging.getLogger(__name__)

SEQUENCE_LENGTH = 30

MODEL_PATH = "app/models_saved/lstm.keras"
SCALER_PATH = "app/models_saved/lstm_scaler.pkl"


def predict_next_30_days():

    try:

        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"LSTM model not found: {MODEL_PATH}"
            )

        if not os.path.exists(SCALER_PATH):
            raise FileNotFoundError(
                f"Scaler not found: {SCALER_PATH}"
            )

        logger.info("Loading LSTM model...")

        model = load_model(MODEL_PATH)

        scaler = joblib.load(
            SCALER_PATH
        )

        logger.info("Model and scaler loaded successfully.")

        df = prepare_forecasting_data()

        if df.empty:
            raise ValueError(
                "Forecast dataset is empty."
            )

        values = (
            df["y"]
            .values
            .reshape(-1, 1)
        )

        scaled_values = scaler.transform(
            values
        )

        if len(scaled_values) < SEQUENCE_LENGTH:
            raise ValueError(
                "Not enough historical data for LSTM prediction."
            )

        current_sequence = (
            scaled_values[
                -SEQUENCE_LENGTH:
            ]
            .copy()
        )

        predictions = []

        for _ in range(30):

            pred = model.predict(
                current_sequence.reshape(
                    1,
                    SEQUENCE_LENGTH,
                    1
                ),
                verbose=0
            )

            predictions.append(
                pred[0][0]
            )

            current_sequence = np.vstack(
                [
                    current_sequence[1:],
                    pred
                ]
            )

        predictions = scaler.inverse_transform(
            np.array(predictions)
            .reshape(-1, 1)
        )

        future_dates = pd.date_range(
            start=df["ds"].max()
            + pd.Timedelta(days=1),
            periods=30,
            freq="D"
        )

        future_df = pd.DataFrame(
            {
                "ds": future_dates,
                "prediction": predictions.flatten()
            }
        )

        logger.info(
            "LSTM 30-day forecast generated successfully."
        )

        return future_df[
            [
                "ds",
                "prediction"
            ]
        ]

    except Exception as e:

        logger.exception(
            "LSTM Forecast Failed"
        )

        raise Exception(
            f"LSTM Forecast Error: {e}"
        )