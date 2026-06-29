import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Activity,
  TrendingUp,
} from "lucide-react";

function SupplyChainHealth() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const response = await api.get(
        "/executive/health"
      );

      setHealth(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!health) return null;

  return (
    <div
      className="
      relative
      overflow-hidden

      bg-gradient-to-br
      from-emerald-500/10
      via-green-500/5
      to-cyan-500/10

      backdrop-blur-xl

      border border-emerald-500/20
      rounded-3xl

      p-5
      h-[180px]
      "
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Supply Chain Health
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Real-time Performance
          </p>
        </div>

        <div
          className="
          w-14 h-14

          rounded-2xl

          bg-emerald-500/10
          border border-emerald-500/20

          flex items-center justify-center
          "
        >
          <Activity
            size={26}
            className="text-emerald-400"
          />
        </div>

      </div>

      <div className="mt-4 flex items-end justify-between">

        <div>

          <h1
            className="
            text-5xl
            font-black

            bg-gradient-to-r
            from-emerald-300
            to-cyan-300

            bg-clip-text
            text-transparent
            "
          >
            {health.score}
          </h1>

          <p className="text-emerald-300 mt-1">
            {health.status}
          </p>

        </div>

        <div
          className="
          flex items-center gap-2

          px-3 py-2

          rounded-full

          bg-emerald-500/10
          border border-emerald-500/20

          text-emerald-300
          text-sm
          "
        >
          <TrendingUp size={14} />
          Healthy
        </div>

      </div>

    </div>
  );
}

export default SupplyChainHealth;