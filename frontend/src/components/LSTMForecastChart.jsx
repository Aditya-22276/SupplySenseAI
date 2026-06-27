import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function LSTMForecastChart() {

  const [data, setData] =
    useState([]);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/forecast/lstm"
        );

      setData(
        response.data
      );

    } catch (error) {

      console.error(
        "LSTM Forecast Error:",
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
            LSTM Forecast
          </h2>

          <p
            className="
            text-slate-400
            mt-1
            "
          >
            Deep Learning Revenue Prediction
          </p>

        </div>

        <div
          className="
          px-4
          py-2
          rounded-full
          bg-emerald-500/20
          border border-emerald-500/30
          text-emerald-300
          text-sm
          "
        >
          Neural Network
        </div>

      </div>

      <div className="h-[420px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
          >

            <defs>

              <linearGradient
                id="lstmLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >

                <stop
                  offset="0%"
                  stopColor="#10b981"
                />

                <stop
                  offset="50%"
                  stopColor="#06b6d4"
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                />

              </linearGradient>

              <linearGradient
                id="lstmGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#10b981"
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
              dataKey="ds"
              tick={{
                fill: "#94a3b8"
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[
                "dataMin - 1000",
                "dataMax + 1000"
              ]}
              tickFormatter={(value) =>
                Math.round(value)
                  .toLocaleString()
              }
              tick={{
                fill: "#94a3b8"
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value)
                  .toLocaleString()}`
              ]}
              contentStyle={{
                background:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius:
                  "16px",
                color:
                  "#ffffff",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.5)"
              }}
            />

            <Area
              type="monotone"
              dataKey="prediction"
              stroke="url(#lstmLine)"
              strokeWidth={5}
              fill="url(#lstmGradient)"
              dot={{
                r: 0
              }}
              activeDot={{
                r: 8,
                fill: "#ffffff",
                stroke: "#10b981",
                strokeWidth: 3
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default LSTMForecastChart;