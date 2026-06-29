import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Users,
  ShieldCheck,
  Truck,
  Award,
} from "lucide-react";

function SupplierSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get(
        "/supplier/summary"
      );

      setSummary(response.data);
    } catch (error) {
      console.error(
        "Supplier Summary Error:",
        error
      );
    }
  };

  if (!summary) {
    return (
      <div
        className="
        bg-slate-900/80
        backdrop-blur-xl
        border border-slate-800
        rounded-3xl
        p-6
        "
      >
        <p className="text-slate-400">
          Loading Supplier Summary...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Supplier Summary
          </h2>

          <p className="text-slate-400 mt-1">
            Supplier Performance Analytics
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full

          bg-cyan-500/10
          border border-cyan-500/20

          text-cyan-300
          text-sm
          "
        >
          Live Metrics
        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-5">

        {/* Total Suppliers */}

        <div
          className="
          bg-cyan-500/5
          border border-cyan-500/20
          rounded-2xl
          p-5

          flex justify-between items-center

          hover:border-cyan-400/50
          hover:shadow-lg
          hover:shadow-cyan-500/10

          transition-all duration-300
          "
        >
          <div>
            <p className="text-slate-400">
              Total Suppliers
            </p>

            <h3 className="text-4xl font-bold text-cyan-400 mt-2">
              {summary.total_suppliers}
            </h3>
          </div>

          <div
            className="
            w-16 h-16

            rounded-2xl

            bg-cyan-500/10
            border border-cyan-500/20

            flex items-center justify-center
            "
          >
            <Users
              size={30}
              className="text-cyan-400"
            />
          </div>
        </div>

        {/* Reliability */}

        <div
          className="
          bg-emerald-500/5
          border border-emerald-500/20
          rounded-2xl
          p-5

          flex justify-between items-center

          hover:border-emerald-400/50
          hover:shadow-lg
          hover:shadow-emerald-500/10

          transition-all duration-300
          "
        >
          <div>
            <p className="text-slate-400">
              Avg Reliability
            </p>

            <h3 className="text-4xl font-bold text-emerald-400 mt-2">
              {summary.avg_reliability}
            </h3>
          </div>

          <div
            className="
            w-16 h-16

            rounded-2xl

            bg-emerald-500/10
            border border-emerald-500/20

            flex items-center justify-center
            "
          >
            <ShieldCheck
              size={30}
              className="text-emerald-400"
            />
          </div>
        </div>

        {/* Delivery */}

        <div
          className="
          bg-violet-500/5
          border border-violet-500/20
          rounded-2xl
          p-5

          flex justify-between items-center

          hover:border-violet-400/50
          hover:shadow-lg
          hover:shadow-violet-500/10

          transition-all duration-300
          "
        >
          <div>
            <p className="text-slate-400">
              Avg Delivery
            </p>

            <h3 className="text-4xl font-bold text-violet-400 mt-2">
              {summary.avg_delivery}
            </h3>
          </div>

          <div
            className="
            w-16 h-16

            rounded-2xl

            bg-violet-500/10
            border border-violet-500/20

            flex items-center justify-center
            "
          >
            <Truck
              size={30}
              className="text-violet-400"
            />
          </div>
        </div>

        {/* Quality */}

        <div
          className="
          bg-orange-500/5
          border border-orange-500/20
          rounded-2xl
          p-5

          flex justify-between items-center

          hover:border-orange-400/50
          hover:shadow-lg
          hover:shadow-orange-500/10

          transition-all duration-300
          "
        >
          <div>
            <p className="text-slate-400">
              Avg Quality
            </p>

            <h3 className="text-4xl font-bold text-orange-400 mt-2">
              {summary.avg_quality}
            </h3>
          </div>

          <div
            className="
            w-16 h-16

            rounded-2xl

            bg-orange-500/10
            border border-orange-500/20

            flex items-center justify-center
            "
          >
            <Award
              size={30}
              className="text-orange-400"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default SupplierSummary;