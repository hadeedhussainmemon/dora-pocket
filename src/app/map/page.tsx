"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locations, Location } from "@/lib/locations";
import { AnywhereDoor } from "@/components/AnywhereDoor";
import Image from "next/image";

export default function MapPage() {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    const handleDoorOpen = (location: Location) => {
        setCurrentLocation(location);
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[var(--background)] font-sans selection:bg-[var(--dora-blue)] selection:text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent opacity-60 pointer-events-none" />
            {/* Background Layer */}
            <AnimatePresence mode="wait">
                {currentLocation ? (
                    <motion.div
                        key={currentLocation.id}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 bg-cover bg-center"
                    >
                        {/* We use an Image component as a background to ensure optimization */}
                        <Image
                            src={currentLocation.image}
                            alt={currentLocation.name}
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="default-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 bg-[var(--background)]"
                    />
                )}
            </AnimatePresence>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!currentLocation ? (
                        <motion.div
                            key="door"
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnywhereDoor onOpen={handleDoorOpen} locations={locations} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="location-card"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                            className="p-10 bg-[var(--glass-surface)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[40px] shadow-[var(--shadow-float)] max-w-lg text-center mx-4 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-[image:var(--dora-gradient-primary)]" />
                            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-[image:var(--dora-gradient-text)] mb-6">{currentLocation.name}</h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                                {currentLocation.description}
                            </p>
                            <button
                                onClick={() => setCurrentLocation(null)}
                                className="px-8 py-3 bg-[var(--dora-red)] text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-transform active:scale-95"
                            >
                                Go Back Home
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
