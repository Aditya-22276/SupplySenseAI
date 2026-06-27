import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "High Risk",
    value: 30
  },
  {
    name: "Medium Risk",
    value: 40
  },
  {
    name: "Low Risk",
    value: 30
  }
];

const COLORS = [
  "#ff2d55",
  "#ffb020",
  "#22c55e"
];

export default function RiskOverview() {
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
      <h2 className="text-3xl font-bold text-white">
        Risk Overview
      </h2>

      <p className="text-slate-400 mt-1">
        Overall risk distribution across supply chain
      </p>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="relative h-[280px]">

          <ResponsiveContainer>
            <PieChart>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

          <div
            className="
            absolute inset-0
            flex flex-col
            items-center
            justify-center
            "
          >
            <p className="text-slate-400">
              Overall Risk
            </p>

            <h1 className="text-5xl font-bold text-white">
              72
            </h1>

            <span
              className="
              px-3 py-1
              rounded-full
              bg-red-500/20
              text-red-400
              text-sm
              mt-2
              "
            >
              High Risk
            </span>
          </div>

        </div>

        <div className="flex flex-col justify-center gap-6">

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">

              <div
                className="
                w-4 h-4
                rounded-full
                bg-[#ff2d55]
                "
              />

              <span className="text-white">
                High Risk
              </span>

            </div>

            <div className="text-right">
              <p className="text-white font-semibold">
                3
              </p>

              <p className="text-slate-400">
                30%
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">

              <div
                className="
                w-4 h-4
                rounded-full
                bg-[#ffb020]
                "
              />

              <span className="text-white">
                Medium Risk
              </span>

            </div>

            <div className="text-right">
              <p className="text-white font-semibold">
                4
              </p>

              <p className="text-slate-400">
                40%
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">

              <div
                className="
                w-4 h-4
                rounded-full
                bg-[#22c55e]
                "
              />

              <span className="text-white">
                Low Risk
              </span>

            </div>

            <div className="text-right">
              <p className="text-white font-semibold">
                3
              </p>

              <p className="text-slate-400">
                30%
              </p>
            </div>
          </div>

        </div>

      </div>

      <div
        className="
        mt-6
        bg-red-500/10
        border border-red-500/20
        rounded-2xl
        p-4
        "
      >
        <p className="text-red-400">
          Overall risk level is high.
          Immediate attention recommended.
        </p>
      </div>

    </div>
  );
}