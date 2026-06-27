import Sidebar from "../components/sidebar";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlySalesChart from "../components/MonthlySalesChart";
import TopProducts from "../components/TopProducts";
import ForecastChart from "../components/ForecastChart";
import TopCategories from "../components/TopCategories";
import ModelComparison from "../components/ModelComparison";
import InventoryRadar from "../components/InventoryRadar";
import LowStockAlerts from "../components/LowStockAlerts";
import AIInsights from "../components/AIInsights";

import WarehouseSummary from "../components/WarehouseSummary";
import WarehouseUtilization from "../components/WarehouseUtilization";
import WarehouseAlerts from "../components/WarehouseAlerts";
import TopSuppliers from "../components/TopSuppliers";
import SupplierSummary from "../components/SupplierSummary";
import SupplierRisk from "../components/SupplierRisk";
import SupplyChainHealth from "../components/SupplyChainHealth";
import BusinessHealth from "../components/BusinessHealth";
import ExecutiveInsights from "../components/ExecutiveInsights";
import Recommendations from "../components/Recommendations";
import LSTMForecastChart from "../components/LSTMForecastChart";
import NotificationBell from "../components/NotificationBell";



function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">

  <div>

    <h1 className="premium-title">

      SupplySense{" "}

      <span className="premium-ai">

        AI

      </span>

      {" "}Dashboard

    </h1>

    <p className="text-slate-400 text-lg mt-2">

      Enterprise Supply Chain Intelligence Platform

    </p>

  </div>

  <NotificationBell />

</div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <KPICard title="Revenue" value="₹25.1 Cr" change="+18.3%" />
          <KPICard title="Sales" value="99,457" change="+12.4%" />
          <KPICard title="Products" value="8,234" change="+5.7%" />
          <KPICard title="AOV" value="₹2,528" change="+6.1%" />
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>

          <CategoryPieChart />
        </div>

        {/* Category Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
          <div className="xl:col-span-2">
            <TopCategories />
          </div>

          <MonthlySalesChart />
        </div>

        {/* Forecasting */}
        <div className="mt-10">
          <ForecastChart />
        </div>
        {/* LSTM Forecast */}
<div className="mt-10">
  <LSTMForecastChart />
</div>

        {/* Model Comparison */}
        <div className="mt-10">
          <ModelComparison />
        </div>

        {/* Inventory Intelligence */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
          <InventoryRadar />
          <LowStockAlerts />
        </div>

        {/* AI Insights */}
        <div className="mt-10">
          <AIInsights />
        </div>

        {/* Top Products */}
        <div className="mt-10">
          <TopProducts />
        </div>

        {/* Warehouse Summary */}
        <div className="mt-10">
          <WarehouseSummary />
        </div>

        {/* Warehouse Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
          <WarehouseUtilization />
          <WarehouseAlerts />
        </div>
        <div className="mt-10">
  <SupplierSummary />
</div>
       {/* Supplier Intelligence */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
  <TopSuppliers />
  <SupplierRisk />
</div>

{/* Executive Intelligence */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
  <SupplyChainHealth />
  <BusinessHealth />
</div>

<div className="mt-10">
  <ExecutiveInsights />
</div>
<div className="mt-10">
  <Recommendations />
 
</div>

      </div>
    </div>
  );
}

export default Dashboard;