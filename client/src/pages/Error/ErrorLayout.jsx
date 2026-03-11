import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Zap, ShieldAlert, Cpu, AlertTriangle, Construction, Settings } from 'lucide-react';
import seceLogo from '../../assets/logo/sece-logo-primary.png';
import { cn } from '../../utils/cn';

const ErrorLayout = ({
    code = "404",
    title = "System Disruption",
    description = "The requested transmission node could not be located in the current temporal grid.",
    icon: Icon = AlertTriangle,
    accentColor = "indigo", // indigo, rose, amber, emerald
    showBackButton = true,
    showHomeButton = true,
    children
}) => {
    const navigate = useNavigate();

    const colors = {
        indigo: "text-indigo-600 bg-indigo-500/10 border-indigo-100 shadow-indigo-500/20",
        rose: "text-rose-600 bg-rose-500/10 border-rose-100 shadow-rose-500/20",
        amber: "text-amber-600 bg-amber-500/10 border-amber-100 shadow-amber-500/20",
        emerald: "text-emerald-600 bg-emerald-500/10 border-emerald-100 shadow-emerald-500/20",
    };

    const gradientColors = {
        indigo: "from-indigo-600 to-sky-500",
        rose: "from-rose-600 to-pink-500",
        amber: "from-amber-600 to-orange-500",
        emerald: "from-emerald-600 to-teal-500",
    };

    return (
        <div className="h-screen w-full bg-[#fafbfc] overflow-hidden flex flex-col relative text-slate-900 selection:bg-indigo-100">
            {/* AMBIENT BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className={cn("absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-40",
                    accentColor === 'rose' ? 'bg-rose-500/10' : 'bg-indigo-500/10')} />
                <div className={cn("absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-30",
                    accentColor === 'rose' ? 'bg-orange-500/10' : 'bg-blue-500/10')} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00a_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* ERROR NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20 flex items-center px-4 md:px-8">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto relative">
                    {showBackButton ? (
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 rounded-xl border border-slate-100 text-slate-600 hover:bg-white hover:text-slate-950 hover:border-slate-300 transition-all active:scale-95 shadow-sm group"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>
                    ) : (
                        <div className="w-10" />
                    )}

                    <img
                        src={seceLogo}
                        alt="SECE Logo"
                        className="h-8 w-auto absolute left-1/2 -translate-x-1/2 cursor-pointer transition-opacity hover:opacity-80"
                        onClick={() => navigate('/')}
                    />

                    <div className="w-10" /> {/* Spacer */}
                </div>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center pt-24 max-w-7xl mx-auto w-full px-6 gap-16 lg:gap-32">

                {/* LEFT SIDE: NEW NEURAL SHARD MATRIX 3D ANIMATION */}
                <div className="flex-1 relative flex items-center justify-center w-full min-h-[350px] sm:min-h-[500px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
                    >
                        {/* CORE SUSPENSION */}
                        <motion.div
                            animate={{
                                y: [-20, 20, -20],
                                rotateY: [0, 360],
                                rotateX: [5, -5, 5]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="relative z-20 w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Glow Aura */}
                            <div className={cn("absolute inset-0 blur-[60px] sm:blur-[100px] rounded-full opacity-40",
                                accentColor === 'rose' ? 'bg-rose-500' : 'bg-indigo-500')} />

                            {/* The Glass Core */}
                            <div className="relative w-full h-full bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/40 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                                <div className={cn("absolute inset-0 opacity-10 animate-pulse", accentColor === 'rose' ? 'bg-rose-500' : 'bg-indigo-500')} />
                                <Icon size={window.innerWidth < 640 ? 40 : 56} className={cn("relative z-10", colors[accentColor].split(' ')[0])} />
                                <div className="mt-4 text-center">
                                    <span className="text-[10px] font-black italic tracking-tighter text-slate-950 uppercase leading-none">#{code}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* FLOATING NEURAL SHARDS */}
                        {[...Array(12)].map((_, i) => {
                            const angle = (i / 12) * Math.PI * 2;
                            const radius = window.innerWidth < 640 ? 120 : 180;
                            const x = Math.cos(angle) * radius;
                            const z = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        rotateY: [0, 360],
                                        y: [0, i % 2 === 0 ? 40 : -40, 0],
                                        scale: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        rotateY: { duration: 15 + i, repeat: Infinity, ease: "linear" },
                                        y: { duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <div
                                        className={cn("w-3 h-3 sm:w-5 sm:h-5 rounded-md border backdrop-blur-sm",
                                            i % 3 === 0 ? "bg-white/40 border-white/40" :
                                                accentColor === 'rose' ? "bg-rose-500/20 border-rose-500/30" : "bg-indigo-500/20 border-indigo-500/30")}
                                        style={{ transform: `translate3d(${x}px, ${i * 10 - 60}px, ${z}px)` }}
                                    />

                                    {/* Data Links (Traces) */}
                                    {i % 4 === 0 && (
                                        <div
                                            className={cn("absolute w-[1px] h-32 opacity-20 bg-gradient-to-t from-transparent via-slate-300 to-transparent")}
                                            style={{ transform: `translate3d(${x}px, ${i * 10 - 60}px, ${z}px) rotateX(90deg)` }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* AMBIENT DEPTH GRID */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at center, transparent 0%, transparent 70%, ${accentColor === 'rose' ? '#fb7185' : '#6366f1'} 100%)`,
                                transform: 'rotateX(75deg) translateZ(-200px) scale(2)'
                            }}
                        />
                    </motion.div>
                </div>

                {/* RIGHT SIDE: CONTENT (Refined Sizes) */}
                <div className="flex-1 space-y-8 text-center lg:text-left">
                    <div className="space-y-4 sm:space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 justify-center lg:justify-start"
                        >
                            <Zap size={14} className={cn("animate-pulse", colors[accentColor].split(' ')[0])} />
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Security Exception Found</span>
                        </motion.div>

                        <div className="space-y-2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-950 leading-[0.9]"
                            >
                                <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", gradientColors[accentColor])}>{title.split(' ')[0]}</span>
                                <br />
                                {title.split(' ').slice(1).join(' ')}
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 font-medium italic text-xs sm:text-base max-w-sm mx-auto lg:mx-0 leading-relaxed"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {children}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    >
                        {showHomeButton && (
                            <button
                                onClick={() => navigate('/')}
                                className="group w-full sm:w-auto px-8 py-4 bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/10"
                            >
                                <Home size={16} />
                                Exit to Home
                            </button>
                        )}
                        {showBackButton && (
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-100 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:border-slate-300 transition-all shadow-sm"
                            >
                                Previous Node
                            </button>
                        )}
                    </motion.div>

                    {/* Meta Status */}
                    <div className="flex items-center justify-center lg:justify-start gap-6 pt-12 border-t border-slate-50 opacity-40">
                        <div className="text-left">
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Error Vector</p>
                            <p className="text-[10px] font-bold text-slate-900 uppercase italic">Core.System.{code}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-left">
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Time Trace</p>
                            <p className="text-[10px] font-bold text-slate-900 uppercase italic">{new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ErrorLayout;
