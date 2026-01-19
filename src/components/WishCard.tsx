"use client";

import { motion } from "framer-motion";

interface WishCardProps {
    wish: { id: string; name: string; problem: string; date: string };
    index: number;
}

export function WishCard({ wish, index, onDelete }: WishCardProps & { onDelete: (id: string) => void }) {
    // Random rotation for sticky note effect
    const rotate = index % 2 === 0 ? 2 : -2;

    return (
        <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
            className="relative p-6 bg-[var(--glass-surface)] backdrop-blur-md border border-[var(--glass-border)] rounded-3xl shadow-lg break-inside-avoid mb-6 mx-auto w-full group hover:shadow-[0_8px_30px_rgba(0,150,215,0.2)] hover:bg-[var(--glass-surface)] transition-all duration-300"
        >
            <button
                onClick={() => onDelete(wish.id)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-500 hover:text-white rounded-full text-white/50 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Wish"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
            </button>

            <div className="flex items-start justify-between mb-4 pr-8">
                <div className="p-2 bg-white/10 rounded-lg text-[var(--dora-blue)] group-hover:bg-[var(--dora-blue)] group-hover:text-white transition-colors duration-300">
                    <span className="text-xl">💡</span>
                </div>
                <span className="text-xs font-bold text-blue-200/70 bg-white/10 px-2 py-1 rounded-full uppercase tracking-wider">{new Date(wish.date).toLocaleDateString()}</span>
            </div>

            <h3 className="font-black text-xl mb-3 text-white leading-tight group-hover:text-[var(--dora-bell)] transition-colors">{wish.name}</h3>
            <p className="text-blue-100/80 leading-relaxed font-medium">{wish.problem}</p>
        </motion.div>
    );
}
