import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

INVENTORY_FILE = (
    BASE_DIR /
    "data" /
    "raw" /
    "inventory" /
    "inventory.csv"
)


def load_inventory():
    return pd.read_csv(INVENTORY_FILE)


def get_inventory_health():

    df = load_inventory()

    low_stock = len(
        df[df["current_stock"] <= df["reorder_point"]]
    )

    total_products = len(df)

    health_score = round(
        ((total_products - low_stock) / total_products) * 100,
        2
    )

    return {
        "stock_health": health_score,
        "total_products": total_products,
        "low_stock_products": low_stock,
        "availability": 20,
        "demand_match": 82,
        "efficiency": 73
    }


def get_low_stock_alerts():

    df = load_inventory()

    low_stock = df[
        df["current_stock"] <= df["reorder_point"]
    ]

    alerts = []

    for _, row in low_stock.iterrows():

        alerts.append({
            "product": row["product_name"],
            "stock": int(row["current_stock"]),
            "reorder_point": int(row["reorder_point"])
        })

    return alerts


def get_top_products():

    df = load_inventory()

    top_products = (
        df.sort_values(
            by="current_stock",
            ascending=False
        )
        .head(10)
        [["product_name", "current_stock", "category"]]
    )

    return top_products.to_dict(orient="records")


def get_ai_insights():

    df = load_inventory()

    low_stock_count = len(
        df[df["current_stock"] <= df["reorder_point"]]
    )

    total_products = len(df)

    avg_stock = round(
        df["current_stock"].mean(),
        2
    )

    highest_stock_product = (
        df.sort_values(
            by="current_stock",
            ascending=False
        )
        .iloc[0]["product_name"]
    )

    return {
        "total_products": total_products,
        "low_stock_products": low_stock_count,
        "average_stock": avg_stock,
        "highest_stock_product": highest_stock_product,
        "insights": [
            f"{low_stock_count} products are below reorder level",
            f"{highest_stock_product} currently has the highest stock level",
            "Inventory turnover appears healthy",
            "Demand forecast suggests maintaining safety stock levels"
        ]
    }