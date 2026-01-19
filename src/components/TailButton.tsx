"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export function TailButton() {
    // Just a fun interactive element now!
    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            {/* Tooltip hint */}
            <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 px-4 py-2 bg-[var(--glass-surface)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--dora-blue)] font-bold text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg translate-y-2 group-hover:translate-y-0">
                Don't pull the tail!
            </div>

            <motion.button
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1 }}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.8, y: 15, rotate: -20, transition: { type: "spring", stiffness: 300 } }}
                className="relative w-16 h-16 pointer-events-auto focus:outline-none flex items-center justify-center"
            >
                {/* CSS 3D Tail */}
                <div className="w-12 h-12 bg-[radial-gradient(circle_at_30%_30%,_#ff5252,_#e02a27_60%,_#8a0000_100%)] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(0,0,0,0.2)] relative z-10 border border-[#b71c1c]/20">
                    {/* Shine */}
                    <div className="absolute top-2 left-3 w-3 h-2 bg-white/40 blur-[2px] rounded-full rotate-[-45deg]" />
                </div>

                {/* Cord/Stem (Visual connector) - slightly behind */}
                <div className="absolute -z-0 top-1 right-2 w-4 h-4 border-t-4 border-r-4 border-[#e02a27] rounded-tr-xl -rotate-12 opacity-80" />
            </motion.button>
        </div>
    );
}
