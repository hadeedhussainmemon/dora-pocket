"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Map, Brain, Clock, CheckSquare, Sparkles, X, Cookie } from "lucide-react";
import confetti from "canvas-confetti";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const gadgets = [
        { name: "Anywhere Door", icon: Map, path: "/map", color: "#E91E63" },
        { name: "Memory Bread", icon: Brain, path: "/memory-bread", color: "#795548" },
        { name: "Time Machine", icon: Clock, path: "/time-machine", color: "#2196F3" },
        { name: "Sewashi Tasks", icon: CheckSquare, path: "/tasks", color: "#4CAF50" },
        { name: "Wishlist", icon: Sparkles, path: "/wishlist", color: "#9C27B0" },
        { name: "Dorayaki", icon: Cookie, path: "ACTION_DORAYAKI", color: "#FFD700" },
    ];

    const handleDorayakiClick = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Emoji Rain!
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                shapes: ['circle'],
                colors: ['#FFD700', '#E02A27', '#8D6E63']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                shapes: ['circle'],
                colors: ['#FFD700', '#E02A27', '#8D6E63']
            });
        }, 250);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="menu-overlay"
                    initial={{ clipPath: "circle(0% at 50% 100%)", opacity: 0 }}
                    animate={{ clipPath: "circle(150% at 50% 100%)", opacity: 1 }}
                    exit={{ clipPath: "circle(0% at 50% 100%)", opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ duration: 1, ease: "circInOut" }}
                    className="fixed inset-0 z-50 overflow-hidden"
                >
                    {/* 4D Background */}
                    <div className="absolute inset-0 z-0 bg-[#0F172A]">
                        <Image
                            src="/hub/pocket-interior.png"
                            alt="4D Space"
                            fill
                            className="object-cover opacity-40 animate-spin-slower mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-50 p-3 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors text-[var(--dora-red)] shadow-lg hover:rotate-90 duration-300"
                    >
                        <X size={32} />
                    </button>

                    {/* Gadget Grid */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-3xl font-black text-[var(--dora-blue)] mb-12"
                        >
                            Choose a Gadget
                        </motion.h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 max-w-4xl w-full px-4">
                            {gadgets.map((gadget, i) => {
                                const isAction = gadget.path.startsWith("ACTION");
                                const ItemWrapper = isAction ? 'button' : Link;
                                const itemProps = isAction ? { onClick: handleDorayakiClick } : { href: gadget.path, onClick: onClose };

                                return (
                                    // @ts-ignore
                                    <ItemWrapper key={gadget.name} {...itemProps} className="w-full">
                                        <motion.div
                                            initial={{ scale: 0, y: 50 }}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ delay: 0.6 + (i * 0.1), type: "spring" }}
                                            whileHover={{ scale: 1.1, translateY: -10, rotateX: 10, rotateY: 10, z: 50 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="flex flex-col items-center group preserve-3d"
                                        >
                                            <div
                                                className="w-24 h-24 md:w-32 md:h-32 bg-[var(--glass-surface)] backdrop-blur-md rounded-[2rem] shadow-lg flex items-center justify-center border-4 border-white/5 group-hover:border-white/20 transition-colors relative overflow-hidden"
                                                style={{ boxShadow: `0 10px 40px -10px ${gadget.color}66` }}
                                            >
                                                {/* Shine effect */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                <gadget.icon size={48} color={gadget.color} strokeWidth={1.5} />
                                            </div>
                                            <span className="mt-4 font-bold text-[var(--foreground)] bg-white/50 px-3 py-1 rounded-full text-sm md:text-base backdrop-blur-sm shadow-sm group-hover:bg-white group-hover:text-[var(--dora-blue)] transition-colors">
                                                {gadget.name}
                                            </span>
                                        </motion.div>
                                    </ItemWrapper>
                                );
                            })}
                            {/* Coming Soon Card */}
                            <motion.div
                                initial={{ scale: 0, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: 1.1, type: "spring" }}
                                className="col-span-2 md:col-span-3 flex flex-col items-center opacity-70 py-4"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/40 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-4xl">➕</span>
                                </div>
                                <span className="mt-4 font-bold text-gray-500 text-sm">More Soon...</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
