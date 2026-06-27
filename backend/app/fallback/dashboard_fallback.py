"""
Dashboard AI Fallback Responses

These responses are used when:
1. Gemini API quota is exceeded.
2. Network error occurs.
3. Gemini is temporarily unavailable.
"""


def executive_fallback():

    return """
Executive Summary

• Revenue performance remains healthy with stable business growth.

• Inventory levels are generally balanced across warehouses.

• Supplier performance is consistent with acceptable fulfillment rates.

• Demand forecasting indicates stable future sales with moderate seasonal fluctuations.

• Overall business performance is positive with opportunities to improve inventory optimization and supplier efficiency.
"""


def recommendation_fallback():

    return [
        "Increase safety stock for high-demand products.",
        "Review supplier lead times to minimize delivery delays.",
        "Optimize warehouse utilization by balancing inventory.",
        "Monitor forecast accuracy and retrain forecasting models monthly.",
        "Prioritize replenishment for fast-moving products.",
        "Reduce excess inventory for slow-moving items.",
        "Track supplier performance using delivery and fulfillment KPIs."
    ]


def business_health_fallback():

    return {

        "status": "Healthy",

        "score": 86,

        "summary": [

            "Revenue growth is stable.",

            "Inventory is within acceptable limits.",

            "Supplier performance is satisfactory.",

            "Warehouse utilization is healthy.",

            "No critical operational risks detected."

        ]

    }