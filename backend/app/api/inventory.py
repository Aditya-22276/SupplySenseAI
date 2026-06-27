from fastapi import APIRouter

from app.services.inventory_service import (
    get_inventory_health,
    get_low_stock_alerts,
    get_top_products,
    get_ai_insights
)

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.get("/health")
def inventory_health():
    return get_inventory_health()


@router.get("/low-stock")
def low_stock():
    return get_low_stock_alerts()


@router.get("/top-products")
def top_products():
    return get_top_products()


@router.get("/insights")
def insights():
    return get_ai_insights()