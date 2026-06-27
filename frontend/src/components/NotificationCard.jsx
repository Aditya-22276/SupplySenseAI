import {
  Package,
  Truck,
  TrendingUp,
  Bot,
  FileCheck
} from "lucide-react";

const iconMap = {
  critical: {
    icon: Package,
    bg: "bg-red-500/20",
    iconColor: "text-red-400",
    dot: "bg-red-500"
  },

  warning: {
    icon: Truck,
    bg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    dot: "bg-amber-500"
  },

  info: {
    icon: TrendingUp,
    bg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    dot: "bg-sky-500"
  },

  ai: {
    icon: Bot,
    bg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    dot: "bg-violet-500"
  },

  success: {
    icon: FileCheck,
    bg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    dot: "bg-emerald-500"
  }
};

export default function NotificationCard({ notification }) {

  const config =
    iconMap[notification.type] ||
    iconMap.info;

  const Icon = config.icon;

  return (

    <div
      className="
        group
        flex
        items-start
        gap-4

        p-4

        rounded-2xl

        border

        border-slate-700/60

        bg-slate-900/60

        hover:bg-slate-800/80

        hover:border-cyan-500/50

        hover:shadow-[0_0_20px_rgba(34,211,238,.18)]

        transition-all

        duration-300

        cursor-pointer
      "
    >

      {/* Icon */}

      <div
        className={`
          ${config.bg}

          w-12
          h-12

          rounded-xl

          flex

          items-center

          justify-center

          shrink-0
        `}
      >

        <Icon
          className={`
            w-6

            h-6

            ${config.iconColor}
          `}
        />

      </div>

      {/* Content */}

      <div className="flex-1">

        <div className="flex justify-between items-start">

          <h3
            className="
              text-white

              font-semibold

              text-[15px]

              group-hover:text-cyan-300

              transition-all
            "
          >
            {notification.title}
          </h3>

          <span
            className="
              text-xs

              text-slate-400

              whitespace-nowrap

              ml-4
            "
          >
            {notification.time}
          </span>

        </div>

        <p
          className="
            mt-1

            text-sm

            text-slate-400

            leading-relaxed
          "
        >
          {notification.message}
        </p>

      </div>

      {/* Status Dot */}

      {!notification.read && (

        <span
          className={`
            ${config.dot}

            w-2.5

            h-2.5

            rounded-full

            mt-2

            animate-pulse
          `}
        />

      )}

    </div>

  );

}