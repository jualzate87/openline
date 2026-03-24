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
      // Submit directly to Google Forms
      const formUrl =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeCarjjO8I2MxzflwBNuCxSD5OZz_k_zIPM1HaApbvvEfGamg/formResponse";
      const entryId = "849768593"; // Entry ID for "What's on your mind?" field

      const formData = new URLSearchParams();
      formData.append(`entry.${entryId}`, message.trim());

      const res = await fetch(formUrl, {
        method: "POST",
        body: formData.toString(),
        mode: "no-cors", // Bypass CORS restrictions
      });

      // With no-cors, we can't check the response, so we'll assume success
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
