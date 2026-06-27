# SupplySense AI - Star Schema Design

## Overview

The data warehouse follows a Star Schema architecture for fast analytical queries and machine learning workloads.

---

# Fact Table

## fact_sales

| Column |
|----------|
| sale_id |
| product_id |
| supplier_id |
| warehouse_id |
| date_id |
| weather_id |
| holiday_id |
| quantity |
| revenue |

---

# Dimension Tables

## dim_product

| Column |
|----------|
| product_id |
| product_name |
| category |
| brand |

---

## dim_supplier

| Column |
|----------|
| supplier_id |
| supplier_name |
| region |

---

## dim_warehouse

| Column |
|----------|
| warehouse_id |
| warehouse_name |
| location |

---

## dim_date

| Column |
|----------|
| date_id |
| date |
| day |
| week |
| month |
| quarter |
| year |

---

## dim_weather

| Column |
|----------|
| weather_id |
| temperature |
| rainfall |
| humidity |
| weather_condition |

---

## dim_holiday

| Column |
|----------|
| holiday_id |
| holiday_name |
| holiday_type |
| holiday_date |

---

# Relationships

fact_sales
├── dim_product
├── dim_supplier
├── dim_warehouse
├── dim_date
├── dim_weather
└── dim_holiday