# SupplySense AI - Database Design

## Operational Tables

### products

| Column | Description |
|----------|----------|
| product_id | Unique product identifier |
| product_name | Product name |
| category | Product category |
| brand | Product brand |
| unit_price | Product price |

---

### suppliers

| Column | Description |
|----------|----------|
| supplier_id | Unique supplier identifier |
| supplier_name | Supplier name |
| region | Supplier region |

---

### warehouses

| Column | Description |
|----------|----------|
| warehouse_id | Unique warehouse identifier |
| warehouse_name | Warehouse name |
| location | Warehouse location |

---

### sales

| Column | Description |
|----------|----------|
| sale_id | Unique sale identifier |
| product_id | Product reference |
| supplier_id | Supplier reference |
| warehouse_id | Warehouse reference |
| customer_id | Customer identifier |
| date | Sale date |
| quantity | Units sold |
| revenue | Revenue generated |

---

### inventory

| Column | Description |
|----------|----------|
| inventory_id | Unique inventory identifier |
| product_id | Product reference |
| warehouse_id | Warehouse reference |
| stock_quantity | Current stock |
| reorder_point | Reorder threshold |
| date | Inventory snapshot date |

---

### supplier_performance

| Column | Description |
|----------|----------|
| performance_id | Unique record |
| supplier_id | Supplier reference |
| promised_delivery_date | Expected delivery date |
| actual_delivery_date | Actual delivery date |
| quality_score | Supplier quality rating |
| cost | Supplier cost |

---

## Feature Store

### feature_store

| Column | Description |
|----------|----------|
| feature_id | Feature record ID |
| product_id | Product reference |
| date | Feature date |
| lag_7 | 7-day lag demand |
| lag_30 | 30-day lag demand |
| rolling_mean | Rolling average demand |
| rolling_std | Rolling demand deviation |
| growth_rate | Demand growth rate |

---

## Prediction Tables

### demand_predictions

| Column | Description |
|----------|----------|
| prediction_id | Forecast ID |
| product_id | Product reference |
| forecast_date | Forecast date |
| forecast_value | Predicted demand |
| model_name | Model used |
| created_at | Prediction timestamp |

---

### revenue_predictions

| Column | Description |
|----------|----------|
| prediction_id | Forecast ID |
| forecast_date | Forecast date |
| forecast_value | Predicted revenue |
| model_name | Model used |
| created_at | Prediction timestamp |

---

### supplier_risk_predictions

| Column | Description |
|----------|----------|
| prediction_id | Prediction ID |
| supplier_id | Supplier reference |
| risk_score | Predicted risk score |
| risk_category | Low/Medium/High |
| created_at | Prediction timestamp |

---

## Alert Engine

### alerts

| Column | Description |
|----------|----------|
| alert_id | Alert identifier |
| alert_type | Low Stock / Supplier Risk / Revenue Drop |
| severity | Low / Medium / High |
| description | Alert message |
| created_at | Alert timestamp |