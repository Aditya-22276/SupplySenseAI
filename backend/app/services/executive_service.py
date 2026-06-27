from app.services.inventory_service import (
    get_inventory_health
)

from app.services.warehouse_service import (
    get_warehouse_summary
)

from app.services.supplier_service import (
    get_supplier_summary
)

from app.ai.gemini_service import (
    generate_supply_chain_insight
)

from app.cache.ai_cache import AICache

from app.fallback.dashboard_fallback import (
    executive_fallback
)


def get_supply_chain_health():

    inventory = get_inventory_health()

    warehouse = get_warehouse_summary()

    supplier = get_supplier_summary()

    score = round(
        (
            inventory["stock_health"]
            +
            warehouse["average_utilization"]
            +
            supplier["avg_reliability"]
        ) / 3,
        2
    )

    return {
        "score": score,
        "status": (
            "Excellent"
            if score >= 85
            else "Good"
        )
    }


def get_business_health():

    inventory = get_inventory_health()

    supplier = get_supplier_summary()

    score = round(
        (
            inventory["stock_health"]
            +
            supplier["avg_quality"]
        ) / 2,
        2
    )

    return {
        "score": score
    }


def get_executive_insights():

   
    # Check Cache
    cached = AICache.load(
        "executive_insights"
    )

    if cached:

        return cached

    
    # Prepare Prompt
    inventory = get_inventory_health()

    warehouse = get_warehouse_summary()

    supplier = get_supplier_summary()

    prompt = f"""
    You are a professional Supply Chain Analyst.

    Inventory Health:
    {inventory}

    Warehouse Summary:
    {warehouse}

    Supplier Summary:
    {supplier}

    Generate exactly 4 executive insights.

    Keep every insight short.

    Return each insight on a new line.
    """

   
    # Gemini
    try:

        response = generate_supply_chain_insight(
            prompt
        )

        insights = [

            line.strip()

            for line in response.split("\n")

            if line.strip()

        ]

        AICache.save(
            "executive_insights",
            insights
        )

        return insights

   
    # Fallback
    except Exception:

        fallback = executive_fallback()

        insights = [

            line.replace("•", "").strip()

            for line in fallback.split("\n")

            if line.strip()

            and "Executive Summary" not in line

        ]

        return insights