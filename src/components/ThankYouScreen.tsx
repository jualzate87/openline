"use client";

import { motion } from "framer-motion";
import ConfettiBlast from "./ConfettiBlast";

interface Props {
  onReset: () => void;
}

const TAGS = ["Fully anonymous", "Securely stored", "Leadership notified"];

export default function ThankYouScreen({ onReset }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <ConfettiBlast />

      {/* Animated checkmark circle */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.45 }}
        className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #0D9B7F 0%, #0A7A63 100%)",
          boxShadow: "0 12px 40px rgba(13,155,127,0.4)",
        }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, #0D9B7F, #0A7A63)",
            opacity: 0.35,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />

        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <motion.path
            d="M9 20l8 8 14-14"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* Main message */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-2.5"
      >
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#21262A" }}
        >
          Thank you for speaking up.
        </h2>
        <p
          className="mx-auto max-w-[270px] text-sm leading-relaxed"
          style={{ color: "#21262A" }}
        >
          Your message has been received and will be reviewed by leadership with
          full confidentiality. We truly appreciate your courage in sharing.
        </p>
      </motion.div>

      {/* Status pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="rounded-full border px-3 py-1 text-[11px] font-semibold"
            style={{
              color: "#012948",
              borderColor: "#E0E7FF",
              backgroundColor: "#F5F3FF",
            }}
          >
            ✓ {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Decorative separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="h-px w-40 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(1,41,72,0.25), transparent)",
        }}
      />

      {/* Submit another button */}
      <motion.button
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        whileHover={{ scale: 1.04, backgroundColor: "#F5F3FF" }}
        whileTap={{ scale: 0.97 }}
        className="rounded-xl border px-7 py-2.5 text-sm font-semibold transition-colors duration-150"
        style={{
          color: "#012948",
          borderColor: "#302e4f",
          backgroundColor: "transparent",
        }}
      >
        Submit another
      </motion.button>
    </div>
  );
}
