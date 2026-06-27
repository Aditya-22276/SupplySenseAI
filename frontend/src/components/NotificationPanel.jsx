import { useEffect, useState } from "react";
import {
  CheckCheck,
  BellRing
} from "lucide-react";

import NotificationCard from "./NotificationCard";

export default function NotificationPanel({ onClose }) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

    try {

      const data = await fetch(
        "http://127.0.0.1:8000/notifications/"
      ).then((r) => r.json());

      setNotifications(data);

    } catch (err) {

      console.error(err);

    }

  };

  const markAllRead = async () => {

    await fetch(
      "http://127.0.0.1:8000/notifications/read-all",
      {
        method: "POST"
      }
    );

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true
      }))
    );

  };

  return (

    <div
      className="
      absolute

      right-0

      mt-4

      w-[430px]

      rounded-3xl

      overflow-hidden

      border

      border-slate-700

      bg-[#111827]/95

      backdrop-blur-2xl

      shadow-[0_30px_70px_rgba(0,0,0,.55)]

      z-50

      animate-[panel_.25s_ease]
      "
    >

      {/* Header */}

      <div
        className="
        flex

        items-center

        justify-between

        px-6

        py-5

        border-b

        border-slate-700
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
            w-11

            h-11

            rounded-full

            bg-gradient-to-r

            from-cyan-500

            via-purple-500

            to-pink-500

            flex

            items-center

            justify-center
            "
          >

            <BellRing className="text-white w-5 h-5" />

          </div>

          <div>

            <h2 className="text-white font-bold text-lg">

              Notifications

            </h2>

            <p className="text-slate-400 text-sm">

              Recent system alerts

            </p>

          </div>

        </div>

        <button

          onClick={markAllRead}

          className="
          flex

          items-center

          gap-2

          text-cyan-400

          text-sm

          hover:text-white

          transition-all
          "
        >

          <CheckCheck size={18} />

          Mark all

        </button>

      </div>

      {/* Notifications */}

      <div
        className="
        max-h-[520px]

        overflow-y-auto

        p-5

        space-y-4

        scrollbar-thin

        scrollbar-thumb-slate-700

        scrollbar-track-transparent
        "
      >

        {notifications.map((notification) => (

          <NotificationCard

            key={notification.id}

            notification={notification}

          />

        ))}

      </div>

      {/* Footer */}

      <div
        className="
        border-t

        border-slate-700

        p-4

        text-center
        "
      >

        <button

          onClick={onClose}

          className="
          text-cyan-400

          hover:text-white

          transition-all

          text-sm

          font-medium
          "
        >

          Close Notifications

        </button>

      </div>

    </div>

  );

}