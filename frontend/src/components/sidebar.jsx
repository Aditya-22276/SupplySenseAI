import {
  LayoutDashboard,
  Bot,
  Cpu,
  ShieldAlert
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (
    <div className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-purple-500
              to-pink-500
              flex items-center justify-center
              shadow-lg
            "
          >
            <Cpu size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SupplySense AI
            </h1>

            <p className="text-xs text-cyan-400">
              Supply Chain Intelligence
            </p>
          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 p-4">

        <div className="space-y-3">

          {/* Dashboard */}

          <Link
            to="/"
            className={`
              flex items-center gap-3
              px-4 py-3 rounded-2xl
              transition-all duration-300

              ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/20 text-white border border-purple-500/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">
              Dashboard
            </span>
          </Link>

          {/* Risk Intelligence */}

          <Link
            to="/risk-dashboard"
            className={`
              group
              relative
              overflow-hidden

              flex items-center gap-3
              px-4 py-3
              rounded-2xl

              transition-all duration-300

              ${
                location.pathname === "/risk-dashboard"
                  ? `
                    bg-violet-500/15
                    text-violet-300
                    border border-violet-500/30
                    shadow-[0_0_25px_rgba(168,85,247,0.25)]
                  `
                  : `
                    text-slate-300
                    hover:bg-slate-800
                    hover:text-white
                  `
              }
            `}
          >

            <ShieldAlert
              size={20}
              className="
                transition-all duration-300
                group-hover:rotate-6
                group-hover:scale-110
              "
            />

            <span className="font-medium">
              Risk Intelligence
            </span>

          </Link>

          {/* AI COPILOT PREMIUM */}

          <Link
            to="/copilot"
            className="group block"
          >

            <div
              className="
                rgb-flow-border
                rounded-2xl
                p-[2px]
                transition-all
                duration-500
                hover:scale-[1.03]
              "
            >

              <div
                className={`
                  rounded-2xl
                  px-4 py-3
                  flex items-center gap-3

                  ${
                    location.pathname === "/copilot"
                      ? "bg-slate-900 text-cyan-300"
                      : "bg-slate-950 text-white"
                  }
                `}
              >

                <div
                  className="
                    w-10 h-10
                    rounded-xl

                    flex
                    items-center
                    justify-center

                    bg-gradient-to-r
                    from-cyan-500
                    via-purple-500
                    to-pink-500

                    copilot-float
                  "
                >
                  <Bot size={20} />
                </div>

                <div>

                  <p className="font-semibold">
                    AI Copilot
                  </p>

                  <p className="text-xs text-slate-400">
                    Powered by Gemini
                  </p>

                </div>

              </div>

            </div>

          </Link>

        </div>

      </div>

      {/* Footer */}

      <div className="p-4 border-t border-slate-800">

        <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/20 rounded-2xl p-4 border border-purple-500/20">

          <p className="text-xs text-slate-400">
            AI Powered
          </p>

          <h3 className="text-white font-semibold mt-2">
            Supply Chain Intelligence
          </h3>

          <p className="text-xs text-slate-400 mt-2">
            Predict, prevent and optimize risks using AI.
          </p>

          <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium">
            Upgrade
          </button>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;