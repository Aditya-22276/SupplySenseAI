import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

const data = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1400000 },
  { month: "Mar", revenue: 1800000 },
  { month: "Apr", revenue: 1600000 },
  { month: "May", revenue: 2200000 },
  { month: "Jun", revenue: 2500000 },
];

function RevenueChart() {
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
          <h2 className="text-2xl font-bold text-white">
            Revenue Trend
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Monthly Revenue Growth
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
          12 Months
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) =>
                `₹${(value / 100000).toFixed(0)}L`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff"
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#revenueGradient)"
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{
                fill: "#06b6d4",
                r: 5
              }}
              activeDot={{
                r: 8
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default RevenueChart;