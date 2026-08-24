"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";

type ChatEntry = {
  role: "user" | "model";
  text: string;
};

const SUGGESTIONS = [
  "What are Samarth's top skills?",
  "Tell me about his projects",
  "What's his experience?",
  "How can I contact him?",
];

const AskChat = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<ChatEntry[]>([
    {
      role: "model",
      text: "Hi! I'm Samarth's portfolio assistant. Ask me anything about his skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) listRef.current?.scrollTo({ top: 1e6 });
  }, [entries, loading, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || loading) return;

    setError("");
    setInput("");
    const history = entries.slice(1);

    setEntries((current) => [...current, { role: "user", text: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setEntries((current) => [
          ...current,
          { role: "model", text: data.reply },
        ]);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg shadow-black/25 transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        aria-label={open ? "Close chat" : "Ask about Samarth"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Bot size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-21 right-5 z-50 flex h-[480px] w-[calc(100vw-2.5rem)] max-w-95 flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-2xl shadow-black/20 backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1a1a]/95 sm:right-6 sm:bottom-24"
            role="dialog"
            aria-label="Ask about Samarth"
          >
            <div className="flex items-center gap-2.5 border-b border-neutral-200/80 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Bot size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Ask about me
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  AI assistant, replies instantly
                </p>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-6 ${
                      entry.role === "user"
                        ? "rounded-br-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "rounded-bl-md border border-neutral-200/80 bg-white text-neutral-800 dark:border-white/10 dark:bg-white/6 dark:text-neutral-200"
                    }`}
                  >
                    {entry.text}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <p className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-3.5 py-2.5 dark:border-white/10 dark:bg-white/6">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500"
                      />
                    ))}
                  </p>
                </div>
              )}

              {error && (
                <p className="text-center text-xs text-red-500">{error}</p>
              )}

              {entries.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs text-neutral-600 transition hover:border-neutral-900 hover:bg-neutral-100 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/40 dark:hover:bg-white/8"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-neutral-200/80 bg-white/70 px-3 py-3 dark:border-white/10 dark:bg-white/4"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                placeholder="Ask about skills, projects..."
                className="h-10 flex-1 rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 dark:border-white/15 dark:bg-white/6 dark:text-neutral-100 dark:focus:border-white/40"
                aria-label="Your question"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskChat;
