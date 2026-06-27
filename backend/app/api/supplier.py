from fastapi import APIRouter

from app.services.supplier_service import (
    get_supplier_summary,
    get_top_suppliers,
    get_supplier_risk,
    get_supplier_performance
)

router = APIRouter(
    prefix="/supplier",
    tags=["Supplier"]
)


@router.get("/summary")
def supplier_summary():
    return get_supplier_summary()


@router.get("/top")
def top_suppliers():
    return get_top_suppliers()


@router.get("/risk")
def supplier_risk():
    return get_supplier_risk()


@router.get("/performance")
def supplier_performance():
    return get_supplier_performance()