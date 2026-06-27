import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1800 },
  { month: "Mar", sales: 2200 },
  { month: "Apr", sales: 1700 },
  { month: "May", sales: 2600 },
  { month: "Jun", sales: 3100 },
];

function MonthlySalesChart() {
  return (
    <div
      className="
      bg-gradient-to-br
      from-slate-900
      via-slate-950
      to-black

      backdrop-blur-xl
      border border-slate-800/80

      rounded-3xl
      p-6
      h-[420px]

      shadow-2xl
      shadow-red-900/10
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-white">
          Monthly Sales
        </h2>

        <div
          className="
          px-3 py-1
          rounded-full

          bg-red-500/10
          border border-red-500/20

          text-red-300
          text-xs
          "
        >
          Sales Trend
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 30,
            }}
          >
            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ef4444"
                />

                <stop
                  offset="50%"
                  stopColor="#dc2626"
                />

                <stop
                  offset="100%"
                  stopColor="#7f1d1d"
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94A3B8",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94A3B8",
                fontSize: 13,
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
                  "0 20px 40px rgba(0,0,0,0.6)",
              }}
              cursor={{
                fill: "rgba(239,68,68,0.08)",
              }}
            />

            <Bar
              dataKey="sales"
              fill="url(#salesGradient)"
              radius={[12, 12, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlySalesChart;