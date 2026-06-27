import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Fashion", value: 25 },
  { name: "Food", value: 20 },
  { name: "Furniture", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

function CategoryPieChart() {

  const [activeIndex, setActiveIndex] =
    useState(null);

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-5
      h-[420px]
      overflow-hidden
      "
    >

      <h2 className="text-xl font-bold text-white mb-2">
        Revenue by Category
      </h2>

      <div className="h-[220px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="52%"
              innerRadius={60}
              outerRadius={95}
              activeIndex={activeIndex}
              activeOuterRadius={108}
              paddingAngle={6}
              dataKey="value"
              onMouseEnter={(_, index) =>
                setActiveIndex(index)
              }
              onMouseLeave={() =>
                setActiveIndex(null)
              }
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  opacity={
                    activeIndex === null
                      ? 1
                      : activeIndex === index
                      ? 1
                      : 0.25
                  }
                />
              ))}

            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value}% Revenue`
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff"
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div
        className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-2
        mt-1
        text-xs
        "
      >

        {data.map((item, index) => (

          <div
            key={index}
            className="
            flex
            items-center
            justify-between
            "
          >

            <div className="flex items-center gap-2">

              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index]
                }}
              />

              <span className="text-slate-300">
                {item.name}
              </span>

            </div>

            <span className="text-white font-semibold">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CategoryPieChart;