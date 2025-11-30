"use client";

import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    size?: number;
}

export function Logo({ className = "", size = 32 }: LogoProps) {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            initial="initial"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                {/* Card (Back layer) */}
                <motion.rect
                    x="6"
                    y="8"
                    width="20"
                    height="14"
                    rx="2"
                    className="fill-primary/40"
                    variants={{
                        initial: { y: 0 },
                        visible: {
                            y: -5,
                            transition: {
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2,
                            },
                        },
                        hover: { y: -5 },
                        tap: { y: -2 },
                    }}
                />

                {/* Wallet Body (Front layer) */}
                <path
                    d="M4 12C4 9.79086 5.79086 8 8 8H24C26.2091 8 28 9.79086 28 12V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V12Z"
                    className="fill-[#855D3E] dark:fill-[#A07050]"
                />

                {/* Coin (Animated) */}
                <motion.circle
                    cx="22"
                    cy="4"
                    r="2.5"
                    className="fill-yellow-400"
                    variants={{
                        initial: { opacity: 0, y: -10, scale: 0 },
                        visible: {
                            opacity: 1,
                            y: 12,
                            scale: 1,
                            transition: {
                                delay: 0.6,
                                duration: 0.5,
                                type: "spring",
                                bounce: 0.4,
                            },
                        },
                        hover: {
                            opacity: 1,
                            y: 12,
                            scale: 1,
                        },
                        tap: { opacity: 0, y: 0 },
                    }}
                />
            </svg>
        </motion.div>
    );
}
