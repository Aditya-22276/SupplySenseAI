import {
  Package,
  Truck,
  ShoppingCart,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export default function RiskCards() {
  const cards = [
    {
      title: "INVENTORY RISK",
      risk: "HIGH",
      score: 90,
      color: "rose",
      icon: <Package size={30} />,
      left: "Current Stock",
      leftValue: "50 Units",
      right: "Reorder Point",
      rightValue: "100 Units",
      trend: "+15%"
    },
    {
      title: "SUPPLIER RISK",
      risk: "MEDIUM",
      score: 45,
      color: "amber",
      icon: <Truck size={30} />,
      left: "Avg Delay",
      leftValue: "10 Days",
      right: "Fulfillment",
      rightValue: "80%",
      trend: "+5%"
    },
    {
      title: "STOCKOUT RISK",
      risk: "HIGH",
      score: 80,
      color: "violet",
      icon: <ShoppingCart size={30} />,
      left: "Forecast",
      leftValue: "500 Units",
      right: "Stock",
      rightValue: "300 Units",
      trend: "+20%"
    }
  ];

  const colorStyles = {
    rose: {
      border: "border-rose-500/30",
      bg: "from-rose-950/40 to-slate-900",
      glow: "shadow-[0_0_40px_rgba(244,63,94,0.15)]",
      text: "text-rose-400",
      badge: "bg-rose-500/15 text-rose-400",
      gauge: "stroke-rose-500",
      icon: "bg-rose-500/15"
    },

    amber: {
      border: "border-amber-500/30",
      bg: "from-amber-950/30 to-slate-900",
      glow: "shadow-[0_0_40px_rgba(245,158,11,0.15)]",
      text: "text-amber-400",
      badge: "bg-amber-500/15 text-amber-400",
      gauge: "stroke-amber-400",
      icon: "bg-amber-500/15"
    },

    violet: {
      border: "border-violet-500/30",
      bg: "from-violet-950/30 to-slate-900",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
      text: "text-violet-400",
      badge: "bg-violet-500/15 text-violet-400",
      gauge: "stroke-violet-400",
      icon: "bg-violet-500/15"
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {cards.map((card, index) => {

        const style = colorStyles[card.color];

        return (
          <div
            key={index}
            className={`
              bg-gradient-to-br
              ${style.bg}
              ${style.glow}
              border
              ${style.border}
              rounded-3xl
              p-6
              backdrop-blur-xl
            `}
          >

            <div className="flex items-start justify-between">

              <div
                className={`
                  w-16 h-16
                  rounded-2xl
                  ${style.icon}
                  flex items-center justify-center
                  ${style.text}
                `}
              >
                {card.icon}
              </div>

              <div
                className={`
                  px-3 py-1
                  rounded-xl
                  text-xs
                  font-semibold
                  ${style.badge}
                `}
              >
                {card.risk} RISK
              </div>

            </div>

            <h3 className="text-slate-300 text-lg mt-5">
              {card.title}
            </h3>

            <div className="mt-4 flex items-end gap-2">

              <span className="text-6xl font-bold">
                {card.score}
              </span>

              <span className="text-slate-400 text-2xl mb-2">
                /100
              </span>

            </div>

            <h4
              className={`
                text-3xl
                font-bold
                mt-3
                ${style.text}
              `}
            >
              {card.risk}
            </h4>

            {/* Compact Gauge */}

            <div className="mt-4 flex justify-center">

              <svg width="180" height="100">

                <path
                  d="M20 80 A70 70 0 0 1 160 80"
                  fill="none"
                  stroke="#24324a"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                <path
                  d="M20 80 A70 70 0 0 1 160 80"
                  fill="none"
                  className={style.gauge}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="220"
                  strokeDashoffset={
                    220 - (220 * card.score) / 100
                  }
                />

              </svg>

            </div>

            <div className="border-t border-slate-800 pt-4 mt-2">

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-slate-400 text-sm">
                    {card.left}
                  </p>

                  <p className="text-white font-bold text-lg">
                    {card.leftValue}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    {card.right}
                  </p>

                  <p className="text-white font-bold text-lg">
                    {card.rightValue}
                  </p>
                </div>

              </div>

            </div>

            <div
              className="
                mt-5
                rounded-2xl
                border border-slate-800
                bg-slate-900/50
                px-4 py-3
                flex justify-between
                items-center
              "
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={18} />
                Risk Trend
              </div>

              <div
                className={`
                  flex items-center gap-2
                  font-bold
                  ${style.text}
                `}
              >
                <AlertTriangle size={16} />
                {card.trend}
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}