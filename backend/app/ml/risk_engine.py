from app.database.session import SessionLocal
from app.models.warehouse_models import FactSales


def calculate_inventory_risk(
    current_stock,
    reorder_point
):
    """
    Inventory Risk Score
    """

    db = SessionLocal()

    try:

        sales_count = db.query(FactSales).count()

        if current_stock <= reorder_point:

            risk = "High"
            score = 90

        elif current_stock <= reorder_point * 1.5:

            risk = "Medium"
            score = 60

        else:

            risk = "Low"
            score = 20

        return {
            "risk": risk,
            "score": score,
            "sales_records": sales_count
        }

    except Exception as e:

        return {
            "risk": "Unknown",
            "score": 0,
            "error": str(e)
        }

    finally:
        db.close()


def calculate_supplier_risk(
    delay_days,
    rating,
    fulfillment_rate
):
    """
    Supplier Risk Score
    """

    score = (
        delay_days * 5
        + (5 - rating) * 15
        + (100 - fulfillment_rate) * 0.5
    )

    if score >= 70:
        level = "High"

    elif score >= 40:
        level = "Medium"

    else:
        level = "Low"

    return {
        "risk": level,
        "score": round(score, 2)
    }


def calculate_stockout_risk(
    forecast_demand,
    current_stock
):
    """
    Stockout Prediction
    """

    if forecast_demand > current_stock:

        shortage = (
            forecast_demand
            - current_stock
        )

        return {
            "stockout": True,
            "shortage": shortage,
            "risk": "High"
        }

    return {
        "stockout": False,
        "shortage": 0,
        "risk": "Low"
    }