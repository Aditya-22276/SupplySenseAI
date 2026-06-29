from app.repositories.sales_repository import (
    get_total_revenue,
    get_total_sales,
    get_total_products,
    get_top_categories,
    get_monthly_sales,
     get_average_order_value
)


def get_dashboard_summary():

    revenue = get_total_revenue()
    sales = get_total_sales()
    products = get_total_products()
    categories = get_top_categories()

    return {
        "total_revenue": float(revenue) if revenue is not None else 0.0,
        "total_sales": sales or 0,
        "total_products": products or 0,
        "top_categories": [
            {
                "category": category,
                "revenue": float(value) if value is not None else 0.0
            }
            for category, value in categories
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

    revenue = get_total_revenue()
    sales = get_total_sales()
    products = get_total_products()
    avg_order = get_average_order_value()

    return {
        "total_revenue": float(revenue) if revenue is not None else 0.0,
        "total_sales": sales or 0,
        "total_products": products or 0,
        "average_order_value": float(avg_order) if avg_order is not None else 0.0
    }
