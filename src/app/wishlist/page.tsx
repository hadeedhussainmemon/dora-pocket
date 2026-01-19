"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WishCard } from "@/components/WishCard";
import { Send } from "lucide-react";

interface Wish {
    id: string;
    name: string;
    problem: string;
    date: string;
}

const INITIAL_WISHES: Wish[] = [
    { id: "1", name: "AI Homework Finisher", problem: "I have too much math homework and it's due tomorrow!", date: new Date().toISOString() },
    { id: "2", name: "Instant Pizza Printer", problem: "I'm hungry but delivery takes too long.", date: new Date().toISOString() },
];

export default function WishlistPage() {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [name, setName] = useState("");
    const [problem, setProblem] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("dora-wishes");
        if (saved) {
            setWishes(JSON.parse(saved));
        } else {
            setWishes(INITIAL_WISHES);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("dora-wishes", JSON.stringify(wishes));
        }
    }, [wishes, isLoaded]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !problem.trim()) return;

        const newWish: Wish = {
            id: Date.now().toString(),
            name,
            problem,
            date: new Date().toISOString(),
        };

        setWishes([newWish, ...wishes]);
        setName("");
        setProblem("");
    };

    const handleDelete = (id: string) => {
        setWishes(wishes.filter(w => w.id !== id));
    };

    if (!isLoaded) return null;

    return (
        <main className="min-h-screen p-6 pb-32 font-sans selection:bg-[var(--dora-blue)] selection:text-white relative overflow-hidden bg-[var(--background)]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 drop-shadow-sm">Gadget Wishlist</h1>
                    <p className="text-[var(--foreground)]/80 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        What gadget do you wish Doraemon would pull out of his pocket for you?
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <section className="lg:col-span-1">
                        <div className="bg-[var(--glass-surface)] backdrop-blur-xl border border-[var(--glass-border)] p-8 rounded-[32px] shadow-[var(--shadow-float)] sticky top-24">
                            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8 flex items-center gap-3">
                                <span className="text-3xl">✨</span> Make a Wish
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[var(--dora-blue)] uppercase tracking-wider">Gadget Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Traffic-Bypassing Shoes"
                                        className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/80 transition-all shadow-inner font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[var(--dora-blue)] uppercase tracking-wider">Why do you need it?</label>
                                    <textarea
                                        value={problem}
                                        onChange={(e) => setProblem(e.target.value)}
                                        placeholder="Tell us your trouble..."
                                        rows={4}
                                        className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/80 transition-all resize-none shadow-inner font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] transition-all active:scale-95"
                                >
                                    <Send size={20} />
                                    Send to Future
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Wish Wall Section */}
                    <section className="lg:col-span-2">
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {wishes.map((wish, i) => (
                                <WishCard key={wish.id} wish={wish} index={i} onDelete={handleDelete} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
