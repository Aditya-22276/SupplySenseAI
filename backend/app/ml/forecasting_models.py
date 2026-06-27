import pandas as pd

from prophet import Prophet

from app.database.session import SessionLocal
from app.models.warehouse_models import (
    FactSales,
    DateDimension
)


def prepare_forecasting_data():

    db = SessionLocal()

    query = (
        db.query(
            DateDimension.date,
            FactSales.revenue
        )
        .join(
            DateDimension,
            FactSales.date_id == DateDimension.date_id
        )
    )

    data = pd.read_sql(
        query.statement,
        db.bind
    )

    db.close()

    daily_sales = (
        data.groupby("date")["revenue"]
        .sum()
        .reset_index()
    )

    daily_sales.columns = ["ds", "y"]

    return daily_sales


def train_forecast_model():

    df = prepare_forecasting_data()

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False
    )

    model.fit(df)

    return model


def forecast_next_30_days():

    model = train_forecast_model()

    future = model.make_future_dataframe(
        periods=30
    )

    forecast = model.predict(future)

    return forecast[
        ["ds", "yhat", "yhat_lower", "yhat_upper"]
    ]

def forecast_next_90_days():

    model = train_forecast_model()

    future = model.make_future_dataframe(
        periods=90
    )

    forecast = model.predict(future)

    return forecast[
        ["ds", "yhat", "yhat_lower", "yhat_upper"]
    ]