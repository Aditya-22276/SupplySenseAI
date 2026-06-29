import logging

from app.ml.train_models import (
    train_prophet_model,
    train_xgboost_model,
    train_lightgbm_model,
    train_lstm_model
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


def retrain_all_models():

    models = [
        ("Prophet", train_prophet_model),
        ("XGBoost", train_xgboost_model),
        ("LightGBM", train_lightgbm_model),
        ("LSTM", train_lstm_model),
    ]

    successful = []
    failed = []

    logger.info("=" * 60)
    logger.info("Starting Model Retraining")
    logger.info("=" * 60)

    for model_name, trainer in models:

        try:
            logger.info(f"Training {model_name} Model...")

            trainer()

            successful.append(model_name)

            logger.info(f"{model_name} Training Completed Successfully")

        except Exception as e:

            failed.append(model_name)

            logger.exception(f"{model_name} Training Failed: {e}")

    logger.info("=" * 60)
    logger.info("Training Summary")
    logger.info("=" * 60)

    logger.info(f"Successful Models: {successful}")

    if failed:
        logger.warning(f"Failed Models: {failed}")
    else:
        logger.info("All Models Retrained Successfully")


if __name__ == "__main__":
    retrain_all_models()