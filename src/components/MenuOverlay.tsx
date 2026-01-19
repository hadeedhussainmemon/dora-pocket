"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Map, Brain, Clock, CheckSquare, Sparkles, X } from "lucide-react";

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
    ];

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
                    <div className="absolute inset-0 z-0 bg-white">
                        <Image
                            src="/hub/pocket-interior.png"
                            alt="4D Space"
                            fill
                            className="object-cover opacity-60 animate-spin-slower"
                        />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-50 p-3 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors text-[var(--dora-red)]"
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

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl">
                            {gadgets.map((gadget, i) => (
                                <Link key={gadget.name} href={gadget.path} onClick={onClose}>
                                    <motion.div
                                        initial={{ scale: 0, y: 50 }}
                                        animate={{ scale: 1, y: 0 }}
                                        transition={{ delay: 0.6 + (i * 0.1), type: "spring" }}
                                        whileHover={{ scale: 1.1, translateY: -10 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex flex-col items-center group"
                                    >
                                        <div
                                            className="w-24 h-24 md:w-32 md:h-32 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-lg flex items-center justify-center border-4 border-transparent group-hover:border-white/50 transition-colors"
                                            style={{ boxShadow: `0 10px 40px -10px ${gadget.color}66` }}
                                        >
                                            <gadget.icon size={48} color={gadget.color} strokeWidth={1.5} />
                                        </div>
                                        <span className="mt-4 font-bold text-[var(--foreground)] bg-white/50 px-3 py-1 rounded-full text-sm md:text-base backdrop-blur-sm shadow-sm">
                                            {gadget.name}
                                        </span>
                                    </motion.div>
                                </Link>
                            ))}
                            {/* Coming Soon Card */}
                            <motion.div
                                initial={{ scale: 0, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: 1.1, type: "spring" }}
                                className="flex flex-col items-center opacity-70"
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
