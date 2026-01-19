"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface RewardsModalProps {
    onClose: () => void;
}

export function RewardsModal({ onClose }: RewardsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-[var(--glass-surface)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[40px] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="relative w-64 h-64 mx-auto mb-6"
                >
                    <Image
                        src="/rewards/dorayaki.png"
                        alt="Dorayaki Reward"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </motion.div>

                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-[image:linear-gradient(to_right,#E02A27,#FF5252)] mb-3 drop-shadow-sm">Yummy!</h2>
                <p className="text-[var(--foreground)] mb-8 font-medium text-lg">
                    You finished all your tasks! Here is a Dorayaki for your hard work.
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] transition-all active:scale-95"
                >
                    Itadakimasu! (Thank you!)
                </button>
            </motion.div>
        </div>
    );
}
