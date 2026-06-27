# SupplySense AI - System Architecture

## Overview

SupplySense AI is an end-to-end supply chain intelligence platform that integrates data engineering, machine learning, business analytics, MLOps, and AI-generated insights.

The platform helps businesses:

- Forecast product demand
- Optimize inventory
- Predict supplier risks
- Forecast future revenue
- Generate AI-powered business recommendations

---

## Architecture Flow

Sales Data
Inventory Data
Supplier Data
Weather Data
Holiday Data

        ↓

Apache Airflow

        ↓

PostgreSQL Data Warehouse

        ↓

Feature Engineering Layer

        ↓

Machine Learning Models

        ↓

MLflow Tracking

        ↓

AI Insight Engine

        ↓

FastAPI Backend

        ↓

React Dashboard

---

## Components

### Data Sources

Collects raw business and external datasets including sales, inventory, suppliers, weather, and holidays.

### Apache Airflow

Responsible for ETL orchestration, scheduling, monitoring, and automated data pipeline execution.

### PostgreSQL Data Warehouse

Stores cleaned, transformed, and historical data for analytics and machine learning.

### Feature Engineering Layer

Creates lag features, rolling averages, growth metrics, inventory metrics, and supplier performance indicators.

### Machine Learning Layer

Contains:

- Demand Forecasting Models
- Revenue Forecasting Models
- Supplier Risk Prediction Models
- Inventory Optimization Models

### MLflow

Tracks experiments, model metrics, parameters, and model versions.

### AI Insight Engine

Generates business explanations and recommendations from model outputs using LLMs.

### FastAPI Backend

Provides REST APIs for dashboards, forecasts, KPIs, and AI-generated insights.

### React Frontend

Provides executive dashboards, forecasting dashboards, supplier analytics, inventory management, and AI insight visualization.