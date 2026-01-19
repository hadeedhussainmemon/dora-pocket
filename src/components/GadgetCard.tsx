"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Gadget } from "@/lib/gadgets";

interface GadgetCardProps {
    gadget: Gadget;
}

export function GadgetCard({ gadget }: GadgetCardProps) {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative flex flex-col items-center p-6 bg-[var(--background)] rounded-[30px] shadow-neu-out max-w-sm w-full mx-auto"
        >
            <div className="relative w-48 h-48 mb-6 p-4 rounded-full shadow-neu-in flex items-center justify-center bg-[var(--background)]">
                <Image
                    src={gadget.image}
                    alt={gadget.name}
                    width={150}
                    height={150}
                    className="object-contain drop-shadow-lg"
                />
            </div>

            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
                {gadget.name}
            </h3>

            <p className="text-sm text-gray-500 mb-4 font-medium px-3 py-1 bg-gray-100 rounded-full shadow-sm">
                First Appearance: {gadget.mangaChapter}
            </p>

            <p className="text-center text-gray-600 mb-6 leading-relaxed">
                {gadget.description}
            </p>

            <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Usefulness</span>
                </div>
                <div className="flex justify-center gap-2 p-3 rounded-2xl bg-gray-50 shadow-inner">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Bell
                            key={star}
                            size={20}
                            className={star <= gadget.usefulness ? "fill-[var(--dora-bell)] text-[var(--dora-bell)]" : "text-gray-300"}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
