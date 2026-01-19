"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LoadingDora() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm">
            <motion.div
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 2, -2, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
            >
                <div className="relative w-32 h-32">
                    {/* Using the logo for now as the head, mimicking him flying */}
                    <Image
                        src="/logo.png"
                        alt="Loading..."
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                    {/* Simple CSS propeller if needed, or just the bobbing head is cute enough for soft-ui */}
                </div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="mt-4 text-lg font-medium text-[var(--dora-blue)]"
            >
                Loading...
            </motion.p>
        </div>
    );
}
