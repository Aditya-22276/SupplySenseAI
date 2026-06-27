import pandas as pd
import numpy as np
import joblib

from tensorflow.keras.models import load_model

from app.ml.forecasting_models import (
    prepare_forecasting_data
)

SEQUENCE_LENGTH = 30

MODEL_PATH = "app/models_saved/lstm.keras"
SCALER_PATH = "app/models_saved/lstm_scaler.pkl"


def predict_next_30_days():

    model = load_model(MODEL_PATH)

    scaler = joblib.load(
        SCALER_PATH
    )

    df = prepare_forecasting_data()

    values = (
        df["y"]
        .values
        .reshape(-1, 1)
    )

    scaled_values = scaler.transform(
        values
    )

    current_sequence = (
        scaled_values[
            -SEQUENCE_LENGTH:
        ]
        .copy()
    )

    predictions = []

    for _ in range(90):

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
        periods=90
    )

    future_df = pd.DataFrame({
        "ds": future_dates,
        "prediction": predictions.flatten()
    })

    return future_df[
        ["ds", "prediction"]
    ]