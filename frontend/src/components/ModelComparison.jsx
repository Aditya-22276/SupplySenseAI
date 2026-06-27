import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Brain,
  Zap,
  TrendingUp,
  Cpu,
  Trophy,
  Target,
  BarChart3,
  Sparkles
} from "lucide-react";

function ModelComparison() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadComparison();
  }, []);

  const loadComparison = async () => {
    try {
      const response = await api.get(
        "/forecast/compare"
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Model comparison error:",
        error
      );
    }
  };

  if (!data) {
    return (
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h2 className="text-3xl font-bold text-white">
          Model Comparison
        </h2>

        <p className="text-slate-400 mt-4 animate-pulse">
          Loading model evaluation...
        </p>
      </div>
    );
  }

  const getModelIcon = (name) => {
    switch (name) {
      case "XGBoost":
        return Zap;

      case "LightGBM":
        return Brain;

      case "LSTM":
        return Cpu;

      case "Prophet":
        return TrendingUp;

      default:
        return BarChart3;
    }
  };

  const getGradient = (name) => {
    switch (name) {
      case "XGBoost":
        return "from-cyan-500 to-blue-500";

      case "LightGBM":
        return "from-green-500 to-emerald-500";

      case "LSTM":
        return "from-yellow-500 to-orange-500";

      case "Prophet":
        return "from-purple-500 to-pink-500";

      default:
        return "from-slate-500 to-slate-700";
    }
  };

  return (
    <div
      className="
      relative
      overflow-hidden

      bg-slate-900/80
      backdrop-blur-xl

      border border-slate-800

      rounded-3xl
      p-6

      shadow-[0_0_40px_rgba(0,255,255,0.05)]

      transition-all
      duration-500
      "
    >
      {/* Premium Background Glow */}

      <div
        className="
        absolute top-0 left-0
        w-full h-full
        pointer-events-none
        overflow-hidden
        rounded-3xl
        "
      >
        <div
          className="
          absolute -top-20 -left-20
          w-72 h-72
          bg-cyan-500/10
          blur-[120px]
          "
        />

        <div
          className="
          absolute -bottom-20 -right-20
          w-72 h-72
          bg-purple-500/10
          blur-[120px]
          "
        />
      </div>

      {/* Header */}

      <div className="relative z-10 flex items-center justify-between mb-8">

        <h2 className="text-3xl font-bold text-white">
          Model Evaluation Dashboard
        </h2>

        <div
          className="
          px-4 py-2
          rounded-full
          bg-purple-500/10
          border border-purple-500/30
          text-purple-300
          text-sm
          flex items-center gap-2
          "
        >
          <Sparkles size={14} />
          Production Ranking
        </div>

      </div>

      {/* Best Model Banner */}

      <div
        className="
        relative z-10

        mb-6

        bg-gradient-to-r
        from-yellow-500/20
        via-orange-500/10
        to-yellow-500/20

        border
        border-yellow-500/30

        rounded-2xl
        p-5

        animate-pulse
        "
      >
        <div className="flex items-center gap-4">

          <Trophy
            size={34}
            className="text-yellow-400"
          />

          <div>

            <p className="text-yellow-300 text-sm">
              🏆 Production Champion
            </p>

            <h3 className="text-2xl font-bold text-white">
              {data.best_model}
            </h3>

            <p className="text-cyan-400 text-sm mt-1">
              Lowest RMSE • Highest Accuracy
            </p>

          </div>

        </div>
      </div>

      {/* Rankings */}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">

        {data.rankings.map(
          (model, index) => {

            const Icon =
              getModelIcon(model.model);

            return (
              <div
                key={model.model}
                className={`
                bg-slate-800/40
                backdrop-blur-xl

                border

                ${
                  index === 0
                    ? `
                    border-yellow-500/30
                    shadow-[0_0_25px_rgba(250,204,21,0.2)]
                    bg-yellow-500/5
                    `
                    : "border-slate-700"
                }

                rounded-2xl
                p-5

                hover:scale-[1.03]
                hover:-translate-y-1

                transition-all
                duration-500

                hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
                `}
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    {/* Rank */}

                    <div
                      className={`
                      w-10 h-10
                      rounded-xl
                      flex items-center
                      justify-center
                      font-bold
                      text-white

                      ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-slate-500"
                          : index === 2
                          ? "bg-orange-700"
                          : "bg-slate-700"
                      }
                      `}
                    >
                      #{index + 1}
                    </div>

                    {/* Icon */}

                    <div
                      className={`
                      w-12 h-12
                      rounded-xl
                      bg-gradient-to-r
                      ${getGradient(model.model)}

                      flex items-center
                      justify-center
                      `}
                    >
                      <Icon
                        size={22}
                        className="text-white"
                      />
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-xl font-bold text-white">
                          {model.model}
                        </h3>

                        {index === 0 && (
                          <Trophy
                            size={18}
                            className="text-yellow-400"
                          />
                        )}

                      </div>

                      <p className="text-slate-500 text-sm">
                        Rank #{index + 1}
                      </p>

                      <div className="mt-1 inline-flex px-2 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300">
                        Performance Rank
                      </div>

                    </div>

                  </div>

                </div>

                {/* Metrics */}

                <div className="grid grid-cols-3 gap-3 mt-5">

                  <div className="bg-slate-900 rounded-xl p-3">

                    <p className="text-slate-400 text-xs">
                      RMSE
                    </p>

                    <p className="text-red-400 font-bold">
                      {model.rmse.toLocaleString()}
                    </p>

                  </div>

                  <div className="bg-slate-900 rounded-xl p-3">

                    <p className="text-slate-400 text-xs">
                      MAE
                    </p>

                    <p className="text-cyan-400 font-bold">
                      {model.mae.toLocaleString()}
                    </p>

                  </div>

                  <div className="bg-slate-900 rounded-xl p-3">

                    <p className="text-slate-400 text-xs">
                      MAPE
                    </p>

                    <p className="text-green-400 font-bold">
                      {model.mape}%
                    </p>

                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mt-4">

                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">

                    <div
                      className={`
                      h-full
                      bg-gradient-to-r
                      ${getGradient(model.model)}
                      rounded-full
                      `}
                      style={{
                        width: `${100 - index * 18}%`
                      }}
                    />

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* Metrics Info */}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">

          <Target
            className="text-cyan-400 mb-2"
          />

          <h4 className="font-semibold text-white">
            RMSE
          </h4>

          <p className="text-slate-400 text-sm">
            Lower is better
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">

          <BarChart3
            className="text-green-400 mb-2"
          />

          <h4 className="font-semibold text-white">
            MAE
          </h4>

          <p className="text-slate-400 text-sm">
            Average prediction error
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">

          <TrendingUp
            className="text-purple-400 mb-2"
          />

          <h4 className="font-semibold text-white">
            MAPE
          </h4>

          <p className="text-slate-400 text-sm">
            Percentage forecasting error
          </p>

        </div>

      </div>

    </div>
  );
}

export default ModelComparison;