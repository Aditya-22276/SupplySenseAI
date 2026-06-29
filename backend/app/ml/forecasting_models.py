import logging
import pandas as pd

from prophet import Prophet

from app.database.session import SessionLocal
from app.models.warehouse_models import (
    FactSales,
    DateDimension
)

# Configure Logger
logger = logging.getLogger(__name__)


def prepare_forecasting_data() -> pd.DataFrame:
    """
    Load daily sales data from PostgreSQL
    and prepare it for Prophet.
    """

    db = SessionLocal()

    try:
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

        if data.empty:
            raise ValueError(
                "No sales data found in the database."
            )

        daily_sales = (
            data.groupby("date")["revenue"]
            .sum()
            .reset_index()
        )

        daily_sales.columns = ["ds", "y"]

        logger.info(
            "Forecasting dataset prepared successfully."
        )

        return daily_sales

    except Exception as e:
        logger.exception(
            "Failed to prepare forecasting data."
        )
        raise Exception(
            f"Forecast Data Error: {e}"
        )

    finally:
        db.close()


def train_forecast_model() -> Prophet:
    """
    Train Prophet forecasting model.
    """

    try:

        df = prepare_forecasting_data()

        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False
        )

        model.fit(df)

        logger.info(
            "Prophet model trained successfully."
        )

        return model

    except Exception as e:

        logger.exception(
            "Prophet training failed."
        )

        raise Exception(
            f"Training Error: {e}"
        )


def forecast_next_30_days() -> pd.DataFrame:
    """
    Generate next 30-day forecast.
    """

    try:

        model = train_forecast_model()

        future = model.make_future_dataframe(
            periods=30
        )

        forecast = model.predict(
            future
        )

        logger.info(
            "30-day forecast generated successfully."
        )

        return forecast[
            [
                "ds",
                "yhat",
                "yhat_lower",
                "yhat_upper"
            ]
        ]

    except Exception as e:

        logger.exception(
            "30-day forecast generation failed."
        )

        raise Exception(
            f"30-Day Forecast Error: {e}"
        )


def forecast_next_90_days() -> pd.DataFrame:
    """
    Generate next 90-day forecast.
    """

    try:

        model = train_forecast_model()

        future = model.make_future_dataframe(
            periods=90
        )

        forecast = model.predict(
            future
        )

        logger.info(
            "90-day forecast generated successfully."
        )

        return forecast[
            [
                "ds",
                "yhat",
                "yhat_lower",
                "yhat_upper"
            ]
        ]

    except Exception as e:

        logger.exception(
            "90-day forecast generation failed."
        )

        raise Exception(
            f"90-Day Forecast Error: {e}"
        )