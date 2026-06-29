import { useEffect, useState } from "react";
import api from "../services/api";
import {
  AlertTriangle,
  Package
} from "lucide-react";

function LowStockAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      const response = await api.get(
        "/inventory/low-stock"
      );

      setAlerts(response.data);
    } catch (error) {
      console.error(
        "Low Stock API Error:",
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
      h-[650px]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-white">
          Low Stock Alerts
        </h2>

        <div
          className="
          px-3 py-1
          rounded-full
          bg-red-500/10
          border border-red-500/30
          text-red-400
          text-sm
          "
        >
          Critical
        </div>

      </div>

      {/* Alert List */}

      <div
        className="
        space-y-4
        overflow-y-auto
        h-[540px]
        pr-2
        "
      >

        {alerts.map((item, index) => (

          <div
            key={index}
            className="
            bg-slate-800/60
            border border-slate-700
            rounded-2xl
            p-4

            hover:border-red-500/50
            hover:bg-slate-800
            transition-all
            duration-300
            "
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className="
                  w-10 h-10
                  rounded-xl
                  bg-red-500/10
                  border border-red-500/30

                  flex
                  items-center
                  justify-center
                  "
                >
                  <AlertTriangle
                    size={18}
                    className="text-red-400"
                  />
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    {item.product}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Inventory Alert
                  </p>

                </div>

              </div>

              <div
                className="
                px-3 py-1
                rounded-full
                bg-red-500/10
                text-red-400
                text-sm
                font-semibold
                "
              >
                {item.stock} Left
              </div>

            </div>

            {/* Progress Bar */}

            <div className="mt-4">

              <div
                className="
                h-2
                bg-slate-700
                rounded-full
                overflow-hidden
                "
              >
                <div
                  className="
                  h-full
                  bg-gradient-to-r
                  from-red-700
                  via-red-500
                  to-red-400
                  rounded-full
                  "
                  style={{
                    width: `${Math.min(
                      item.stock,
                      100
                    )}%`,
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

export default LowStockAlerts;