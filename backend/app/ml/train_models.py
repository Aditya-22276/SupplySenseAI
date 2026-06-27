import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../.."
        )
    )
)
import joblib

from app.ml.forecasting_models import (
    train_forecast_model
)

from app.ml.xgboost_forecasting import (
    train_xgboost_model
)

from app.ml.lightgbm_forecasting import (
    train_lightgbm_model
)

from app.ml.lstm_forecasting import (
    train_lstm_model
)


MODEL_DIR = "app/models_saved"

os.makedirs(MODEL_DIR, exist_ok=True)


def train_and_save_models():

    print("\nTraining Prophet...")
    prophet_model = train_forecast_model()

    joblib.dump(
        prophet_model,
        f"{MODEL_DIR}/prophet.pkl"
    )

    print("Prophet Saved")


    print("\nTraining XGBoost...")
    xgb_model = train_xgboost_model()

    joblib.dump(
        xgb_model,
        f"{MODEL_DIR}/xgboost.pkl"
    )

    print("XGBoost Saved")


    print("\nTraining LightGBM...")
    lgb_model = train_lightgbm_model()

    joblib.dump(
        lgb_model,
        f"{MODEL_DIR}/lightgbm.pkl"
    )

    print("LightGBM Saved")


    print("\nTraining LSTM...")
    lstm_model, scaler, df = train_lstm_model()

    lstm_model.save(
        f"{MODEL_DIR}/lstm.keras"
    )

    joblib.dump(
        scaler,
        f"{MODEL_DIR}/lstm_scaler.pkl"
    )

    print("LSTM Saved")


    print("\nALL MODELS TRAINED SUCCESSFULLY")


if __name__ == "__main__":
    train_and_save_models()