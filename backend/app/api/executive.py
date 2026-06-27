from fastapi import APIRouter

from app.services.executive_service import (
    get_supply_chain_health,
    get_business_health,
    get_executive_insights
)

router = APIRouter(
    prefix="/executive",
    tags=["Executive"]
)


@router.get("/health")
def executive_health():
    return get_supply_chain_health()


@router.get("/business")
def business_health():
    return get_business_health()


@router.get("/insights")
def executive_insights():
    return get_executive_insights()