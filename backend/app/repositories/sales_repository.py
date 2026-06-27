from sqlalchemy import func
from app.database.session import SessionLocal
from app.models.warehouse_models import (
    FactSales,
    Product,
    DateDimension
)


def get_total_revenue():
    db = SessionLocal()

    revenue = db.query(
        func.sum(FactSales.revenue)
    ).scalar()

    db.close()

    return revenue


def get_total_sales():
    db = SessionLocal()

    sales = db.query(
        func.count(FactSales.sale_id)
    ).scalar()

    db.close()

    return sales


def get_total_products():
    db = SessionLocal()

    products = db.query(
        func.count(Product.product_id)
    ).scalar()

    db.close()

    return products


def get_top_categories(limit=5):
    db = SessionLocal()

    result = (
        db.query(
            Product.category,
            func.sum(FactSales.revenue).label("revenue")
        )
        .join(
            FactSales,
            Product.product_id == FactSales.product_id
        )
        .group_by(Product.category)
        .order_by(
            func.sum(FactSales.revenue).desc()
        )
        .limit(limit)
        .all()
    )

    db.close()

    return result
def get_monthly_sales():
    db = SessionLocal()

    result = (
        db.query(
            DateDimension.year,
            DateDimension.month,
            func.sum(FactSales.revenue).label("revenue")
        )
        .join(
            DateDimension,
            FactSales.date_id == DateDimension.date_id
        )
        .group_by(
            DateDimension.year,
            DateDimension.month
        )
        .order_by(
            DateDimension.year,
            DateDimension.month
        )
        .all()
    )

    db.close()

    return result

def get_average_order_value():
    db = SessionLocal()

    result = db.query(
        func.avg(FactSales.revenue)
    ).scalar()

    db.close()

    return result


