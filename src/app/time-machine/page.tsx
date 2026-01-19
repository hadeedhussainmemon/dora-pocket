"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FutureLetter {
    id: string;
    message: string;
    sentAt: string;
}

export default function TimeMachinePage() {
    const [scene, setScene] = useState<"desk" | "warp" | "confirmation">("desk");
    const [message, setMessage] = useState("");
    const [letters, setLetters] = useState<FutureLetter[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("dora-future-letters");
        if (saved) {
            try {
                setLetters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse letters", e);
            }
        }
    }, []);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newLetter = {
            id: Date.now().toString(),
            message,
            sentAt: new Date().toISOString(),
        };

        const updatedLetters = [newLetter, ...letters];
        setLetters(updatedLetters);
        localStorage.setItem("dora-future-letters", JSON.stringify(updatedLetters));

        setScene("confirmation");
        setTimeout(() => {
            setMessage("");
            // Optional: Reset to desk or stay? Let's stay for a bit then show a "Return" button
        }, 2000);
    };

    return (
        <main className="min-h-screen relative overflow-hidden bg-black text-white font-sans">

            {/* Back to Pocket (Home) - Absolute position */}
            <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span className="font-bold">Back to Pocket</span>
            </Link>

            <AnimatePresence mode="wait">

                {/* SCENE 1: THE DESK */}
                {scene === "desk" && (
                    <motion.div
                        key="desk"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }} // Zoom into the drawer
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center justify-center min-h-screen bg-[#F0E6D2]" // Tatami/Wood color
                    >
                        <h1 className="text-4xl font-black text-[#5D4037] mb-8">The Time Machine</h1>
                        <p className="text-[#8D6E63] mb-12">Open the drawer to send a message to the future.</p>

                        <div
                            className="relative w-80 h-80 cursor-pointer group"
                            onClick={() => setScene("warp")}
                        >
                            <div className="absolute inset-0 bg-[#8D6E63] rounded-lg shadow-2xl transform transition-transform group-hover:scale-105" />
                            {/* Drawer Handlev/ Knob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-12 bg-[#5D4037] rounded-full shadow-inner opacity-40 group-hover:opacity-60 transition-opacity" />

                            <div className="absolute inset-4 bg-[#3E2723]/20 blur-sm rounded" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/50 font-bold tracking-widest uppercase group-hover:text-white transition-colors">Click to Open</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SCENE 2: THE WARP (FORM) */}
                {scene === "warp" && (
                    <motion.div
                        key="warp"
                        className="relative w-full h-full min-h-screen flex items-center justify-center"
                    >
                        {/* Background Video/Image */}
                        <div className="absolute inset-0 z-0 opacity-80">
                            <Image src="/time-machine/warp-bg.png" alt="Time Warp" fill className="object-cover animate-spin-slow" />
                        </div>

                        {/* Glassmorphism Form */}
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            className="relative z-10 w-full max-w-lg p-8 mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl"
                        >
                            <h2 className="text-3xl font-black text-white mb-6 text-center drop-shadow-md">To Future Me...</h2>
                            <form onSubmit={handleSend} className="space-y-6">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Dear future self, remember to..."
                                    rows={6}
                                    className="w-full bg-black/20 text-white placeholder-white/50 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none font-medium text-lg leading-relaxed"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <Send size={24} />
                                    Send to Future
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* SCENE 3: CONFIRMATION */}
                {scene === "confirmation" && (
                    <motion.div
                        key="confirmation"
                        className="relative w-full h-full min-h-screen flex flex-col items-center justify-center bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Image src="/time-machine/warp-bg.png" alt="Time Warp" fill className="object-cover opacity-30" />

                        <motion.div
                            initial={{ y: 0, opacity: 1 }}
                            animate={{ y: -500, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeIn" }}
                            className="z-10 bg-white p-6 rounded shadow-lg max-w-xs text-black"
                        >
                            <p className="font-handwriting text-lg">{letters[0]?.message || message}</p>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="relative z-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-12"
                        >
                            Message Sent!
                        </motion.h2>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            onClick={() => setScene("desk")}
                            className="relative z-10 mt-8 px-8 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-full hover:bg-white/20 transition-all"
                        >
                            Send Another
                        </motion.button>
                    </motion.div>
                )}

            </AnimatePresence>
        </main>
    );
}
