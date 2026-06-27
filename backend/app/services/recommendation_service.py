from app.services.inventory_service import (
    get_low_stock_alerts
)

from app.services.warehouse_service import (
    get_overloaded_warehouses
)

from app.services.supplier_service import (
    get_supplier_risk
)

from app.ai.gemini_service import (
    generate_supply_chain_insight
)

from app.cache.ai_cache import AICache

from app.fallback.dashboard_fallback import (
    recommendation_fallback
)


def get_recommendations():

   
    # Check Cache
    

    cached = AICache.load(
        "recommendations"
    )

    if cached:

        return cached

    
    # Collect Data
   

    low_stock = get_low_stock_alerts()

    warehouses = (
        get_overloaded_warehouses()
    )

    suppliers = (
        get_supplier_risk()
    )

    prompt = f"""
    You are an expert Supply Chain Consultant.

    Low Stock Products:
    {low_stock}

    Overloaded Warehouses:
    {warehouses}

    Supplier Risks:
    {suppliers}

    Generate exactly 4 business recommendations.

    Each recommendation should be:
    - Short
    - Practical
    - One line only
    """

    
    # Gemini
   

    try:

        response = generate_supply_chain_insight(
            prompt
        )

        recommendations = [

            line.strip()

            for line in response.split("\n")

            if line.strip()

        ]

        AICache.save(

            "recommendations",

            recommendations

        )

        return recommendations

    
    # Fallback
    

    except Exception:

        return recommendation_fallback()