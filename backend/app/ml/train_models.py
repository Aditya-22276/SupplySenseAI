import logging
import os
import sys

import joblib

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../.."
        )
    )
)

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

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)

MODEL_DIR = "app/models_saved"

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


def train_and_save_models():

    successful_models = []
    failed_models = []

    logger.info("=" * 60)
    logger.info("Starting Model Training")
    logger.info("=" * 60)

    # ---------------- Prophet ---------------- #

    try:

        logger.info("Training Prophet Model...")

        prophet_model = train_forecast_model()

        joblib.dump(
            prophet_model,
            f"{MODEL_DIR}/prophet.pkl"
        )

        successful_models.append("Prophet")

        logger.info("Prophet Model Saved Successfully.")

    except Exception as e:

        failed_models.append("Prophet")

        logger.exception(
            f"Prophet Training Failed: {e}"
        )

    # ---------------- XGBoost ---------------- #

    try:

        logger.info("Training XGBoost Model...")

        xgb_model = train_xgboost_model()

        joblib.dump(
            xgb_model,
            f"{MODEL_DIR}/xgboost.pkl"
        )

        successful_models.append("XGBoost")

        logger.info("XGBoost Model Saved Successfully.")

    except Exception as e:

        failed_models.append("XGBoost")

        logger.exception(
            f"XGBoost Training Failed: {e}"
        )

    # ---------------- LightGBM ---------------- #

    try:

        logger.info("Training LightGBM Model...")

        lgb_model = train_lightgbm_model()

        joblib.dump(
            lgb_model,
            f"{MODEL_DIR}/lightgbm.pkl"
        )

        successful_models.append("LightGBM")

        logger.info("LightGBM Model Saved Successfully.")

    except Exception as e:

        failed_models.append("LightGBM")

        logger.exception(
            f"LightGBM Training Failed: {e}"
        )

    # ---------------- LSTM ---------------- #

    try:

        logger.info("Training LSTM Model...")

        lstm_model, scaler, df = train_lstm_model()

        lstm_model.save(
            f"{MODEL_DIR}/lstm.keras"
        )

        joblib.dump(
            scaler,
            f"{MODEL_DIR}/lstm_scaler.pkl"
        )

        successful_models.append("LSTM")

        logger.info("LSTM Model Saved Successfully.")

    except Exception as e:

        failed_models.append("LSTM")

        logger.exception(
            f"LSTM Training Failed: {e}"
        )

    logger.info("=" * 60)
    logger.info("Training Summary")
    logger.info("=" * 60)

    logger.info(
        f"Successful Models: {successful_models}"
    )

    if failed_models:

        logger.warning(
            f"Failed Models: {failed_models}"
        )

    else:

        logger.info(
            "All Models Trained Successfully."
        )


if __name__ == "__main__":
    train_and_save_models()