"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Map, CheckSquare, Heart, Brain } from "lucide-react";

const navItems = [
    { name: "Pocket", href: "/", icon: Home },
    { name: "Everywhere", href: "/map", icon: Map },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Bread", href: "/memory-bread", icon: Brain },
];

export function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 md:gap-4 px-4 py-3 md:px-6 md:py-4 bg-[var(--glass-surface)] backdrop-blur-xl rounded-full border border-[var(--glass-border)] shadow-[var(--shadow-float)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.name} href={item.href} className="relative group">
                            <div
                                className={cn(
                                    "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                                    isActive
                                        ? "bg-[image:var(--dora-gradient-primary)] text-white shadow-lg shadow-blue-500/30 scale-110"
                                        : "bg-transparent text-[var(--foreground)] hover:bg-[var(--glass-border)] hover:text-[var(--dora-blue)]"
                                )}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -bottom-2 w-1 h-1 bg-[var(--dora-red)] rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--dora-blue)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                                {item.name}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--dora-blue)]" />
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
