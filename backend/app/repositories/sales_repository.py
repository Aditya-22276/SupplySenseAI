from sqlalchemy import func
from app.database.session import SessionLocal
from app.models.warehouse_models import (
    FactSales,
    Product,
    DateDimension
)


def get_total_revenue():
    db = SessionLocal()

    try:
        revenue = db.query(
            func.sum(FactSales.revenue)
        ).scalar()

        return revenue or 0

    finally:
        db.close()


def get_total_sales():
    db = SessionLocal()

    try:
        sales = db.query(
            func.count(FactSales.sale_id)
        ).scalar()

        return sales or 0

    finally:
        db.close()


def get_total_products():
    db = SessionLocal()

    try:
        products = db.query(
            func.count(Product.product_id)
        ).scalar()

        return products or 0

    finally:
        db.close()


def get_top_categories(limit=5):
    db = SessionLocal()

    try:
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

        return result

    finally:
        db.close()


def get_monthly_sales():
    db = SessionLocal()

    try:
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

        return result

    finally:
        db.close()


def get_average_order_value():
    db = SessionLocal()

    try:
        result = db.query(
            func.avg(FactSales.revenue)
        ).scalar()

        return result or 0

    finally:
        db.close()