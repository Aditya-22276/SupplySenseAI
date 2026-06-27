# backend/app/ml/test_risk_engine.py

from app.ml.risk_engine import (
    calculate_inventory_risk,
    calculate_supplier_risk,
    calculate_stockout_risk
)

print(calculate_inventory_risk(50, 100))
print(calculate_supplier_risk(10, 3, 80))
print(calculate_stockout_risk(500, 300))