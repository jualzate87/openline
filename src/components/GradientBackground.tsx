"use client";

import FloatingParticles from "./FloatingParticles";

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d0f2e 0%, #1a1040 35%, #00254a 75%, #003a5c 100%)",
        backgroundSize: "300% 300%",
        animation: "gradient-x 14s ease infinite",
      }}
    >
      {/* Subtle radial glow in the center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />
      <FloatingParticles />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
