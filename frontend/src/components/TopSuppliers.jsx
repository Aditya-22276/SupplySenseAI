import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Trophy,
  TrendingUp,
} from "lucide-react";

function TopSuppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchTopSuppliers();
  }, []);

  const fetchTopSuppliers = async () => {
    try {
      const response = await api.get(
        "/supplier/top"
      );

      setSuppliers(response.data);
    } catch (error) {
      console.error(
        "Top Suppliers API Error:",
        error
      );
    }
  };

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6
      h-[420px]
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Top Suppliers
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Reliability Leaders
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full

          bg-emerald-500/10
          border border-emerald-500/30

          text-emerald-300
          text-sm
          "
        >
          Elite
        </div>

      </div>

      <div className="overflow-y-auto h-[300px] pr-2 space-y-4">

        {suppliers.map((item, index) => (

          <div
            key={index}
            className="
            bg-gradient-to-r
            from-emerald-500/10
            to-cyan-500/10

            border border-emerald-500/20
            rounded-2xl

            p-4

            hover:border-cyan-400/40
            transition-all
            "
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-14 h-14

                  rounded-2xl

                  bg-emerald-500/10
                  border border-emerald-500/20

                  flex items-center justify-center
                  "
                >
                  <Trophy
                    size={24}
                    className="text-emerald-400"
                  />
                </div>

                <div>

                  <h3 className="text-white font-bold text-xl">
                    {item.supplier_name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Trusted Supplier
                  </p>

                </div>

              </div>

              <div
                className="
                px-4 py-2

                rounded-full

                bg-emerald-500/10
                border border-emerald-500/20

                text-emerald-300
                font-bold
                "
              >
                {item.reliability_score}
              </div>

            </div>

            <div className="mt-4">

              <div
                className="
                h-2
                bg-slate-800
                rounded-full
                overflow-hidden
                "
              >
                <div
                  className="
                  h-full

                  bg-gradient-to-r
                  from-emerald-400
                  via-cyan-400
                  to-sky-400

                  rounded-full
                  "
                  style={{
                    width: `${item.reliability_score}%`,
                  }}
                />
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopSuppliers;