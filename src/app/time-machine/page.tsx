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
            <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                <span className="font-bold tracking-wide">Back to Pocket</span>
            </Link>

            <AnimatePresence mode="wait">

                {/* SCENE 1: THE DESK */}
                {scene === "desk" && (
                    <motion.div
                        key="desk"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }} // Zoom into the drawer
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center justify-center min-h-screen bg-[#F0E6D2] relative overflow-hidden"
                    >
                        {/* Ambient Light/Shadows */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#3E2723_100%)] opacity-40 pointer-events-none" />

                        <div className="relative z-10 text-center mb-12">
                            <h1 className="text-5xl font-black text-[#5D4037] mb-4 drop-shadow-sm">The Time Machine</h1>
                            <p className="text-[#8D6E63] font-medium text-lg">Open the drawer to send a message to the future.</p>
                        </div>

                        <div
                            className="relative w-96 h-96 cursor-pointer group"
                            onClick={() => setScene("warp")}
                        >
                            {/* Drawer Body */}
                            <motion.div
                                className="absolute inset-0 bg-[#8D6E63] rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-t border-[#A1887F]"
                                whileHover={{ y: 5 }}
                            />

                            {/* Drawer Knob/Handle Area */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 bg-[#5D4037] rounded-full shadow-inner flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow duration-500">
                                {/* Glow effect on hover */}
                                <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#60A5FA] transition-opacity duration-300 animate-pulse" />
                            </div>

                            {/* Hover Hint */}
                            <motion.div
                                className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[#5D4037]/60 font-bold uppercase tracking-[0.2em] text-sm"
                                initial={{ opacity: 0, y: -10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                            >
                                Enter Time Machine
                            </motion.div>
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
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mb-8 text-center drop-shadow-sm tracking-tight">To Future Me...</h2>
                            <form onSubmit={handleSend} className="space-y-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Dear future self, remember to..."
                                        rows={6}
                                        className="relative w-full bg-black/40 text-white placeholder-white/30 border border-white/10 rounded-2xl p-6 focus:outline-none focus:ring-1 focus:ring-blue-400/50 transition-all resize-none font-medium text-xl leading-relaxed backdrop-blur-sm"
                                    />
                                </div>
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
                            initial={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                            animate={{ y: -800, opacity: 0, scale: 0.2, rotateX: 60 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="z-10 bg-white p-8 rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.5)] max-w-sm text-black relative"
                        >
                            {/* Envelope Aesthetics */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#E02A27,#E02A27_10px,transparent_10px,transparent_20px)] opacity-50" />
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#0096D7,#0096D7_10px,transparent_10px,transparent_20px)] opacity-50" />

                            <p className="font-handwriting text-2xl leading-relaxed text-gray-800">{letters[0]?.message || message}</p>
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
