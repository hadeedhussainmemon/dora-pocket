"use client";

import { motion } from "framer-motion";

interface WishCardProps {
    wish: { id: string; name: string; problem: string; date: string };
    index: number;
}

export function WishCard({ wish, index }: WishCardProps) {
    // Random rotation for sticky note effect
    const rotate = index % 2 === 0 ? 2 : -2;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 bg-[#fff9c4] text-[#5d4037] shadow-lg rounded-sm max-w-xs break-inside-avoid mb-4 mx-auto w-full`} // Yellow sticky note color
            style={{ rotate: `${rotate}deg` }}
        >
            <div className="w-full h-8 bg-[#fdf288] -mt-6 -mx-6 mb-4 opacity-50 block" /> {/* Tape effect area */}

            <h3 className="font-bold text-lg mb-2 border-b border-[#ebd877] pb-1">{wish.name}</h3>
            <p className="text-sm leading-relaxed font-handwriting">{wish.problem}</p>

            <span className="block text-xs text-right mt-4 opacity-60">{new Date(wish.date).toLocaleDateString()}</span>
        </motion.div>
    );
}
