import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../services/api";

import {
  Bot,
  User,
  SendHorizonal,
  Sparkles,
} from "lucide-react";

function AICopilot() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I'm SupplySense AI Copilot. Ask me anything about forecasting, inventory, warehouses, suppliers, logistics, or business intelligence.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post(
        "/copilot/chat",
        {
          question: currentQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Unable to generate response right now.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        flex justify-between items-center
        px-6 py-5
        border-b border-slate-800
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
            w-14 h-14
            rounded-2xl

            bg-gradient-to-br
            from-cyan-500
            via-purple-500
            to-pink-500

            flex items-center justify-center

            shadow-xl
            shadow-cyan-500/20
            "
          >
            <Bot
              size={28}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              SupplySense AI Copilot
            </h2>

            <p className="text-slate-400 text-sm">
              Executive Supply Chain Assistant
            </p>
          </div>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full

          bg-purple-500/10
          border border-purple-500/30

          text-purple-300
          text-sm
          "
        >
          AI Powered
        </div>
      </div>

      {/* Chat Area */}

      <div
        className="
        h-[500px]
        overflow-y-auto
        p-6
        space-y-5
        "
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`
              max-w-[75%]
              rounded-2xl
              px-5
              py-4

              ${
                msg.role === "user"
                  ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500

                  text-white
                  `
                  : `
                  bg-slate-800
                  border border-slate-700

                  text-slate-200
                  `
              }
              `}
            >
              <div className="flex gap-3">
                {msg.role === "ai" ? (
                  <Bot
                    size={18}
                    className="mt-1 text-cyan-400"
                  />
                ) : (
                  <User
                    size={18}
                    className="mt-1 text-white"
                  />
                )}

                {msg.role === "ai" ? (

  <div
  className="
  prose
  prose-invert
  prose-headings:text-white
  prose-p:text-slate-200
  prose-strong:text-cyan-300
  prose-li:text-slate-200
  prose-ul:my-2
  prose-ol:my-2
  prose-code:text-pink-300
  prose-pre:bg-slate-900
  max-w-none
  leading-7
  "
>

    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
    >
      {msg.content}
    </ReactMarkdown>

  </div>

) : (

  <p className="leading-7 whitespace-pre-wrap">
    {msg.content}
  </p>

)}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="
              bg-slate-800
              border border-slate-700
              rounded-2xl
              px-5 py-4
              "
            >
              <div className="flex gap-3">
                <Sparkles
                  className="animate-pulse text-cyan-400"
                  size={18}
                />

                <span className="text-slate-300">
                  SupplySense AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}

      <div
        className="
        border-t border-slate-800
        p-5
        "
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask SupplySense AI..."
            className="
            flex-1

            bg-slate-800
            border border-slate-700

            rounded-2xl
            px-5 py-4

            text-white

            outline-none

            focus:border-cyan-500
            "
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
            px-6

            bg-gradient-to-r
            from-cyan-500
            to-purple-500

            rounded-2xl

            text-white

            flex items-center gap-2

            hover:scale-105
            transition-all
            "
          >
            <SendHorizonal size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AICopilot;