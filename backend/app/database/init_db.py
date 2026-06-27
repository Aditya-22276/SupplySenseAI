from app.database.base import Base
from app.database.session import engine

from app.models.warehouse_models import (
    Product,
    Supplier,
    Warehouse,
    DateDimension,
    FactSales
)


def init_db():
    Base.metadata.create_all(bind=engine)