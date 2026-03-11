import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, ShieldCheck } from 'lucide-react';
import seceLogo from '../../assets/logo/sece-logo-primary.png';
import { cn } from '../../utils/cn';

const AuthLayout = ({ 
    children, 
    title = "Identity Verification", 
    subtitle = "Secure terminal for temporal portal access",
    sidebarTitle = <>Protecting the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Discovery.</span></>,
    sidebarSubtitle = "Your identity signature ensures safe traversal through our high-fidelity event sector."
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#fafbfc] flex relative selection:bg-indigo-100 overflow-x-hidden">
            {/* AMBIENT TECHNICAL BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-500/[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-yellow-500/[0.03] blur-[100px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-[size:60px_60px]" />
                
                {/* Dynamic Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -1000],
                                x: [0, (i % 2 === 0 ? 10 : -10)],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{ 
                                duration: 15 + i * 2, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: i * 3
                            }}
                            className="absolute w-px h-20 bg-gradient-to-t from-transparent via-blue-200 to-transparent"
                            style={{ 
                                left: `${15 + i * 15}%`,
                                top: '100%'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* AUTH SIDEBAR: LIGHT THEME VISUAL IDENTITY */}
            <div className="hidden lg:flex w-[40%] bg-slate-50 relative overflow-hidden flex-col items-center justify-center p-12 text-slate-950 border-r border-slate-100">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0%,transparent_100%)] animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] invert" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 space-y-8 max-w-sm"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-1 border border-blue-600 bg-blue-600/10" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Security Sector</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] text-slate-950">
                            {sidebarTitle}
                        </h2>
                        <p className="text-slate-500 font-medium italic text-sm leading-relaxed max-w-xs">
                            {sidebarSubtitle}
                        </p>
                    </div>

                    <div className="pt-12 space-y-6">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center transition-all group-hover:border-blue-200 group-hover:shadow-blue-500/5">
                                <ShieldCheck className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Encrypted Signal</h4>
                                <p className="text-[10px] text-slate-400 italic font-bold">256-bit temporal encryption</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center transition-all group-hover:border-yellow-200 group-hover:shadow-yellow-500/5">
                                <Zap className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Neural Speed</h4>
                                <p className="text-[10px] text-slate-400 italic font-bold">Sub-millisecond verification</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Text Trace */}
                <div className="absolute bottom-12 left-12 rotate-[-90deg] origin-left opacity-30">
                    <span className="text-[8px] font-black uppercase tracking-[1em] text-slate-400">Eshwar EventSphere // Security Terminal</span>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Navbar within Auth */}
                <nav className="h-20 px-4 sm:px-8 flex items-center justify-between border-b border-slate-100 bg-white/50 backdrop-blur-xl">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2.5 rounded-xl border border-slate-100 text-slate-600 hover:bg-white hover:text-slate-950 hover:border-slate-300 transition-all shadow-sm group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </button>

                    <img 
                        src={seceLogo} 
                        alt="SECE Logo" 
                        className="h-7 w-auto transition-opacity hover:opacity-80 cursor-pointer" 
                        onClick={() => navigate('/')}
                    />

                    <div className="w-10" />
                </nav>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-sm flex flex-col justify-center py-6 sm:py-10"
                    >
                        <div className="mb-2 space-y-0.5 text-center lg:text-left">
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-600">Node Verification</span>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">{title}</h3>
                            <p className="text-slate-500 text-[10px] italic leading-tight">{subtitle}</p>
                        </div>

                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-blue-500/5 p-5 sm:p-7 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 pointer-events-none">
                                <ShieldCheck size={100} className="text-blue-600" />
                            </div>
                            
                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>

                        <div className="mt-2 text-center">
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                                &copy; 2026 Eshwar EventSphere.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
