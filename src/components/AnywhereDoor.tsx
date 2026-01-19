"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Location } from "@/lib/locations";
import Image from "next/image";

interface AnywhereDoorProps {
    onOpen: (location: Location) => void;
    locations: Location[];
}

export function AnywhereDoor({ onOpen, locations }: AnywhereDoorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Pick a random location
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];

        // Delay to let the door open animation play slightly before triggering the parent transition
        setTimeout(() => {
            onOpen(randomLocation);
        }, 1000);

        // Reset door state after a while if needed, but usually we transition away
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };

    return (
        <div className="relative flex flex-col items-center justify-center cursor-pointer group" onClick={handleOpen}>
            <motion.div
                className="relative w-64 h-80 perspective-[1000px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Door Frame (Back) */}
                <div className="absolute inset-0 bg-[#FF69B4] rounded-t-[40px] rounded-b-[10px] shadow-neu-out border-8 border-[#FF1493]" />

                {/* Door Panel (The part that opens) */}
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isOpen ? -110 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute inset-2 bg-[#FF69B4] rounded-t-[35px] rounded-b-[5px] border-4 border-[#FF1493]/50 shadow-inner flex items-center justify-start z-10"
                >
                    {/* Doorknob */}
                    <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-md ml-auto mr-4 translate-y-2" />
                </motion.div>

                {/* Inner Portal (What's behind the door) */}
                <div className="absolute inset-4 bg-black rounded-t-[30px] overflow-hidden">
                    {/* Swirling Portal Effect */}
                    <div className="w-full h-full bg-[conic-gradient(at_center,var(--dora-blue),white,var(--dora-red),var(--dora-blue))] opacity-80 animate-spin-slow" />
                </div>
            </motion.div>

            <p className="mt-8 text-[var(--foreground)] font-bold text-xl group-hover:text-[#FF1493] transition-colors">
                Where to today?
            </p>
        </div>
    );
}
