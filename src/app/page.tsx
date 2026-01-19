"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Map, Brain, Clock, CheckSquare, Sparkles, Bell, Fan, Cookie } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icons for background roaming
  const floatingIcons = [Map, Brain, Clock, CheckSquare, Sparkles];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--background)] flex flex-col items-center justify-end pb-0 font-sans selection:bg-[var(--dora-blue)] selection:text-white">

      {/* Background Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* 1. ROAMING BACKGROUND GADGETS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          // Expanded icon set with Doraemon elements
          // Map=Anywhere Door, Brain=Memory Bread, Clock=Time Machine, 
          // CheckSquare=Tasks, Sparkles=Magic, Bell=Doraemon, Fan=Take-copter, Cookie=Dorayaki
          const icons = [Map, Brain, Clock, CheckSquare, Sparkles, Bell, Fan, Cookie];
          const Icon = icons[i % icons.length];
          const size = Math.random() * 30 + 20;
          const duration = Math.random() * 20 + 15;
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute text-[var(--dora-blue)]/10 backdrop-blur-[1px]"
              initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh", opacity: 0 }}
              animate={{
                x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
                y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
                rotate: [0, 180],
                opacity: [0, 0.4, 0]
              }}
              transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
            >
              <Icon size={size} />
            </motion.div>
          );
        })}

        {/* Flying Take-copter Animation */}
        <motion.div
          className="absolute top-[20%] -left-20 text-[var(--dora-bell)] opacity-80"
          animate={{ x: ["-10vw", "110vw"], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 10 }}
        >
          <Fan size={48} className="animate-spin" />
        </motion.div>
      </div>

      {/* 2. MAIN TEAM ASSEMBLY */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">

        {/* Title */}
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 relative z-20"
        >
          <div className="inline-block relative">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-[image:var(--dora-gradient-text)] tracking-tighter drop-shadow-sm pb-2">
              Dora-Pocket
            </h1>
            <motion.div
              className="absolute -top-6 -right-6 text-[var(--dora-bell)]"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
            >
              <Sparkles size={32} />
            </motion.div>
          </div>
          <p className="text-[var(--foreground)]/80 text-lg md:text-xl font-medium mt-4 max-w-lg mx-auto leading-relaxed">
            Your personal 4D pocket. <br className="hidden md:block" />
            <span className="text-[var(--dora-blue)] font-bold">Tap the belly</span> to reveal the magic!
          </p>
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
            {/* 3. INTERACTIVE POCKET BUTTON (Visible & Engaging) */}
            <div className="absolute left-1/2 bottom-[14%] -translate-x-1/2 w-[22%] h-[16%] z-20">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-full h-full rounded-full cursor-pointer group relative flex items-center justify-center"
                aria-label="Open Pocket"
              >
                {/* Pulse Ring */}
                <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-75" />

                {/* Glowing Overlay */}
                <div className="absolute inset-0 bg-[var(--dora-white)]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110" />

                {/* Center Badge (Optional - can just be the glow) */}
                <div className="w-full h-full rounded-full mix-blend-overlay bg-white/10 group-active:scale-95 transition-transform" />
              </button>

              {/* "Click Me" Hint */}
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-[var(--glass-surface)] backdrop-blur-md border border-[var(--glass-border)] px-4 py-2 rounded-full shadow-[var(--shadow-float)] flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 rounded-full bg-[var(--dora-red)] animate-pulse" />
                <span className="text-sm font-bold text-[var(--dora-blue)] whitespace-nowrap">Open Pocket</span>
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
