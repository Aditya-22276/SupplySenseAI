import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Warehouse,
  Database,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function WarehouseSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get(
        "/warehouse/summary"
      );

      setSummary(response.data);
    } catch (error) {
      console.error(
        "Warehouse Summary Error:",
        error
      );
    }
  };

  if (!summary) {
    return (
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <p className="text-slate-400">
          Loading Warehouse Summary...
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

      <div className="mb-6">

        <h2 className="text-4xl font-bold text-white">
          Warehouse Summary
        </h2>

        <p className="text-slate-400 mt-2">
          Real-time warehouse capacity overview
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Total Capacity */}

        <div
          className="
          bg-slate-800/60
          backdrop-blur-xl
          border border-cyan-500/20
          rounded-2xl
          p-5

          hover:border-cyan-400/50
          hover:shadow-lg
          hover:shadow-cyan-500/10

          transition-all duration-300
          "
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-400 text-sm">
                Total Capacity
              </p>

              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                {summary.total_capacity.toLocaleString()}
              </h3>

            </div>

            <div
              className="
              w-14 h-14
              rounded-2xl

              bg-cyan-500/10
              border border-cyan-500/20

              flex items-center justify-center
              "
            >
              <Warehouse
                size={28}
                className="text-cyan-400"
              />
            </div>

          </div>
        </div>

        {/* Used Capacity */}

        <div
          className="
          bg-slate-800/60
          backdrop-blur-xl
          border border-violet-500/20
          rounded-2xl
          p-5

          hover:border-violet-400/50
          hover:shadow-lg
          hover:shadow-violet-500/10

          transition-all duration-300
          "
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-400 text-sm">
                Used Capacity
              </p>

              <h3 className="text-3xl font-bold text-violet-400 mt-2">
                {summary.used_capacity.toLocaleString()}
              </h3>

            </div>

            <div
              className="
              w-14 h-14
              rounded-2xl

              bg-violet-500/10
              border border-violet-500/20

              flex items-center justify-center
              "
            >
              <Database
                size={28}
                className="text-violet-400"
              />
            </div>

          </div>
        </div>

        {/* Free Capacity */}

        <div
          className="
          bg-slate-800/60
          backdrop-blur-xl
          border border-emerald-500/20
          rounded-2xl
          p-5

          hover:border-emerald-400/50
          hover:shadow-lg
          hover:shadow-emerald-500/10

          transition-all duration-300
          "
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-400 text-sm">
                Free Capacity
              </p>

              <h3 className="text-3xl font-bold text-emerald-400 mt-2">
                {summary.free_capacity.toLocaleString()}
              </h3>

            </div>

            <div
              className="
              w-14 h-14
              rounded-2xl

              bg-emerald-500/10
              border border-emerald-500/20

              flex items-center justify-center
              "
            >
              <ShieldCheck
                size={28}
                className="text-emerald-400"
              />
            </div>

          </div>
        </div>

        {/* Avg Utilization */}

        <div
          className="
          bg-slate-800/60
          backdrop-blur-xl
          border border-orange-500/20
          rounded-2xl
          p-5

          hover:border-orange-400/50
          hover:shadow-lg
          hover:shadow-orange-500/10

          transition-all duration-300
          "
        >
          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-400 text-sm">
                Avg Utilization
              </p>

              <h3 className="text-3xl font-bold text-orange-400 mt-2">
                {summary.average_utilization}%
              </h3>

            </div>

            <div
              className="
              w-14 h-14
              rounded-2xl

              bg-orange-500/10
              border border-orange-500/20

              flex items-center justify-center
              "
            >
              <TrendingUp
                size={28}
                className="text-orange-400"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default WarehouseSummary;