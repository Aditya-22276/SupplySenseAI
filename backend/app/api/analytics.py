from fastapi import APIRouter

from app.services.analytics_service import (
    get_dashboard_summary,
    get_monthly_sales_summary,
    get_kpis
)

from app.schemas.analytics_schema import (
    DashboardSummary,
    MonthlySales
)

from typing import List
from app.repositories.sales_repository import (
    get_total_revenue
)
from app.repositories.sales_repository import (
    get_top_categories
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/dashboard",
    response_model=DashboardSummary
)
def dashboard():

    return get_dashboard_summary()

@router.get(
    "/monthly-sales",
    response_model=List[MonthlySales]
)
def monthly_sales():

    return get_monthly_sales_summary()

@router.get("/revenue")
def revenue():

    return {
        "total_revenue": get_total_revenue()
    }

@router.get("/top-categories")
def top_categories():

    categories = get_top_categories()

    return [
        {
            "category": category,
            "revenue": float(revenue)
        }
        for category, revenue in categories
    ]

@router.get("/kpis")
def kpis():
    return get_kpis()