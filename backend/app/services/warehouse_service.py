import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

WAREHOUSE_FILE = (
    BASE_DIR /
    "data" /
    "raw" /
    "warehouse" /
    "warehouse.csv"
)


def load_warehouse():
    return pd.read_csv(WAREHOUSE_FILE)


def get_warehouse_summary():

    df = load_warehouse()

    total_capacity = int(df["total_capacity"].sum())
    used_capacity = int(df["used_capacity"].sum())

    free_capacity = total_capacity - used_capacity

    avg_utilization = round(
        df["utilization_rate"].mean(),
        2
    )

    return {
        "total_capacity": total_capacity,
        "used_capacity": used_capacity,
        "free_capacity": free_capacity,
        "average_utilization": avg_utilization
    }


def get_utilization_chart():

    df = load_warehouse()

    chart = df[
        ["warehouse_name", "utilization_rate"]
    ].head(20)

    return chart.to_dict(orient="records")


def get_top_warehouses():

    df = load_warehouse()

    top = (
        df.sort_values(
            by="utilization_rate",
            ascending=False
        )
        .head(10)
    )

    return top[
        ["warehouse_name", "utilization_rate"]
    ].to_dict(orient="records")


def get_overloaded_warehouses():

    df = load_warehouse()

    alerts = df[
        df["utilization_rate"] > 90
    ]

    return alerts[
        [
            "warehouse_name",
            "utilization_rate"
        ]
    ].to_dict(orient="records")