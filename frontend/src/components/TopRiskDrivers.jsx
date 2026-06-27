export default function TopRiskDrivers() {

  const drivers = [
    {
      driver: "Low Inventory Levels",
      category: "Inventory",
      impact: "High",
      score: 92,
      trend: "↑"
    },
    {
      driver: "Supplier Delivery Delays",
      category: "Supplier",
      impact: "Medium",
      score: 76,
      trend: "↑"
    },
    {
      driver: "Demand Volatility",
      category: "Forecasting",
      impact: "High",
      score: 88,
      trend: "↑"
    },
    {
      driver: "Warehouse Capacity",
      category: "Warehouse",
      impact: "Low",
      score: 35,
      trend: "↓"
    }
  ];

  return (
    <div
      className="
      bg-[#081121]
      border border-slate-800
      rounded-3xl
      p-6
      shadow-2xl
      h-full
      "
    >

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Top Risk Drivers
          </h2>

          <p className="text-slate-400">
            Major factors contributing to risk
          </p>
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800">

              <th className="text-left py-4 text-slate-400">
                Risk Driver
              </th>

              <th className="text-left py-4 text-slate-400">
                Category
              </th>

              <th className="text-left py-4 text-slate-400">
                Impact
              </th>

              <th className="text-left py-4 text-slate-400">
                Score
              </th>

              <th className="text-left py-4 text-slate-400">
                Trend
              </th>

            </tr>

          </thead>

          <tbody>

            {drivers.map((item, index) => (

              <tr
                key={index}
                className="
                border-b border-slate-900
                hover:bg-slate-900/50
                transition-all
                "
              >

                <td className="py-5 text-white font-medium">
                  {item.driver}
                </td>

                <td className="py-5 text-slate-300">
                  {item.category}
                </td>

                <td className="py-5">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        item.impact === "High"
                          ? "bg-red-500/20 text-red-400"
                          : item.impact === "Medium"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-green-500/20 text-green-400"
                      }
                    `}
                  >
                    {item.impact}
                  </span>

                </td>

                <td className="py-5">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                      w-32 h-2 rounded-full
                      bg-slate-800
                      overflow-hidden
                      "
                    >

                      <div
                        className="
                        h-full rounded-full
                        bg-gradient-to-r
                        from-purple-500
                        to-cyan-500
                        "
                        style={{
                          width: `${item.score}%`
                        }}
                      />

                    </div>

                    <span className="text-white">
                      {item.score}
                    </span>

                  </div>

                </td>

                <td className="py-5">

                  <span
                    className={
                      item.trend === "↑"
                        ? "text-red-400 text-xl"
                        : "text-green-400 text-xl"
                    }
                  >
                    {item.trend}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}