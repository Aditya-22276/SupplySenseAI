import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AICopilotPage from "./pages/AICopilotPage";
import RiskDashboard from "./components/RiskDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/risk-dashboard"
          element={<RiskDashboard />}
        />

        <Route
          path="/copilot"
          element={<AICopilotPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;