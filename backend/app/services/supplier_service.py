import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

SUPPLIER_FILE = (
    BASE_DIR /
    "data" /
    "raw" /
    "suppliers" /
    "supplier.csv"
)


def load_suppliers():
    return pd.read_csv(SUPPLIER_FILE)


def get_supplier_summary():

    df = load_suppliers()

    return {
        "total_suppliers": len(df),
        "avg_reliability": round(
            df["reliability_score"].mean(), 2
        ),
        "avg_delivery": round(
            df["on_time_delivery_rate"].mean(), 2
        ),
        "avg_quality": round(
            df["quality_score"].mean(), 2
        )
    }


def get_top_suppliers():

    df = load_suppliers()

    top = (
        df.sort_values(
            by="reliability_score",
            ascending=False
        )
        .head(10)
    )

    return top[
        [
            "supplier_name",
            "reliability_score"
        ]
    ].to_dict(orient="records")


def get_supplier_risk():

    df = load_suppliers()

    df["risk_score"] = (
        (100 - df["reliability_score"])
        +
        (100 - df["on_time_delivery_rate"])
    )

    risk = (
        df.sort_values(
            by="risk_score",
            ascending=False
        )
        .head(10)
    )

    return risk[
        [
            "supplier_name",
            "reliability_score",
            "on_time_delivery_rate"
        ]
    ].to_dict(orient="records")


def get_supplier_performance():

    df = load_suppliers()

    performance = (
        df[
            [
                "supplier_name",
                "quality_score"
            ]
        ]
        .sort_values(
            by="quality_score",
            ascending=False
        )
        .head(20)
    )

    return performance.to_dict(
        orient="records"
    )