import Sidebar from "../components/sidebar";
import AICopilot from "../components/AICopilot";

import { motion } from "framer-motion";

function AICopilotPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <motion.div
        className="flex-1 p-8"
        initial={{
          opacity: 0,
          x: 50,
          scale: 0.98
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
        >
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SupplySense AI Copilot
          </h1>

          <p className="text-slate-400 text-lg mb-8">
            Your AI-powered Supply Chain Intelligence Assistant
          </p>
        </motion.div>

        {/* Copilot Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.4,
            duration: 0.6
          }}
        >
          <AICopilot />
        </motion.div>

      </motion.div>

    </div>
  );
}

export default AICopilotPage;