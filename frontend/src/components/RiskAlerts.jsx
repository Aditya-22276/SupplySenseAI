import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert
} from "lucide-react";

export default function RiskAlerts() {

  const alerts = [
    {
      title: "Inventory Risk High",
      message:
        "12 products are below reorder level",
      color:
        "border-red-500/20 bg-red-500/10",
      icon:
        <AlertTriangle className="text-red-400" />
    },
    {
      title: "Supplier Delay Alert",
      message:
        "3 suppliers have delivery delays",
      color:
        "border-amber-500/20 bg-amber-500/10",
      icon:
        <ShieldAlert className="text-amber-400" />
    },
    {
      title: "Stockout Warning",
      message:
        "8 products likely to stockout",
      color:
        "border-purple-500/20 bg-purple-500/10",
      icon:
        <AlertTriangle className="text-purple-400" />
    },
    {
      title: "Warehouse Stable",
      message:
        "Capacity utilization normal",
      color:
        "border-green-500/20 bg-green-500/10",
      icon:
        <CheckCircle className="text-green-400" />
    }
  ];

  return (
    <div
      className="
      bg-[#081121]
      border border-slate-800
      rounded-3xl
      p-6
      shadow-2xl
      "
    >

      <h2 className="text-3xl font-bold text-white">
        Risk Alerts
      </h2>

      <p className="text-slate-400 mb-6">
        Real-time alerts and recommendations
      </p>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className={`
              rounded-2xl
              p-4
              border
              ${alert.color}
            `}
          >

            <div className="flex gap-4">

              <div>
                {alert.icon}
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {alert.title}
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  {alert.message}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}