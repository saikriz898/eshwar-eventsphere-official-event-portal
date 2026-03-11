import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import ResetKeyModal from '../../components/auth/ResetKeyModal';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, error
    const [errorMessage, setErrorMessage] = useState('');
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    // TEMPORAL ERROR AUTO-CLEAR
    React.useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
                if (status === 'error') setStatus('idle');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const result = await login(formData);
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            setStatus('error');
            setErrorMessage(result.error);
        }
    };

    return (
        <AuthLayout 
            title="Authorize Entry" 
            subtitle="Enter your credentials to synchronize with the portal"
        >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Terminal ID (Email)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="eshwar.user@sece.ac.in"
                            className="w-full bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block w-full pl-11 p-4 transition-all placeholder:text-slate-300 outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end mr-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Key</label>
                        <button 
                            type="button" 
                            onClick={() => setIsResetModalOpen(true)}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
                        >
                            Reset Key?
                        </button>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block w-full pl-11 p-4 pr-11 transition-all placeholder:text-slate-300 outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* ELITE NOTIFICATION TERMINAL (TOAST) */}
                <AnimatePresence>
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="fixed top-4 inset-x-4 sm:inset-x-auto sm:top-8 sm:right-8 z-[1000] sm:max-w-md"
                        >
                            <div className="bg-white/90 backdrop-blur-xl border border-red-100 shadow-2xl shadow-red-500/10 rounded-[24px] p-4 flex items-center gap-4 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-50" />
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 relative">
                                    <ShieldAlert size={20} className="text-red-600" />
                                </div>
                                <div className="flex-1 relative">
                                    <p className="text-[10px] font-black uppercase text-red-600 tracking-widest leading-none mb-1">Access Restriction</p>
                                    <p className="text-[11px] font-bold text-slate-900 leading-tight">{errorMessage}</p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setErrorMessage('');
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors relative"
                                >
                                    <div className="w-4 h-0.5 bg-red-300 rotate-45 absolute" />
                                    <div className="w-4 h-0.5 bg-red-300 -rotate-45 absolute" />
                                </button>
                                <motion.div 
                                    initial={{ scaleX: 1 }}
                                    animate={{ scaleX: 0 }}
                                    transition={{ duration: 4, ease: "linear" }}
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Vector */}
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                        "w-full group relative flex items-center justify-center p-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all overflow-hidden shadow-xl shadow-blue-500/10",
                        status === 'loading' 
                            ? "bg-slate-100 text-slate-400 cursor-wait" 
                            : "bg-slate-950 text-white hover:bg-slate-900 active:scale-[0.98]"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    
                    {status === 'loading' ? (
                        <Loader2 className="animate-spin mr-3" size={18} />
                    ) : (
                        <LogIn className="mr-3 transition-transform group-hover:translate-x-1" size={18} />
                    )}
                    
                    {status === 'loading' ? "Synchronizing..." : "Initiate Traversal"}
                </button>

                {/* Secondary Discovery Vectors */}
                <div className="pt-4 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                        Node not registered? <br />
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 transition-colors">Manifest New Identity</Link>
                    </p>
                </div>
            </form>

            <ResetKeyModal 
                isOpen={isResetModalOpen} 
                onClose={() => setIsResetModalOpen(false)} 
            />
        </AuthLayout>
    );
};

export default LoginPage;
