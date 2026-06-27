from app.services.mlflow_service import (
    log_model_metrics
)

log_model_metrics(
    "XGBoost",
    12.5,
    8.3,
    4.2
)