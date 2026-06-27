import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function WarehouseUtilization() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUtilization();
  }, []);

  const fetchUtilization = async () => {
    try {
      const response = await api.get(
        "/warehouse/utilization"
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Warehouse Utilization Error:",
        error
      );
    }
  };

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6
      h-[450px]
      overflow-hidden
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Warehouse Utilization
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Capacity Usage Analytics
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full
          bg-orange-500/10
          border border-orange-500/20
          text-orange-300
          text-sm
          "
        >
          Live Monitor
        </div>

      </div>

      {/* Chart */}

      <div className="h-[300px] mt-2">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 30,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >

            <defs>

              <linearGradient
                id="peachGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FFE0B2"
                />

                <stop
                  offset="50%"
                  stopColor="#FFB974"
                />

                <stop
                  offset="100%"
                  stopColor="#FF8A3D"
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="warehouse_name"
              hide
            />

            <YAxis
              stroke="#94A3B8"
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "14px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="utilization_rate"
              fill="url(#peachGradient)"
              radius={[10, 10, 0, 0]}
              maxBarSize={14}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default WarehouseUtilization;