from app.repositories.sales_repository import (
    get_total_revenue,
    get_total_sales,
    get_total_products,
    get_top_categories,
    get_monthly_sales,
     get_average_order_value
)


def get_dashboard_summary():

    return {
        "total_revenue": get_total_revenue(),
        "total_sales": get_total_sales(),
        "total_products": get_total_products(),
        "top_categories": [
            {
                "category": category,
                "revenue": float(revenue)
            }
            for category, revenue in get_top_categories()
        ]
    }
def get_monthly_sales_summary():

    return [
        {
            "year": year,
            "month": month,
            "revenue": float(revenue)
        }
        for year, month, revenue in get_monthly_sales()
    ]

def get_kpis():

    return {
        "total_revenue": get_total_revenue(),
        "total_sales": get_total_sales(),
        "total_products": get_total_products(),
        "average_order_value": float(
            get_average_order_value()
        )
    }
