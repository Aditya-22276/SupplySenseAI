import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {

    const [open, setOpen] = useState(false);

    const unread = 5;

    const notificationRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        }

        function handleEscape(event) {

            if (event.key === "Escape") {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);

    return (

        <div
            ref={notificationRef}
            className="relative"
        >

            <button

                onClick={() => setOpen(!open)}

                className="group relative"

            >

                {/* RGB Glow */}

                <div className="notification-ring" />

                {/* Bell */}

                <div className="notification-circle">

                    <Bell className="notification-bell" />

                </div>

                {/* Badge */}

                <span className="notification-badge">

                    {unread}

                </span>

            </button>

            {open && (

                <NotificationPanel

                    onClose={() => setOpen(false)}

                />

            )}

        </div>

    );

}