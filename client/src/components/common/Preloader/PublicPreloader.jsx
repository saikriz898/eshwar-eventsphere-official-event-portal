import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Activity } from 'lucide-react';
import seceLogo from '../../../assets/logo/sece-logo-primary.png';

const PublicPreloader = () => {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white overflow-hidden">
            {/* HIGH-TECH BLUEPRINT BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50a_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_80%)]" />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center px-6">
                {/* CENTRAL ORBITAL CORE */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">

                    {/* Outer Rotating Gear Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-slate-100 rounded-full"
                    />

                    {/* Pulsing Sync Rings */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: [0, 0.2, 0],
                                scale: [0.8, 1.5],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 border border-indigo-500 rounded-full"
                        />
                    ))}

                    {/* Inner Core Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-[24px] sm:rounded-[32px] border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden group"
                    >
                        {/* Core Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5" />

                        {/* THE SMALL LOGO */}
                        <motion.img
                            src={seceLogo}
                            alt="SECE"
                            animate={{
                                y: [-2, 2, -2],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="h-8 sm:h-10 w-auto object-contain relative z-10"
                        />

                        {/* Scan Line Animation */}
                        <motion.div
                            animate={{ top: ['-10%', '110%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-indigo-500/20 z-20"
                        />
                    </motion.div>

                    {/* Orbiting Satellite Dots */}
                    {[0, 120, 240].map((angle, i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: [angle, angle + 360] }}
                            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                        </motion.div>
                    ))}
                </div>

                {/* STATUS HUD - VISUAL ONLY */}
                <div className="mt-8 sm:mt-12 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-1">
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scaleY: [1, 2, 1],
                                    opacity: [0.2, 0.6, 0.2],
                                }}
                                transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                                className="w-1 h-3 bg-indigo-600/30 rounded-full"
                            />
                        ))}
                    </div>
                </div>

                {/* DECORATIVE ELEMENTS */}
                <div className="absolute bottom-6 sm:bottom-12 flex flex-col items-center gap-2 opacity-30">
                    <Sparkles size={16} className="text-indigo-400" />
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">Network.Elite</span>
                </div>
            </div>
        </div>
    );
};

export default PublicPreloader;
