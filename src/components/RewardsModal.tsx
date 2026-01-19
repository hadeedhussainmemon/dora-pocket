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
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative w-64 h-64 mx-auto mb-6"
                >
                    <Image
                        src="/rewards/dorayaki.png"
                        alt="Dorayaki Reward"
                        fill
                        className="object-contain drop-shadow-xl"
                    />
                </motion.div>

                <h2 className="text-3xl font-black text-[var(--dora-red)] mb-2">Yummy!</h2>
                <p className="text-gray-600 mb-8 font-medium">
                    You finished all your tasks! Here is a Dorayaki for your hard work.
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-[var(--dora-blue)] text-white font-bold rounded-2xl shadow-lg hover:bg-blue-600 transition-transform active:scale-95"
                >
                    Itadakimasu! (Thank you!)
                </button>
            </motion.div>
        </div>
    );
}
