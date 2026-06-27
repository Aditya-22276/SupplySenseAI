import { useEffect, useState } from "react";
import api from "../services/api";

import {
  AlertTriangle,
} from "lucide-react";

function WarehouseAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await api.get(
        "/warehouse/alerts"
      );

      setAlerts(response.data);
    } catch (error) {
      console.error(
        "Warehouse Alerts Error:",
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
      h-[450px]
      "
    >

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-white">
          Warehouse Alerts
        </h2>

        <div
          className="
          px-4 py-2
          rounded-full

          bg-yellow-500/10
          border border-yellow-500/20

          text-yellow-300
          text-sm
          "
        >
          Critical
        </div>

      </div>

      <div className="space-y-4 overflow-y-auto h-[340px] pr-2">

        {alerts.map((item, index) => (

          <div
            key={index}
            className="
            bg-slate-800/60
            backdrop-blur-xl

            border border-yellow-500/20
            rounded-2xl
            p-4

            hover:border-yellow-400/40
            hover:shadow-lg
            hover:shadow-yellow-500/10

            transition-all
            "
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div
                  className="
                  w-12 h-12

                  rounded-xl

                  bg-yellow-500/10
                  border border-yellow-500/20

                  flex items-center justify-center
                  "
                >
                  <AlertTriangle
                    size={20}
                    className="text-yellow-400"
                  />
                </div>

                <div>

                  <h3 className="text-white font-semibold text-xl">
                    {item.warehouse_name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Capacity Alert
                  </p>

                </div>

              </div>

              <div
                className="
                px-4 py-2

                rounded-full

                bg-yellow-500/10
                border border-yellow-500/20

                text-yellow-300
                font-semibold
                "
              >
                {item.utilization_rate}%
              </div>

            </div>

            {/* Progress */}

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
                  from-yellow-400
                  via-orange-400
                  to-red-500

                  rounded-full
                  "
                  style={{
                    width: `${Math.min(
                      item.utilization_rate,
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

export default WarehouseAlerts;