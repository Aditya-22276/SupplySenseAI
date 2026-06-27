import { useEffect, useState } from "react";
import axios from "axios";

import {
  Package,
  Warehouse,
  ShieldAlert,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/recommendations/"
      );

      setRecommendations(response.data);
    } catch (error) {
      console.error(
        "Recommendations API Error:",
        error
      );
    }
  };

  const styles = [
    {
      icon: Package,
      title: "Inventory Action",
      badge: "Inventory",
      bg: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      icon: Warehouse,
      title: "Warehouse Alert",
      badge: "Warehouse",
      bg: "from-orange-500/20 to-red-500/10",
      border: "border-orange-500/30",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      icon: ShieldAlert,
      title: "Supplier Review",
      badge: "Supplier",
      bg: "from-pink-500/20 to-purple-500/10",
      border: "border-pink-500/30",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      badge: "Forecast",
      bg: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div
      className="
      relative
      overflow-hidden

      bg-slate-900/80
      backdrop-blur-xl

      border border-slate-800
      rounded-3xl

      p-8
      "
    >
      {/* Glow Effects */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/5 blur-[120px]" />

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-4xl font-black text-white">
            AI Recommendations
          </h2>

          <p className="text-slate-400 mt-1">
            AI-powered operational actions
          </p>

        </div>

        <div
          className="
          px-4 py-2

          rounded-2xl

          bg-violet-500/10
          border border-violet-500/30

          flex items-center gap-2

          text-violet-300
          text-sm
          "
        >
          <Sparkles size={16} />
          AI Generated
        </div>

      </div>

      {/* Recommendation Cards */}

      <div className="grid md:grid-cols-2 gap-4">

        {recommendations.map((item, index) => {
          const style =
            styles[index % styles.length];

          const Icon = style.icon;

          return (
            <div
              key={index}
              className={`
                bg-gradient-to-br
                ${style.bg}

                backdrop-blur-xl

                border
                ${style.border}

                rounded-2xl

                p-5

                hover:scale-[1.02]
                transition-all
                duration-300
              `}
            >
              <div className="flex justify-between items-start">

                <div
                  className={`
                  w-12 h-12

                  rounded-xl

                  ${style.iconBg}

                  flex items-center justify-center
                  `}
                >
                  <Icon
                    size={22}
                    className={style.iconColor}
                  />
                </div>

                <div
                  className="
                  px-3 py-1.5

                  rounded-full

                  bg-slate-800/40

                  text-slate-300
                  text-xs
                  "
                >
                  {style.badge}
                </div>

              </div>

              <h3
                className="
                text-2xl
                font-bold
                text-white

                mt-4
                "
              >
                {style.title}
              </h3>

              <p
                className="
                text-slate-300

                mt-3

                text-base
                leading-7
                "
              >
                {item}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Recommendations;