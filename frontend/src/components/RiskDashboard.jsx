import RiskCards from "./RiskCards";
import RiskOverview from "./RiskOverview";
import RiskTrendChart from "./RiskTrendChart";
import TopRiskDrivers from "./TopRiskDrivers";
import RiskAlerts from "./RiskAlerts";

export default function RiskDashboard() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div
          className="
          absolute top-20 left-20
          w-96 h-96
          bg-purple-600/10
          rounded-full
          blur-[120px]
          "
        />

        <div
          className="
          absolute bottom-20 right-20
          w-96 h-96
          bg-cyan-600/10
          rounded-full
          blur-[120px]
          "
        />

      </div>

      <div className="relative z-10 p-8">

        {/* Header */}

        <div className="mb-10">

          <div className="flex items-center justify-between">

            <div>

              <h1
                className="
                text-5xl
                font-bold
                bg-gradient-to-r
                from-purple-400
                via-cyan-400
                to-pink-400
                bg-clip-text
                text-transparent
                "
              >
                Risk Intelligence
              </h1>

              <p className="text-slate-400 mt-3 text-lg">
                Monitor, analyze and mitigate
                supply chain risks in real time
              </p>

            </div>

            <div
              className="
              px-5 py-3
              rounded-2xl
              bg-slate-900
              border border-slate-800
              "
            >

              <p className="text-slate-400 text-sm">
                Overall Risk Score
              </p>

              <h2 className="text-3xl font-bold text-purple-400">
                72
              </h2>

            </div>

          </div>

        </div>

        {/* Top KPI Cards */}

        <RiskCards />

        {/* Middle Section */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

          <RiskOverview />

          <RiskTrendChart />

        </div>

        {/* Bottom Section */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

          <div className="xl:col-span-2">

            <TopRiskDrivers />

          </div>

          <RiskAlerts />

        </div>

      </div>

    </div>
  );
}