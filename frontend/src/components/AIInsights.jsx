import {
  TrendingUp,
  AlertTriangle,
  Brain,
  Sparkles,
} from "lucide-react";

function AllInsights() {
  const insights = [
    {
      title: "Growth Opportunity",
      description:
        "Electronics demand expected to increase by 12%",
      icon: TrendingUp,
      color:
        "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    },
    {
      title: "Inventory Warning",
      description:
        "Warehouse B inventory below reorder level",
      icon: AlertTriangle,
      color:
        "bg-orange-500/10 border-orange-500/30 text-orange-300",
    },
    {
      title: "Forecast Insight",
      description:
        "XGBoost currently delivers best forecast accuracy",
      icon: Brain,
      color:
        "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    },
    {
      title: "Revenue Prediction",
      description:
        "Revenue expected to grow next month",
      icon: Sparkles,
      color:
        "bg-violet-500/10 border-violet-500/30 text-violet-300",
    },
  ];

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
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-white">
          AI Insights
        </h2>

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
          AI Generated
        </div>

      </div>

      {/* Insight Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`
                ${item.color}

                backdrop-blur-xl
                border
                rounded-2xl
                p-5

                hover:scale-[1.02]
                hover:shadow-xl

                transition-all
                duration-300
              `}
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                  p-3
                  rounded-xl
                  bg-slate-900/40
                  "
                >
                  <Icon size={22} />
                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-slate-200 leading-relaxed">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AllInsights;