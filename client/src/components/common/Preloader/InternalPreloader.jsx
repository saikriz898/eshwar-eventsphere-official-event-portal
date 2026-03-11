import React from 'react';
import { motion } from 'framer-motion';

const InternalPreloader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-20 w-full h-full min-h-[250px] relative overflow-hidden bg-white/5 backdrop-blur-[2px]">
            {/* Background Minimal Shapes */}
            <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-indigo-100 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-sky-100 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center transition-transform">
                {/* Visual-Only Loading Composition */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">

                    {/* Morphing Outer Shell */}
                    <motion.div
                        animate={{
                            borderRadius: ["30% 70% 50% 50% / 30% 30% 70% 70%", "50% 50% 20% 80% / 20% 80% 20% 80%", "30% 70% 50% 50% / 30% 30% 70% 70%"],
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-indigo-600/20 border-t-indigo-500 shadow-[inset_0_0_15px_rgba(79,70,229,0.1)]"
                    />

                    {/* Secondary Revolving Ring */}
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [0.8, 0.9, 0.8]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border border-sky-400/30 border-b-sky-400 rounded-full"
                    />

                    {/* Central Core Pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    />
                </div>

                {/* Minimal Linear Progress (No Text) */}
                <div className="mt-12 sm:mt-16 w-28 sm:w-32 h-[1px] bg-slate-100 relative overflow-hidden rounded-full">
                    <motion.div
                        animate={{
                            left: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
                    />
                </div>

                {/* Micro Animated Detail - Synchronized with Public Preloader */}
                <div className="flex gap-1.5 mt-8 items-center">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scaleY: [1, 2, 1],
                                opacity: [0.2, 0.6, 0.2]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                            className="w-1 h-3 bg-indigo-600/30 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternalPreloader;
