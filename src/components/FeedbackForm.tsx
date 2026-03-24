"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPrompt from "./AnimatedPrompt";

interface Props {
  onSubmit: (message: string) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

function HeartIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heartGrad)"
      />
      <defs>
        <linearGradient id="heartGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C63FF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function FeedbackForm({ onSubmit, isSubmitting, error }: Props) {
  const [message, setMessage] = useState("");
  const canSubmit = message.trim().length > 0 && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit(message.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartIcon />
        </motion.div>

        <h1
          className="text-[1.6rem] font-bold tracking-tight"
          style={{ color: "#21262A" }}
        >
          The Open Line
        </h1>

        <p className="max-w-[280px] text-sm leading-relaxed" style={{ color: "#21262A" }}>
          This is a safe harbor for the things unsaid. Anonymous, objective, and
          purely for the growth of our team.
        </p>
      </div>

      {/* Separator */}
      <div
        className="h-px w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(1,41,72,0.15), transparent)",
        }}
      />

      {/* Animated prompt */}
      <AnimatedPrompt />

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share what's on your mind..."
          maxLength={5000}
          disabled={isSubmitting}
          rows={5}
          className="w-full resize-none rounded-2xl border-2 px-4 py-3.5 text-sm leading-relaxed outline-none transition-all duration-200 disabled:opacity-60"
          style={{
            borderColor: message.length > 0 ? "#012948" : "#E0E7FF",
            background: message.length > 0 ? "white" : "rgba(245, 243, 255, 0.7)",
            color: "#21262A",
            boxShadow:
              message.length > 0
                ? "0 0 0 4px rgba(1,41,72,0.1)"
                : "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#012948";
            e.target.style.background = "white";
            e.target.style.boxShadow = "0 0 0 4px rgba(1,41,72,0.1)";
          }}
          onBlur={(e) => {
            if (!message) {
              e.target.style.borderColor = "#E0E7FF";
              e.target.style.background = "rgba(245, 243, 255, 0.7)";
              e.target.style.boxShadow = "none";
            }
          }}
        />
        {message.length > 4500 && (
          <span
            className="absolute bottom-3 right-3 text-[10px]"
            style={{ color: message.length > 4800 ? "#ef4444" : "#533555" }}
          >
            {message.length}/5000
          </span>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-center text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={
          canSubmit
            ? {
                scale: 1.025,
                boxShadow: "0 10px 35px rgba(1,41,72,0.55)",
              }
            : {}
        }
        whileTap={canSubmit ? { scale: 0.97 } : {}}
        className="relative w-full overflow-hidden rounded-2xl py-3.5 text-sm font-semibold text-white transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "#012948",
          boxShadow: "0 4px 20px rgba(1,41,72,0.45)",
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Sending securely...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              Share Anonymously
              <SendIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Anonymous badge */}
      <motion.div
        className="flex items-center justify-center gap-1.5"
        style={{ color: "#302e4f" }}
        whileHover={{ scale: 1.02 }}
      >
        <ShieldIcon />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
          Encrypted &amp; Fully Anonymous
        </span>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: "#3a3050" }}>
        <span>Empathetic Design</span>
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: "#3a3050" }}
        />
        <span>No Judgement</span>
      </div>
    </form>
  );
}
