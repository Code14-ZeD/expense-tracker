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
                {/* Card Group (Back layer) */}
                <motion.g
                    variants={{
                        initial: { y: 0, rotate: 0 },
                        visible: {
                            y: -6,
                            rotate: -12,
                            transition: {
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2,
                            },
                        },
                        hover: { y: -8, rotate: -15 },
                        tap: { y: -4, rotate: -5 },
                    }}
                    style={{ originX: "16px", originY: "15px" }}
                >
                    {/* Card Body */}
                    <rect
                        x="6"
                        y="8"
                        width="20"
                        height="14"
                        rx="2"
                        className="fill-primary/40"
                    />
                    {/* Chip */}
                    <rect
                        x="8"
                        y="10"
                        width="4"
                        height="3"
                        rx="0.5"
                        className="fill-yellow-500/80"
                    />
                </motion.g>

                {/* Wallet Body (Front layer) */}
                <path
                    d="M4 12C4 9.79086 5.79086 8 8 8H24C26.2091 8 28 9.79086 28 12V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V12Z"
                    className="fill-[#855D3E] dark:fill-[#A07050]"
                />

                {/* Strip (Animated) */}
                <motion.rect
                    x="4"
                    y="13"
                    width="24"
                    height="2"
                    className="fill-black dark:fill-white"
                    variants={{
                        initial: { scaleX: 0, opacity: 0 },
                        visible: {
                            scaleX: 1,
                            opacity: 1,
                            transition: { delay: 0.7, duration: 0.4 },
                        },
                        hover: { scaleX: 1.1 },
                        tap: { scaleX: 0.95 },
                    }}
                />

                {/* Coin (Animated) */}
                <motion.g
                    variants={{
                        initial: { opacity: 0, y: -10, scale: 0 },
                        visible: {
                            opacity: 1,
                            y: 10,
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
                            y: 10,
                            scale: 1,
                        },
                        tap: { opacity: 0, y: 0 },
                    }}
                >
                    <circle
                        cx="22"
                        cy="4"
                        r="3"
                        className="fill-yellow-400"
                    />
                    <text
                        x="22"
                        y="4"
                        dy="1.5"
                        textAnchor="middle"
                        fontSize="4.5"
                        fontWeight="bold"
                        className="fill-yellow-900"
                        style={{ userSelect: "none" }}
                    >
                        ₹
                    </text>
                </motion.g>
            </svg>
        </motion.div>
    );
}
