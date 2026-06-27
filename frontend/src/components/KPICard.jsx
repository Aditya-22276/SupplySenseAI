import {
  TrendingUp,
  ShoppingCart,
  Package,
  DollarSign,
  Brain,
  Activity,
  Truck
} from "lucide-react";

function KPICard({ title, value, change }) {

  const getConfig = () => {

    switch (title) {

      case "Revenue":
        return {
          icon: <TrendingUp size={22} className="text-white" />,
          color: "bg-purple-600"
        };

      case "Sales":
        return {
          icon: <ShoppingCart size={22} className="text-white" />,
          color: "bg-cyan-500"
        };

      case "Products":
        return {
          icon: <Package size={22} className="text-white" />,
          color: "bg-green-500"
        };

      case "AOV":
        return {
          icon: <DollarSign size={22} className="text-white" />,
          color: "bg-orange-500"
        };

      case "Forecast":
        return {
          icon: <Brain size={22} className="text-white" />,
          color: "bg-violet-500"
        };

      case "Inventory":
        return {
          icon: <Activity size={22} className="text-white" />,
          color: "bg-blue-500"
        };

      default:
        return {
          icon: <Truck size={22} className="text-white" />,
          color: "bg-pink-500"
        };
    }
  };

  const config = getConfig();

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6

      hover:scale-[1.02]
      hover:border-cyan-500/40
      hover:shadow-xl
      hover:shadow-cyan-500/10

      transition-all
      duration-300
      "
    >

      {/* Top Row */}

      <div className="flex items-center justify-between mb-8">

        <div
          className={`
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
          ${config.color}
          `}
        >
          {config.icon}
        </div>

        <div
          className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          border
          border-green-500/20
          "
        >
          <span className="text-green-400 text-sm font-semibold">
            {change}
          </span>
        </div>

      </div>

      {/* Value */}

      <h2 className="text-4xl font-bold text-white">
        {value}
      </h2>

      {/* Title */}

      <p className="text-slate-400 mt-3 text-lg">
        {title}
      </p>

    </div>
  );
}

export default KPICard;