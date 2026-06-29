import { useEffect, useState } from "react";
import api from "../services/api";

import {
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

function SupplierRisk() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchRiskSuppliers();
  }, []);

  const fetchRiskSuppliers = async () => {
    try {
      const response = await api.get(
        "/supplier/risk"
      );

      setSuppliers(response.data);
    } catch (error) {
      console.error(
        "Supplier Risk API Error:",
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
            Supplier Risk
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Risk Monitoring
          </p>

        </div>

        <div
          className="
          px-4 py-2

          rounded-full

          bg-red-500/10
          border border-red-500/30

          text-red-300
          text-sm
          "
        >
          Critical
        </div>

      </div>

      <div className="overflow-y-auto h-[300px] pr-2 space-y-4">

        {suppliers.map((item, index) => (

          <div
            key={index}
            className="
            bg-gradient-to-r
            from-red-500/10
            via-orange-500/10
            to-amber-500/10

            border border-red-500/30

            rounded-2xl
            p-4

            hover:border-orange-400/50
            transition-all
            "
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-14 h-14

                  rounded-2xl

                  bg-red-500/10
                  border border-red-500/20

                  flex items-center justify-center
                  "
                >
                  <ShieldAlert
                    size={24}
                    className="text-red-400"
                  />
                </div>

                <div>

                  <h3 className="text-white font-bold text-xl">
                    {item.supplier_name}
                  </h3>

                  <p className="text-red-300 text-sm">
                    High Risk Supplier
                  </p>

                </div>

              </div>

              <div
                className="
                px-4 py-2

                rounded-full

                bg-red-500/10
                border border-red-500/20

                text-red-300
                font-bold
                "
              >
                {item.reliability_score}
              </div>

            </div>

            <div className="mt-4 space-y-3">

              <div>

                <div className="flex justify-between mb-1">

                  <span className="text-slate-300 text-sm">
                    Reliability
                  </span>

                  <span className="text-red-400 text-sm">
                    {item.reliability_score}
                  </span>

                </div>

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
                    from-red-500
                    via-orange-500
                    to-yellow-500

                    rounded-full
                    "
                    style={{
                      width: `${item.reliability_score}%`,
                    }}
                  />
                </div>

              </div>

              <div>

                <div className="flex justify-between mb-1">

                  <span className="text-slate-300 text-sm">
                    Delivery Rate
                  </span>

                  <span className="text-yellow-300 text-sm">
                    {item.on_time_delivery_rate}%
                  </span>

                </div>

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
                    from-yellow-400
                    via-orange-400
                    to-red-400

                    rounded-full
                    "
                    style={{
                      width: `${item.on_time_delivery_rate}%`,
                    }}
                  />
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SupplierRisk;