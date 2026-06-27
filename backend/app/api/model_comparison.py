from fastapi import APIRouter

from app.services.model_comparison_service import (
    compare_models
)

router = APIRouter(
    prefix="/forecast",
    tags=["Model Comparison"]
)


@router.get("/compare")
def compare_forecasting_models():

    return compare_models()