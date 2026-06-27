from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.database.base import Base


class Product(Base):
    __tablename__ = "dim_product"

    product_id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), unique=True, nullable=False)


class Supplier(Base):
    __tablename__ = "dim_supplier"

    supplier_id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String(255), nullable=False)
    region = Column(String(100), nullable=False)


class Warehouse(Base):
    __tablename__ = "dim_warehouse"

    warehouse_id = Column(Integer, primary_key=True, index=True)
    location = Column(String(255), nullable=False)


class DateDimension(Base):
    __tablename__ = "dim_date"

    date_id = Column(Integer, primary_key=True, index=True)

    date = Column(Date, unique=True, nullable=False)

    month = Column(Integer, nullable=False)
    quarter = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)

    holiday_flag = Column(Integer, default=0)


class FactSales(Base):
    __tablename__ = "fact_sales"

    sale_id = Column(Integer, primary_key=True, index=True)

    product_id = Column(
        Integer,
        ForeignKey("dim_product.product_id"),
        nullable=False
    )

    date_id = Column(
        Integer,
        ForeignKey("dim_date.date_id"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False)

    revenue = Column(Float, nullable=False)