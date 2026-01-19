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
            layout
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
            className="p-6 bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl shadow-lg break-inside-avoid mb-6 mx-auto w-full group hover:shadow-xl hover:bg-white/80 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-pink-100 rounded-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-xl">💡</span>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-white/50 px-2 py-1 rounded-full uppercase tracking-wider">{new Date(wish.date).toLocaleDateString()}</span>
            </div>

            <h3 className="font-black text-xl mb-3 text-gray-800 leading-tight group-hover:text-pink-600 transition-colors">{wish.name}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">{wish.problem}</p>
        </motion.div>
    );
}
