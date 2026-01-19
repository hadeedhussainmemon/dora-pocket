"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TaskItem } from "@/components/TaskItem";
import { RewardsModal } from "@/components/RewardsModal";
import confetti from "canvas-confetti";

const INITIAL_TASKS = [
    { id: 1, text: "Take a 10-minute nap (like Nobita)", completed: false },
    { id: 2, text: "Help a friend today", completed: false },
    { id: 3, text: "Finish one small homework task", completed: false },
    { id: 4, text: "Clean your room (Mama is watching!)", completed: false },
];

export default function TasksPage() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [showReward, setShowReward] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("sewashi-tasks");
        if (saved) {
            try {
                setTasks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse tasks", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("sewashi-tasks", JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    const toggleTask = (id: number) => {
        const newTasks = tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        setTasks(newTasks);

        // Check if all completed
        const allCompleted = newTasks.every((t) => t.completed);
        if (allCompleted && !tasks.every((t) => t.completed)) {
            triggerReward();
        }
    };

    const triggerReward = () => {
        setShowReward(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0096D7', '#E02A27', '#FFD700', '#FFFFFF']
        });
    };

    const resetTasks = () => {
        const reset = INITIAL_TASKS.map(t => ({ ...t, completed: false }));
        setTasks(reset);
        setShowReward(false);
    };

    if (!isLoaded) return null;

    const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

    return (
        <main className="min-h-screen p-6 pb-32 max-w-md mx-auto relative font-sans selection:bg-[var(--dora-blue)] selection:text-white">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[var(--background)] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent opacity-60 pointer-events-none -z-10" />

            <header className="mb-10 pt-8 text-center">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-2 drop-shadow-sm">Sewashi's List</h1>
                <p className="text-[var(--foreground)]/70 font-medium">Complete tasks to earn a treat!</p>


                {/* Progress Bar */}
                <div className="mt-8 h-6 bg-[var(--glass-surface)] backdrop-blur-sm rounded-full p-1 shadow-inner border border-[var(--glass-border)]">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    />
                </div>
            </header>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                ))}
            </div>

            <AnimatePresence>
                {showReward && (
                    <RewardsModal onClose={() => setShowReward(false)} />
                )}
            </AnimatePresence>

            {/* Reset Debug Button (Optional, can be hidden) */}
            <div className="mt-12 text-center">
                <button onClick={resetTasks} className="text-sm font-medium text-gray-400 hover:text-[var(--dora-blue)] transition-colors">
                    Reset Sewashi's Day
                </button>
            </div>
        </main>
    );
}
