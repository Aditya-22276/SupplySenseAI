import mlflow


def log_model_metrics(
    model_name,
    rmse,
    mae,
    mape
):

    mlflow.set_experiment(
        "SupplySense Forecasting"
    )

    with mlflow.start_run():

        mlflow.log_param(
            "model",
            model_name
        )

        mlflow.log_metric(
            "RMSE",
            rmse
        )

        mlflow.log_metric(
            "MAE",
            mae
        )

        mlflow.log_metric(
            "MAPE",
            mape
        )

        print(
            f"{model_name} logged successfully"
        )