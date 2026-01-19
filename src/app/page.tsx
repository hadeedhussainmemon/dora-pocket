"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Map, Brain, Clock, CheckSquare, Sparkles } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icons for background roaming
  const floatingIcons = [Map, Brain, Clock, CheckSquare, Sparkles];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--background)] flex flex-col items-center justify-end pb-0 font-sans">

      {/* 1. ROAMING BACKGROUND GADGETS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          const Icon = floatingIcons[i % floatingIcons.length];
          const size = Math.random() * 30 + 20;
          const duration = Math.random() * 20 + 10;

          return (
            <motion.div
              key={i}
              className="absolute text-[var(--dora-blue)]/20"
              initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh", opacity: 0 }}
              animate={{
                x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
                y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
                rotate: [0, 360],
                opacity: [0, 0.4, 0]
              }}
              transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
            >
              <Icon size={size} />
            </motion.div>
          );
        })}
      </div>

      {/* 2. MAIN TEAM ASSEMBLY */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">

        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black text-[var(--dora-blue)] tracking-tight drop-shadow-sm">
            Dora-Pocket
          </h1>
          <p className="text-gray-500 font-medium mt-2">Tap the pocket to start adventure!</p>
        </motion.div>

        {/* Character Group Image */}
        <div className="relative w-full aspect-[4/3] max-h-[60vh] md:max-h-[70vh]">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative w-full h-full"
          >
            <Image
              src="/hub/team-group.png"
              alt="Doraemon and Friends"
              fill
              className="object-contain object-bottom"
              priority
            />

            {/* 3. INTERACTIVE POCKET BUTTON (Invisible overlay over Doraemon's belly) */}
            {/* Adjusting position based on the image composition. Assuming Doraemon is center. */}
            <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 w-[20%] h-[15%] z-20">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-full h-full rounded-full cursor-pointer group relative"
                aria-label="Open Pocket"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-white/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </button>

              {/* "Click Me" Hint */}
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white px-3 py-1 rounded-full shadow-lg text-xs font-bold text-[var(--dora-blue)] whitespace-nowrap"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Magic Pocket
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. MENU OVERLAY */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

    </main>
  );
}
