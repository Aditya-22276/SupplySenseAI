import { useEffect, useState } from "react";
import axios from "axios";

import {
  Boxes,
  Warehouse,
  ShieldAlert,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function ExecutiveInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/executive/insights"
      );

      setInsights(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cardStyles = [
    {
      icon: Boxes,
      title: "Inventory Strategy",
      badge: "Inventory",
      color:
        "from-cyan-500/15 to-sky-500/10",
      border:
        "border-cyan-500/30",
      iconBg:
        "bg-cyan-500/10 border-cyan-500/30",
      iconColor:
        "text-cyan-400",
    },

    {
      icon: Warehouse,
      title: "Warehouse Alert",
      badge: "Warehouse",
      color:
        "from-orange-500/15 to-amber-500/10",
      border:
        "border-orange-500/30",
      iconBg:
        "bg-orange-500/10 border-orange-500/30",
      iconColor:
        "text-orange-400",
    },

    {
      icon: ShieldAlert,
      title: "Supplier Risk",
      badge: "Risk",
      color:
        "from-red-500/15 to-pink-500/10",
      border:
        "border-red-500/30",
      iconBg:
        "bg-red-500/10 border-red-500/30",
      iconColor:
        "text-red-400",
    },

    {
      icon: TrendingUp,
      title: "Growth Forecast",
      badge: "Forecast",
      color:
        "from-emerald-500/15 to-green-500/10",
      border:
        "border-emerald-500/30",
      iconBg:
        "bg-emerald-500/10 border-emerald-500/30",
      iconColor:
        "text-emerald-400",
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

        <div>

          <h2 className="text-4xl font-bold text-white">
            Executive Insights
          </h2>

          <p className="text-slate-400 mt-1">
            AI-powered business intelligence
          </p>

        </div>

        <div
          className="
          flex items-center gap-2

          px-4 py-2

          rounded-full

          bg-violet-500/10
          border border-violet-500/30

          text-violet-300
          text-sm
          "
        >
          <Sparkles size={16} />
          AI Generated
        </div>

      </div>

      {/* Insights Grid */}

      <div className="grid md:grid-cols-2 gap-5">

        {insights.map((item, index) => {
          const style =
            cardStyles[index % cardStyles.length];

          const Icon = style.icon;

          return (
            <div
              key={index}
              className={`
                bg-gradient-to-r
                ${style.color}

                border ${style.border}

                rounded-2xl
                p-5

                hover:scale-[1.02]
                hover:shadow-lg

                transition-all
                duration-300
              `}
            >
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div
                    className={`
                    w-14 h-14

                    rounded-2xl

                    border

                    flex items-center justify-center

                    ${style.iconBg}
                    `}
                  >
                    <Icon
                      size={26}
                      className={style.iconColor}
                    />
                  </div>

                  <div>

                    <h3 className="text-white font-bold text-lg">
                      {style.title}
                    </h3>

                    <p className="text-slate-300 mt-2 leading-relaxed">
                      {item}
                    </p>

                  </div>

                </div>

                <div
                  className="
                  px-3 py-1

                  rounded-full

                  bg-slate-800/50

                  text-xs
                  text-slate-300
                  "
                >
                  {style.badge}
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ExecutiveInsights;