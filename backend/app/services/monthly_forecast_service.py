from app.ml.forecasting_models import (
    forecast_next_30_days
)

from app.ml.xgboost_forecasting import (
    predict_next_30_days as xgb_predict
)

from app.ml.lightgbm_forecasting import (
    predict_next_30_days as lgb_predict
)

from app.ml.lstm_forecasting import (
    predict_next_30_days as lstm_predict
)


def compare_models():

    prophet_forecast = forecast_next_30_days()

    xgb_forecast = xgb_predict()

    lgb_forecast = lgb_predict()

    lstm_forecast = lstm_predict()

    return {
        "prophet_average_prediction": float(
            prophet_forecast.tail(30)["yhat"].mean()
        ),

        "xgboost_average_prediction": float(
            xgb_forecast["prediction"].mean()
        ),

        "lightgbm_average_prediction": float(
            lgb_forecast["prediction"].mean()
        ),

        "lstm_average_prediction": float(
            lstm_forecast["prediction"].mean()
        )
    }