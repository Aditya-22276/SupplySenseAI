import numpy as np

from sklearn.metrics import (
    mean_squared_error,
    mean_absolute_error
)

from prophet import Prophet

from app.ml.forecasting_models import (
    prepare_forecasting_data
)

import joblib
import pandas as pd

from sklearn.metrics import (
    mean_squared_error,
    mean_absolute_error
)
from tensorflow.keras.models import (
    load_model
)

from app.services.mlflow_service import (
    log_model_metrics
)


def evaluate_prophet():

    df = prepare_forecasting_data()

    # Last 30 days for testing
    train = df[:-30]
    test = df[-30:]

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False
    )

    model.fit(train)

    future = model.make_future_dataframe(
        periods=30
    )

    forecast = model.predict(future)

    predictions = (
        forecast["yhat"]
        .tail(30)
        .values
    )

    actuals = test["y"].values

    rmse = np.sqrt(
        mean_squared_error(
            actuals,
            predictions
        )
    )

    mae = mean_absolute_error(
        actuals,
        predictions
    )

    mape = (
        np.mean(
            np.abs(
                (actuals - predictions)
                / actuals
            )
        ) * 100
    )

    return {
        "model": "Prophet",
        "rmse": round(rmse, 2),
        "mae": round(mae, 2),
        "mape": round(mape, 2)
    }

def evaluate_xgboost():

    model = joblib.load(
        "app/models_saved/xgboost.pkl"
    )

    df = prepare_forecasting_data()
    df["ds"] = pd.to_datetime(df["ds"])
    df["year"] = df["ds"].dt.year
    df["month"] = df["ds"].dt.month
    df["day"] = df["ds"].dt.day
    df["day_of_week"] = df["ds"].dt.dayofweek

    features = [
        "year",
        "month",
        "day",
        "day_of_week"
    ]

    train = df[:-30]
    test = df[-30:]

    X_test = test[features]
    y_test = test["y"]

    predictions = model.predict(
        X_test
    )

    rmse = np.sqrt(
        mean_squared_error(
            y_test,
            predictions
        )
    )

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    mape = (
        np.mean(
            np.abs(
                (y_test - predictions)
                / y_test
            )
        ) * 100
    )

    return {
        "model": "XGBoost",
        "rmse": round(rmse, 2),
        "mae": round(mae, 2),
        "mape": round(mape, 2)
    }

def evaluate_lightgbm():

    model = joblib.load(
        "app/models_saved/lightgbm.pkl"
    )

    df = prepare_forecasting_data()

    df["ds"] = pd.to_datetime(
        df["ds"]
    )

    df["year"] = df["ds"].dt.year
    df["month"] = df["ds"].dt.month
    df["day"] = df["ds"].dt.day
    df["day_of_week"] = (
        df["ds"].dt.dayofweek
    )

    features = [
        "year",
        "month",
        "day",
        "day_of_week"
    ]

    train = df[:-30]
    test = df[-30:]

    X_test = test[features]
    y_test = test["y"]

    predictions = model.predict(
        X_test
    )

    rmse = np.sqrt(
        mean_squared_error(
            y_test,
            predictions
        )
    )

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    mape = (
        np.mean(
            np.abs(
                (y_test - predictions)
                / y_test
            )
        ) * 100
    )

    return {
        "model": "LightGBM",
        "rmse": float(round(rmse, 2)),
        "mae": float(round(mae, 2)),
        "mape": float(round(mape, 2))
    }

def evaluate_lstm():

    model = load_model(
        "app/models_saved/lstm.keras"
    )

    scaler = joblib.load(
        "app/models_saved/lstm_scaler.pkl"
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

    sequence_length = 30

    test_actuals = []
    predictions = []

    for i in range(
        len(scaled_values)
        - 30,
        len(scaled_values)
    ):

        sequence = scaled_values[
            i - sequence_length:i
        ]

        pred = model.predict(
            sequence.reshape(
                1,
                sequence_length,
                1
            ),
            verbose=0
        )

        predictions.append(
            pred[0][0]
        )

        test_actuals.append(
            scaled_values[i][0]
        )

    predictions = scaler.inverse_transform(
        np.array(predictions)
        .reshape(-1, 1)
    )

    actuals = scaler.inverse_transform(
        np.array(test_actuals)
        .reshape(-1, 1)
    )

    rmse = np.sqrt(
        mean_squared_error(
            actuals,
            predictions
        )
    )

    mae = mean_absolute_error(
        actuals,
        predictions
    )

    mape = (
        np.mean(
            np.abs(
                (actuals - predictions)
                / actuals
            )
        ) * 100
    )

    return {
        "model": "LSTM",
        "rmse": float(round(rmse, 2)),
        "mae": float(round(mae, 2)),
        "mape": float(round(mape, 2))
    }

def compare_all_models():

    results = [
        evaluate_prophet(),
        evaluate_xgboost(),
        evaluate_lightgbm(),
        evaluate_lstm()
    ]

    for result in results:
        result["rmse"] = float(result["rmse"])
        result["mae"] = float(result["mae"])
        result["mape"] = float(result["mape"])

    results.sort(
        key=lambda x: x["rmse"]
    )
    for result in results:

        log_model_metrics(
        model_name=result["model"],
        rmse=result["rmse"],
        mae=result["mae"],
        mape=result["mape"]
    )

    return {
        "best_model": results[0]["model"],
        "rankings": results
    }