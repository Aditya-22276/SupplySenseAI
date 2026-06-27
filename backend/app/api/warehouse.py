from fastapi import APIRouter

from app.services.warehouse_service import (
    get_warehouse_summary,
    get_utilization_chart,
    get_top_warehouses,
    get_overloaded_warehouses
)

router = APIRouter(
    prefix="/warehouse",
    tags=["Warehouse"]
)


@router.get("/summary")
def warehouse_summary():
    return get_warehouse_summary()


@router.get("/utilization")
def warehouse_utilization():
    return get_utilization_chart()


@router.get("/top")
def top_warehouses():
    return get_top_warehouses()


@router.get("/alerts")
def warehouse_alerts():
    return get_overloaded_warehouses()