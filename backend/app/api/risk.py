from fastapi import APIRouter

from app.ml.risk_engine import (
    calculate_inventory_risk,
    calculate_supplier_risk,
    calculate_stockout_risk
)

router = APIRouter(
    prefix="/risk",
    tags=["Risk Engine"]
)


@router.get("/inventory")
def inventory_risk():

    return calculate_inventory_risk(
        current_stock=50,
        reorder_point=100
    )


@router.get("/supplier")
def supplier_risk():

    return calculate_supplier_risk(
        delay_days=10,
        rating=3,
        fulfillment_rate=80
    )


@router.get("/stockout")
def stockout_risk():

    return calculate_stockout_risk(
        forecast_demand=500,
        current_stock=300
    )