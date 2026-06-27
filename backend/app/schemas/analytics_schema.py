from pydantic import BaseModel


class CategoryRevenue(BaseModel):
    category: str
    revenue: float


class DashboardSummary(BaseModel):
    total_revenue: float
    total_sales: int
    total_products: int
    top_categories: list[CategoryRevenue]

class MonthlySales(BaseModel):
 year: int
 month: int
 revenue: float