"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BreadSlice, INITIAL_BREADS } from "@/lib/memory-bread";
import { BreadCard } from "@/components/BreadCard";
import { Plus } from "lucide-react";

export default function MemoryBreadPage() {
    const [breads, setBreads] = useState<BreadSlice[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newQ, setNewQ] = useState("");
    const [newA, setNewA] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("dora-memory-bread");
        if (saved) {
            setBreads(JSON.parse(saved));
        } else {
            setBreads(INITIAL_BREADS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("dora-memory-bread", JSON.stringify(breads));
        }
    }, [breads, isLoaded]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQ.trim() || !newA.trim()) return;

        const newBread: BreadSlice = {
            id: Date.now().toString(),
            question: newQ,
            answer: newA,
            isEaten: false,
            createdAt: new Date().toISOString()
        };

        setBreads([...breads, newBread]);
        setNewQ("");
        setNewA("");
    };

    const handleEat = (id: string) => {
        // Ideally we play a crunch sound here
        setBreads(breads.map(b => b.id === id ? { ...b, isEaten: true } : b));
    };

    const activeBreads = breads.filter(b => !b.isEaten);

    if (!isLoaded) return null;

    return (
        <main className="min-h-screen p-6 pb-32 bg-[#fffbe6]"> {/* Warm kitchen background color */}
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-black text-[var(--dora-blue)] mb-2">Memory Bread</h1>
                    <p className="text-[#8d6e63] font-medium">Type it, print it, eat it! The tastiest way to study.</p>
                </header>

                {/* Toaster / Input Section */}
                <section className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-3xl shadow-neu-out border-b-8 border-[#f0e6d2]">
                    <form onSubmit={handleAdd} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                value={newQ}
                                onChange={e => setNewQ(e.target.value)}
                                placeholder="Side A (Question)"
                                className="p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--dora-blue)]"
                            />
                            <input
                                value={newA}
                                onChange={e => setNewA(e.target.value)}
                                placeholder="Side B (Answer)"
                                className="p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--dora-blue)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 py-3 bg-[#8d6e63] text-white font-bold rounded-xl shadow-md hover:bg-[#795548] active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            Bake Bread
                        </button>
                    </form>
                </section>

                {/* Plate / Study Section */}
                <section className="flex flex-wrap justify-center gap-8">
                    <AnimatePresence>
                        {activeBreads.length > 0 ? (
                            activeBreads.map(bread => (
                                <motion.div
                                    key={bread.id}
                                    layout
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0, y: 50 }}
                                >
                                    <BreadCard bread={bread} onEat={handleEat} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 opacity-50">
                                <p className="text-xl font-bold text-[#8d6e63] mb-2">All eaten!</p>
                                <p>Your tummy (and brain) is full.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </main>
    );
}
