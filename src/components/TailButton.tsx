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
                className="relative w-16 h-16 pointer-events-auto focus:outline-none"
            >
                <Image
                    src="/tail.png"
                    alt="Doraemon's Tail"
                    fill
                    className="object-contain drop-shadow-xl"
                />
            </motion.button>
        </div>
    );
}
