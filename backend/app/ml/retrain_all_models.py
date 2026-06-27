from app.ml.train_models import (
    train_prophet_model,
    train_xgboost_model,
    train_lightgbm_model,
    train_lstm_model
)

print("Training Prophet...")
train_prophet_model()

print("Training XGBoost...")
train_xgboost_model()

print("Training LightGBM...")
train_lightgbm_model()

print("Training LSTM...")
train_lstm_model()

print("All Models Retrained Successfully")