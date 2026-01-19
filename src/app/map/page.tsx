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
        <main className="min-h-screen relative flex items-center justify-center overflow-hidden">
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
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="p-8 bg-white/90 backdrop-blur-md rounded-[40px] shadow-neu-out max-w-lg text-center mx-4"
                        >
                            <h2 className="text-4xl font-black text-[var(--dora-blue)] mb-4">{currentLocation.name}</h2>
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
