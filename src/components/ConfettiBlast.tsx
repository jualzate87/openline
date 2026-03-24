"use client";

import { useEffect } from "react";

export default function ConfettiBlast() {
  useEffect(() => {
    const fire = async () => {
      const confetti = (await import("canvas-confetti")).default;
      const colors = [
        "#6C63FF",
        "#7C3AED",
        "#818CF8",
        "#A78BFA",
        "#C4B5FD",
        "#4F46E5",
        "#ffffff",
        "#E0E7FF",
      ];

      // Left burst
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { x: 0.25, y: 0.75 },
        colors,
        startVelocity: 38,
        gravity: 0.9,
        ticks: 200,
      });

      // Right burst with slight delay
      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { x: 0.75, y: 0.75 },
          colors,
          startVelocity: 32,
          gravity: 0.9,
          ticks: 200,
        });
      }, 200);

      // Center burst last
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { x: 0.5, y: 0.6 },
          colors,
          startVelocity: 28,
          gravity: 1,
          ticks: 180,
        });
      }, 450);
    };

    fire();
  }, []);

  return null;
}
