import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Activity,
  ShieldCheck,
} from "lucide-react";

function InventoryRadar() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(87);

  useEffect(() => {
    fetchInventoryHealth();
  }, []);

  const fetchInventoryHealth = async () => {
    try {
      const response = await api.get(
        "/inventory/health"
      );

      const health = response.data;

      setData([
        {
          metric: "Stock",
          value: health.stock_health,
        },
        {
          metric: "Supply",
          value: health.availability,
        },
        {
          metric: "Demand",
          value: health.demand_match,
        },
        {
          metric: "Efficiency",
          value: health.efficiency,
        },
      ]);

      const avg =
        (
          health.stock_health +
          health.availability +
          health.demand_match +
          health.efficiency
        ) / 4;

      setScore(Math.round(avg));
    } catch (error) {
      console.error(
        "Inventory Health API Error:",
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
      min-h-[650px]
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Inventory Risk Analysis
          </h2>

          <p className="text-slate-400 mt-1">
            Multi-dimensional inventory scoring
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full
          bg-cyan-500/10
          border border-cyan-500/30
          text-cyan-300
          text-sm
          "
        >
          AI Powered
        </div>

      </div>

      {/* Radar + Score */}

      <div className="flex items-start gap-6">

        {/* Radar */}

        <div className="relative w-[60%] h-[320px]">

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-r
            from-violet-500/20
            via-purple-500/10
            to-cyan-500/20

            blur-3xl
            rounded-full
            "
          />

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <RadarChart
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%"
            >

              <PolarGrid
                stroke="#475569"
                strokeOpacity={0.7}
              />

              <PolarAngleAxis
                dataKey="metric"
                tick={{
                  fill: "#E2E8F0",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              />

              <Radar
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="#8b5cf6"
                fillOpacity={0.45}
              />

            </RadarChart>

          </ResponsiveContainer>

        </div>

        {/* Score */}

        <div className="w-[40%]">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={30}
              className="text-emerald-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Inventory Health Score
              </p>

              <h2
                className="
                text-4xl
                font-black

                bg-gradient-to-r
                from-cyan-300
                to-emerald-300

                bg-clip-text
                text-transparent
                "
              >
                {score}%
              </h2>

            </div>

          </div>

          {/* Meter */}

          <div className="mt-6">

            <div
              className="
              h-3
              bg-slate-800
              rounded-full
              overflow-hidden
              "
            >
              <div
                className="
                h-full

                bg-gradient-to-r
                from-emerald-500
                via-cyan-500
                to-sky-500

                rounded-full

                shadow-lg
                shadow-cyan-500/40
                "
                style={{
                  width: `${score}%`,
                }}
              />
            </div>

          </div>

          {/* Status */}

          <div className="mt-4">

            <span
              className="
              px-4 py-2
              rounded-full

              bg-emerald-500/10
              border border-emerald-500/30

              text-emerald-300
              text-sm
              font-medium
              "
            >
              Excellent Health
            </span>

          </div>

        </div>

      </div>

      {/* Recommendation */}

      <div
        className="
        mt-4

        bg-slate-800/50
        border border-slate-700

        rounded-2xl
        p-4

        hover:border-cyan-500/40
        transition-all
        "
      >

        <div className="flex gap-3 items-start">

          <Activity
            size={18}
            className="text-cyan-400 mt-1 flex-shrink-0"
          />

          <div>

            <h3 className="text-white font-semibold text-base">
              AI Recommendation
            </h3>

            <p
              className="
              text-slate-400
              text-xs
              mt-2
              leading-6
              "
            >
              Inventory levels are healthy.
              Maintain reorder points,
              monitor seasonal demand,
              and optimize replenishment
              cycles to sustain service levels.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InventoryRadar;