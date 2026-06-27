import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { week: "Week 1", score: 58 },
  { week: "Week 2", score: 62 },
  { week: "Week 3", score: 59 },
  { week: "Week 4", score: 65 },
  { week: "Week 5", score: 68 },
  { week: "Week 6", score: 72 }
];

export default function RiskTrendChart() {
  return (
    <div
      className="
      bg-[#081121]
      border border-slate-800
      rounded-3xl
      p-6
      shadow-2xl
      "
    >
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Risk Trend
          </h2>

          <p className="text-slate-400">
            Overall risk score trend over time
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-xl
          bg-slate-900
          border border-slate-700
          text-white
          "
        >
          6 Weeks
        </div>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="riskGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="week"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff"
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#a855f7"
              strokeWidth={4}
              fill="url(#riskGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-4 flex justify-between">

        <div className="text-center">
          <p className="text-purple-400 text-2xl font-bold">
            72
          </p>

          <p className="text-slate-400">
            Current Risk
          </p>
        </div>

        <div className="text-center">
          <p className="text-green-400 text-2xl font-bold">
            +14%
          </p>

          <p className="text-slate-400">
            Improvement
          </p>
        </div>

        <div className="text-center">
          <p className="text-cyan-400 text-2xl font-bold">
            Stable
          </p>

          <p className="text-slate-400">
            Trend
          </p>
        </div>

      </div>

    </div>
  );
}