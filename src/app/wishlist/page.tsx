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

    if (!isLoaded) return null;

    return (
        <main className="min-h-screen p-6 pb-32">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-black text-[var(--dora-blue)] mb-4">Gadget Wishlist</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        What gadget do you wish Doraemon would pull out of his pocket for you?
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <section className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[40px] shadow-neu-out sticky top-8">
                            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                                <span>✨</span> Make a Wish
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-2">Gadget Name (Idea)</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Traffic-Bypassing Shoes"
                                        className="w-full px-4 py-3 bg-[var(--background)] rounded-xl shadow-neu-in focus:outline-none focus:ring-2 focus:ring-[var(--dora-blue)] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-2">Why do you need it?</label>
                                    <textarea
                                        value={problem}
                                        onChange={(e) => setProblem(e.target.value)}
                                        placeholder="Tell us your trouble..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[var(--background)] rounded-xl shadow-neu-in focus:outline-none focus:ring-2 focus:ring-[var(--dora-blue)] transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--dora-blue)] text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-transform active:scale-95"
                                >
                                    <Send size={18} />
                                    Send to Future
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Wish Wall Section */}
                    <section className="lg:col-span-2">
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {wishes.map((wish, i) => (
                                <WishCard key={wish.id} wish={wish} index={i} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
