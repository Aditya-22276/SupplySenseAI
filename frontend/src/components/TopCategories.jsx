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
  { category: "Electronics", sales: 142800 },
  { category: "Apparel", sales: 118400 },
  { category: "Food", sales: 96200 },
  { category: "Home", sales: 78900 },
  { category: "Industrial", sales: 54300 },
];

function TopCategories() {
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
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-white">
          Top Categories
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
          Revenue Mix
        </div>

      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <defs>

            <linearGradient
              id="categoryGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="#7f1d1d"
              />

              <stop
                offset="50%"
                stopColor="#dc2626"
              />

              <stop
                offset="100%"
                stopColor="#ef4444"
              />
            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            type="number"
            tick={{
              fill: "#94A3B8",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            dataKey="category"
            type="category"
            width={120}
            tick={{
              fill: "#E2E8F0",
              fontSize: 15,
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
          />

          <Bar
            dataKey="sales"
            fill="url(#categoryGradient)"
            radius={[0, 14, 14, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopCategories;