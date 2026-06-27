import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import api from "../services/api";

function ForecastChart() {

  const [forecastData, setForecastData] =
    useState([]);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {

    try {

      const response =
        await api.get("/forecast/xgboost");

      setForecastData(
        response.data
      );

    } catch (error) {

      console.error(
        "Forecast Error:",
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
      "
    >

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2
            className="
            text-3xl
            font-bold
            text-white
            "
          >
            Revenue Forecast
          </h2>

          <p
            className="
            text-slate-400
            mt-1
            "
          >
            XGBoost 30-Day Prediction
          </p>

        </div>

        <div
          className="
          px-4
          py-2
          rounded-full
          bg-purple-500/20
          border border-purple-500/30
          text-purple-300
          text-sm
          "
        >
          Forecast AI
        </div>

      </div>

      <div className="h-[420px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={forecastData}
          >

            <defs>

              {/* Premium Gradient Line */}

              <linearGradient
                id="forecastLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >

                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                />

                <stop
                  offset="50%"
                  stopColor="#8b5cf6"
                />

                <stop
                  offset="100%"
                  stopColor="#ec4899"
                />

              </linearGradient>

              {/* Area Glow */}

              <linearGradient
                id="forecastGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "#94a3b8"
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94a3b8"
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#ffffff",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.5)"
              }}
            />

            <Area
              type="monotone"
              dataKey="prediction"
              stroke="url(#forecastLine)"
              strokeWidth={5}
              fill="url(#forecastGradient)"
              dot={{
                r: 0
              }}
              activeDot={{
                r: 8,
                fill: "#ffffff",
                stroke: "#8b5cf6",
                strokeWidth: 3
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default ForecastChart;