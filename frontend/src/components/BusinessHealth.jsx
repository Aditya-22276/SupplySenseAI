import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

function BusinessHealth() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const response = await api.get(
        "/executive/business"
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
      from-cyan-500/10
      via-blue-500/5
      to-violet-500/10

      backdrop-blur-xl

      border border-cyan-500/20
      rounded-3xl

      p-5
      h-[180px]
      "
    >
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Business Health
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Executive Performance
          </p>

        </div>

        <div
          className="
          w-14 h-14

          rounded-2xl

          bg-cyan-500/10
          border border-cyan-500/20

          flex items-center justify-center
          "
        >
          <BriefcaseBusiness
            size={26}
            className="text-cyan-400"
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
            from-cyan-300
            to-blue-300

            bg-clip-text
            text-transparent
            "
          >
            {health.score}
          </h1>

          <p className="text-cyan-300 mt-1">
            Overall Score
          </p>

        </div>

        <div
          className="
          flex items-center gap-2

          px-3 py-2

          rounded-full

          bg-cyan-500/10
          border border-cyan-500/20

          text-cyan-300
          text-sm
          "
        >
          <Sparkles size={14} />
          Executive
        </div>

      </div>

    </div>
  );
}

export default BusinessHealth;