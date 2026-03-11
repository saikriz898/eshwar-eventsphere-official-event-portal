import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Linkedin,
    Youtube,
    Facebook,
    Send,
    User,
    MessageSquare,
    Zap,
    Sparkles,
    CheckCircle2,
    Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import seceLogo from '../../assets/logo/sece-logo-primary.png';
import InternalNavbar from '../../components/layout/Navbar/InternalNavbar';
import InternalPreloader from '../../components/common/Preloader/InternalPreloader';

const ContactPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const socialLinks = [
        { id: 'ig', icon: Instagram, href: "https://www.instagram.com/srieshwar_cbe/", color: "#E1306C", label: 'Instagram' },
        { id: 'li', icon: Linkedin, href: "https://www.linkedin.com/school/srieshwar/", color: "#0A66C2", label: 'LinkedIn' },
        { id: 'yt', icon: Youtube, href: "https://www.youtube.com/c/SriEshwarCollegeofEngineering", color: "#FF0000", label: 'YouTube' },
        { id: 'fb', icon: Facebook, href: "https://www.facebook.com/srieshwarcollegeofengineering/", color: "#1877F2", label: 'Facebook' }
    ];

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
                >
                    <InternalPreloader />
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-h-screen w-full bg-[#fafbfc] overflow-x-hidden relative text-slate-900 selection:bg-indigo-500/10"
                >
                    {/* CLEAN AMBIENT BACKGROUND */}
                    <div className="fixed inset-0 z-0">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[80px]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00a_1px,transparent_1px)] bg-[size:30px_30px]" />
                    </div>

                    <InternalNavbar pageTitle="Support Hub" />

                    {/* RESPONSIVE MAIN CONTAINER */}
                    <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center lg:justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full">

                            {/* LEFT SIDE: 3D HOLOGRAPHIC (Hidden on mobile) */}
                            <div className="hidden lg:flex relative justify-center lg:justify-start lg:pl-10 items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative w-[340px] h-[340px]"
                                >
                                    {/* Inner Orbit Rings */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="absolute w-[240px] h-[240px] border border-indigo-500/10 rounded-full" />
                                        <div className="absolute w-[290px] h-[290px] border border-slate-200/50 rounded-full" />
                                    </motion.div>

                                    {/* Floating 3D Badge */}
                                    <motion.div
                                        animate={{
                                            y: [-12, 12, -12],
                                            rotateY: [-5, 5, -5],
                                        }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                    >
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-indigo-500/5 blur-[45px] rounded-full" />
                                            <div className="relative w-40 h-40 bg-white rounded-[36px] border border-slate-100 flex flex-col items-center justify-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)] group-hover:border-indigo-500/30 transition-all duration-500">
                                                <div className="absolute top-0 right-0 w-14 h-14 bg-indigo-500/5 rounded-full blur-xl" />
                                                <Cpu size={44} className="text-indigo-600 mb-3.5 drop-shadow-sm" />
                                                <div className="text-center">
                                                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-0.5">Nexus</p>
                                                    <p className="text-base font-black italic tracking-tighter text-slate-900">SUPPORT</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Orbiting Satellite Dots */}
                                    {[0, 120, 240].map((angle, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ rotate: [angle, angle + 360] }}
                                            transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 pointer-events-none"
                                        >
                                            <div className="absolute right-0 top-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <div className="absolute -bottom-10 left-10">
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Integrated Intelligence</span>
                                </div>
                            </div>

                            {/* RIGHT SIDE: LIGHT THEME FORM CARD */}
                            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[32px] border border-slate-100 px-7 sm:px-14 py-10 sm:py-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
                                >
                                    <AnimatePresence mode="wait">
                                        {!submitted ? (
                                            <motion.div
                                                key="form-container"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="relative z-10"
                                            >
                                                <div className="flex flex-col items-center text-center mb-8 sm:mb-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 mb-3">
                                                        <Sparkles size={20} />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-2xl font-black tracking-tight italic uppercase text-slate-950 leading-none mb-1.5">Direct Link</h2>
                                                        <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-widest">Global Sync Hub</p>
                                                    </div>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-3.5">
                                                    <div className="relative group">
                                                        <User size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="IDENTITY NAME"
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-[14px] py-3.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all uppercase"
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <Mail size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="DIGITAL ADDRESS"
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-[14px] py-3.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all uppercase"
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <MessageSquare size={14} className="absolute left-5 top-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                        <textarea
                                                            required
                                                            rows="2"
                                                            placeholder="COMMAND MODULE"
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-[14px] py-3.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all uppercase resize-none"
                                                        ></textarea>
                                                    </div>

                                                    <motion.button
                                                        whileHover={{ scale: 1.01, backgroundColor: '#4f46e5' }}
                                                        whileTap={{ scale: 0.98 }}
                                                        type="submit"
                                                        className="w-full py-4 bg-slate-950 text-white rounded-[14px] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-3 mt-1"
                                                    >
                                                        Initiate Link <Send size={15} />
                                                    </motion.button>
                                                </form>

                                                <div className="mt-8 sm:mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 sm:pt-4 border-t border-slate-50">
                                                    <div className="flex items-center gap-2 group cursor-pointer">
                                                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                            <Phone size={12} className="text-slate-400 group-hover:text-white" />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-500 tracking-wider">+91 4259 200 300</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 group cursor-pointer">
                                                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                            <Mail size={12} className="text-slate-400 group-hover:text-white" />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-500 tracking-wider">sece@sece.ac.in</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 sm:mt-4 flex items-center justify-center gap-4">
                                                    {socialLinks.map((social) => (
                                                        <motion.a
                                                            key={social.id}
                                                            href={social.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onHoverStart={() => setHoveredSocial(social.id)}
                                                            onHoverEnd={() => setHoveredSocial(null)}
                                                            whileHover={{ y: -2 }}
                                                            className="relative w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center transition-all hover:bg-white hover:border-indigo-500/30 text-slate-400 hover:text-indigo-600"
                                                        >
                                                            <social.icon size={14} />
                                                            <AnimatePresence>
                                                                {hoveredSocial === social.id && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 5 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: 5 }}
                                                                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 text-white text-[7px] font-black whitespace-nowrap shadow-md blur-0"
                                                                    >
                                                                        {social.label}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </motion.a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="success-container"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-12 text-center"
                                            >
                                                <div className="relative">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="absolute inset-0 bg-emerald-500 blur-xl rounded-full"
                                                    />
                                                    <div className="relative w-16 h-16 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                                                        <CheckCircle2 size={32} />
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-black italic mt-6 tracking-tight uppercase text-slate-950">Signal Sent!</h3>
                                                <p className="text-xs text-slate-400 mt-2 max-w-[200px] font-medium leading-tight">Link established. The Nexus Hub will respond shortly to your transmission.</p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSubmitted(false)}
                                                    className="mt-8 text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] border-b border-indigo-600/30 pb-0.5"
                                                >
                                                    New Transmission
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                        </div>
                    </main>

                    {/* DECORATIVE ACCENTS (Hidden on small screens) */}
                    <div className="hidden sm:flex absolute bottom-6 right-8 items-center gap-3 opacity-60">
                        <div className="text-right">
                            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">HQ Region</p>
                            <p className="text-[9px] font-bold text-slate-900 uppercase italic">Coimbatore, IN</p>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <MapPin size={14} className="text-indigo-600" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactPage;
