"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export function TailButton() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            {/* Tooltip hint */}
            <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Don't pull the tail!
            </div>

            <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9, y: 5 }}
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
