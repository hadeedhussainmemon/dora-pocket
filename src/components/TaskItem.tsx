"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface TaskItemProps {
    task: { id: number; text: string; completed: boolean };
    onToggle: (id: number) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-4 bg-white rounded-2xl shadow-neu-out mb-4 cursor-pointer select-none group"
            onClick={() => onToggle(task.id)}
        >
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg mr-4 shadow-inner transition-colors duration-300 ${task.completed ? "bg-[var(--dora-blue)]" : "bg-gray-100"}`}>
                <motion.div
                    initial={false}
                    animate={{ scale: task.completed ? 1 : 0 }}
                >
                    <Check size={18} className="text-white" strokeWidth={3} />
                </motion.div>
            </div>

            <span className={`text-[var(--foreground)] font-medium text-lg transition-all duration-300 ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.text}
            </span>
        </motion.div>
    );
}
