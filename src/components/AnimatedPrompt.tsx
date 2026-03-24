"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROMPTS } from "@/lib/prompts";

export default function AnimatedPrompt() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % PROMPTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex w-full justify-center items-center h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-center"
        >
          <span className="flex-shrink-0 leading-none">💡</span>
          <p
            style={{
              backgroundImage: "linear-gradient(90deg, #012948 0%, #533555 50%, #302e4f 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {PROMPTS[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
