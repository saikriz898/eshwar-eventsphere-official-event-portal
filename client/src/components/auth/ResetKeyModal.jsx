import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2, CheckCircle2, ShieldAlert, KeyRound } from 'lucide-react';
import { cn } from '../../utils/cn';

const ResetKeyModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                onClose();
                // Reset status for next time the modal opens
                setTimeout(() => setStatus('idle'), 500);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        // Mock API Call
        setTimeout(() => {
            if (email.includes('@')) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage('Invalid terminal signature provided.');
            }
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100"
                    >
                        <div className="p-8 sm:p-10">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                            >
                                <X size={20} />
                            </button>

                            {status === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-6 py-4"
                                >
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={40} className="text-emerald-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-950">Transmission Sent</h3>
                                        <p className="text-slate-500 text-sm italic">
                                            A recalibration link has been dispatched to your terminal at <span className="text-slate-950 font-bold">{email}</span>.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-4 bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-slate-500/10"
                                    >
                                        Acknowledge & Close
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <KeyRound size={18} className="text-blue-600" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Recovery Protocol</span>
                                        </div>
                                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-950 leading-tight">Reset Access Key</h3>
                                        <p className="text-slate-500 text-sm italic">Enter your terminal ID to receive a recalibration transmission.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 block pl-11 p-4 transition-all outline-none"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {status === 'error' && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600"
                                            >
                                                <ShieldAlert size={18} />
                                                <p className="text-xs font-bold uppercase tracking-tight italic">{errorMessage}</p>
                                            </motion.div>
                                        )}

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
                                                <Mail className="mr-3 transition-transform group-hover:translate-x-1" size={18} />
                                            )}
                                            
                                            {status === 'loading' ? "Dispatching..." : "Request Reset"}
                                        </button>
                                    </form>
                                    
                                    <div className="pt-2">
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">
                                            Secure transmission protocol: SECE-AUTH-v4
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResetKeyModal;
