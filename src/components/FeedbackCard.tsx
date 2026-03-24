"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FeedbackForm from "./FeedbackForm";
import ThankYouScreen from "./ThankYouScreen";
import type { SubmissionStatus } from "@/types";

export default function FeedbackCard() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (message: string) => {
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ||
            "Something went wrong. Please try again."
        );
      }

      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[440px] rounded-3xl p-8"
      style={{
        background: "rgba(255, 255, 255, 0.93)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 24px 64px rgba(108,99,255,0.22), 0 8px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ThankYouScreen onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FeedbackForm
              onSubmit={handleSubmit}
              isSubmitting={status === "submitting"}
              error={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
