import pandas as pd

from app.database.session import SessionLocal
from app.models.warehouse_models import (
    Product,
    DateDimension,
    FactSales
)


def load_sales_data():

    print("Loading sales dataset...")

    df = pd.read_csv("../data/raw/sales/sales.csv")

    df["invoice_date"] = pd.to_datetime(
        df["invoice_date"],
        dayfirst=True
    )

    df["revenue"] = df["quantity"] * df["price"]

    db = SessionLocal()

    try:
      # LOAD PRODUCT DIMENSION
        categories = df["category"].unique()

        for category in categories:

            exists = (
                db.query(Product)
                .filter(Product.category == category)
                .first()
            )

            if not exists:
                db.add(Product(category=category))

        db.commit()

        print("Product Dimension Loaded")
          # LOAD DATE DIMENSION
        unique_dates = df["invoice_date"].dt.date.unique()

        for date_value in unique_dates:

            exists = (
                db.query(DateDimension)
                .filter(DateDimension.date == date_value)
                .first()
            )

            if not exists:

                db.add(
                    DateDimension(
                        date=date_value,
                        month=date_value.month,
                        quarter=((date_value.month - 1) // 3) + 1,
                        year=date_value.year,
                        holiday_flag=0
                    )
                )

        db.commit()

        print("Date Dimension Loaded")
        # LOAD FACT SALES
        for _, row in df.iterrows():

            product = (
                db.query(Product)
                .filter(
                    Product.category == row["category"]
                )
                .first()
            )

            sales_date = (
                db.query(DateDimension)
                .filter(
                    DateDimension.date ==
                    row["invoice_date"].date()
                )
                .first()
            )

            db.add(
                FactSales(
                    product_id=product.product_id,
                    date_id=sales_date.date_id,
                    quantity=int(row["quantity"]),
                    revenue=float(row["revenue"])
                )
            )

        db.commit()

        print("Fact Sales Loaded")
        print(f"Total Records Loaded: {len(df)}")

    except Exception as e:

        db.rollback()
        print("ETL Failed")
        print(e)

    finally:

        db.close()


if __name__ == "__main__":
    load_sales_data()