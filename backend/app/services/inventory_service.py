from sqlalchemy import text
from app.database.session import SessionLocal


def load_inventory():

    db = SessionLocal()

    try:
        result = db.execute(
            text("SELECT * FROM inventory")
        )

        columns = result.keys()

        data = [
            dict(zip(columns, row))
            for row in result.fetchall()
        ]

        return data

    finally:
        db.close()


def get_inventory_health():

    data = load_inventory()

    low_stock = sum(
        1 for row in data
        if row["current_stock"] <= row["reorder_point"]
    )

    total_products = len(data)

    health_score = round(
        ((total_products - low_stock) / total_products) * 100,
        2
    ) if total_products else 0

    return {
        "stock_health": health_score,
        "total_products": total_products,
        "low_stock_products": low_stock,
        "availability": 20,
        "demand_match": 82,
        "efficiency": 73
    }


def get_low_stock_alerts():

    data = load_inventory()

    alerts = []

    for row in data:

        if row["current_stock"] <= row["reorder_point"]:

            alerts.append({
                "product": row["product_name"],
                "stock": row["current_stock"],
                "reorder_point": row["reorder_point"]
            })

    return alerts


def get_top_products():

    data = sorted(
        load_inventory(),
        key=lambda x: x["current_stock"],
        reverse=True
    )

    return [
        {
            "product_name": row["product_name"],
            "current_stock": row["current_stock"],
            "category": row["category"]
        }
        for row in data[:10]
    ]


def get_ai_insights():

    data = load_inventory()

    total_products = len(data)

    low_stock = [
        row for row in data
        if row["current_stock"] <= row["reorder_point"]
    ]

    average_stock = round(
        sum(row["current_stock"] for row in data) /
        total_products,
        2
    ) if total_products else 0

    highest = max(
        data,
        key=lambda x: x["current_stock"]
    ) if data else None

    return {
        "total_products": total_products,
        "low_stock_products": len(low_stock),
        "average_stock": average_stock,
        "highest_stock_product": highest["product_name"] if highest else None,
        "insights": [
            f"{len(low_stock)} products are below reorder level",
            f"{highest['product_name']} currently has the highest stock level" if highest else "",
            "Inventory turnover appears healthy",
            "Demand forecast suggests maintaining safety stock levels"
        ]
    }