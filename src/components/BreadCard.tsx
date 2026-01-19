"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BreadSlice } from "@/lib/memory-bread";
import Image from "next/image";

interface BreadCardProps {
    bread: BreadSlice;
    onEat: (id: string) => void;
}

export function BreadCard({ bread, onEat }: BreadCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEating, setIsEating] = useState(false);

    const handleEat = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEating(true);
        setTimeout(() => {
            onEat(bread.id);
        }, 500);
    };

    return (
        <div
            className="relative w-64 h-64 cursor-pointer perspective-[1000px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0, scale: isEating ? 0 : 1, opacity: isEating ? 0 : 1 }}
            >
                {/* Front (Question) */}
                <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                    <div className="relative w-full h-full drop-shadow-xl">
                        <Image src="/memory-bread/slice.png" alt="Bread" fill className="object-contain" />
                        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                            <p className="font-bold text-gray-700 text-lg leading-tight">{bread.question}</p>
                        </div>
                    </div>
                    <p className="absolute bottom-2 text-xs text-gray-400 font-medium">Click to flip</p>
                </div>

                {/* Back (Answer) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
                    <div className="relative w-full h-full drop-shadow-xl">
                        <Image src="/memory-bread/slice.png" alt="Bread" fill className="object-contain" />
                        {/* Ink-like effect for answer/stamp */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <p className="font-black text-[var(--dora-blue)] text-2xl -rotate-2 select-none" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>{bread.answer}</p>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleEat}
                                className="mt-6 bg-[var(--dora-red)] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 hover:bg-red-600"
                            >
                                Eat it! (Memorized)
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
