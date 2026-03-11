import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Lock, User, UserPlus, Loader2, ShieldAlert, Eye, EyeOff,
    CheckCircle2, Phone, Calendar, ArrowRight, ArrowLeft, Building2,
    GraduationCap, School, Sparkles, Fingerprint, Zap, Pencil, Search, ChevronDown, Rocket, ShieldCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { cn } from '../../utils/cn';
import { 
    EXTERNAL_COLLEGELIST, 
    EXTERNAL_DEGREES, 
    EXTERNAL_BRANCHES, 
    EXTERNAL_YEARS 
} from '../../data/externalData';

const SECTIONS = ['A', 'B', 'C', 'D', 'E'];

const RegisterPage = () => {
    const navigate = useNavigate();

    // TEMPORAL STATE MACHINE
    const [currentStep, setCurrentStep] = useState(0); // 0: Gateway, 1-9: Protocol
    const [isPhaseShifting, setIsPhaseShifting] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isInternal, setIsInternal] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, processing, success
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [collegeSearch, setCollegeSearch] = useState('');
    const [degreeSearch, setDegreeSearch] = useState('');
    const [branchSearch, setBranchSearch] = useState('');
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [isCollegeOpen, setIsCollegeOpen] = useState(false);
    const [isDegreeOpen, setIsDegreeOpen] = useState(false);
    const [isBranchOpen, setIsBranchOpen] = useState(false);

    // IDENTITY DATA STORE
    const [formData, setFormData] = useState({
        email: '',
        userType: 'external',
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        gender: '',
        mobile: '',
        personalEmail: '',
        rollNo: '',
        admissionYear: '',
        deptCode: '',
        branch: '',
        degree: 'B.E',
        collegeName: '',
        collegeEmail: '',
        academicYear: '',
        section: '',
        password: '',
        confirmPassword: ''
    });

    const [specialId, setSpecialId] = useState('');

    // CHRONOLOGY DETECTOR
    useEffect(() => {
        if (formData.dob) {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData(prev => ({ ...prev, age: age > 0 ? age.toString() : '0' }));
        }
    }, [formData.dob]);

    // TEMPORAL ERROR AUTO-CLEAR
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    // SECE SIGNATURE DETECTION
    const handleEmailVerification = () => {
        const email = formData.email.toLowerCase();
        const internalPattern = /^[a-z]+\.[a-z]\d{4}[a-z]{2,}@sece\.ac\.in$/;
        const externalPattern = /^[a-z0-9._%+-]+@gmail\.com$/;

        if (!email) {
            setErrorMessage('Discovery address required.');
            return;
        }

        const internal = internalPattern.test(email);
        const external = externalPattern.test(email);

        if (!internal && !external) {
            setErrorMessage('Restricted terminal: Only @sece.ac.in (standard student format) or @gmail.com permitted.');
            return;
        }

        setErrorMessage('');
        setIsInternal(internal);
        setFormData(prev => ({
            ...prev,
            userType: internal ? 'internal' : 'external',
            collegeName: internal ? 'Sri Eshwar College of Engineering' : ''
        }));
        triggerPhaseShift(2);
    };

    // ACADEMIC PARSING
    const handleAcademicVerification = () => {
        if (isInternal) {
            if (formData.rollNo.length !== 7) {
                setErrorMessage('Internal signature (Roll No) must be exactly 7 characters.');
                return;
            }
            const yy = formData.rollNo.substring(0, 2);
            const dd = formData.rollNo.substring(2, 4);
            const admissionYear = `20${yy}`;

            const deptMap = {
                'AD': 'Artificial Intelligence & Data Science',
                'CS': 'Computer Science & Engineering',
                'IT': 'Information Technology',
                'EC': 'Electronics & Communication',
                'EE': 'Electrical & Electronics',
                'ME': 'Mechanical Engineering',
                'CB': 'Computer Science & Business Systems'
            };

            const today = new Date();
            const yearOfStudy = (today.getFullYear() - parseInt(admissionYear)) + (today.getMonth() >= 5 ? 1 : 0);

            setFormData(prev => ({
                ...prev,
                admissionYear,
                deptCode: dd,
                branch: deptMap[dd.toUpperCase()] || 'Engineering Sector',
                academicYear: `${yearOfStudy}${['st', 'nd', 'rd', 'th'][yearOfStudy - 1] || 'th'} Year`
            }));
        } else {
            if (!formData.collegeName || !formData.degree || !formData.branch || !formData.academicYear) {
                setErrorMessage('All academic vectors must be defined.');
                return;
            }
        }
        setErrorMessage('');
        triggerPhaseShift(6);
    };

    // IDENTITY GENESIS
    const startGenesis = () => {
        if (!agreed) {
            setErrorMessage('Authorization required to proceed.');
            return;
        }
        setErrorMessage('');
        setStatus('processing');
        setCurrentStep(9);

        setTimeout(() => {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
            const randomId = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
            const portalSignature = isInternal
                ? `USR-SECE-${dateStr}-${randomId}`
                : `USR-EXT-${dateStr}-${randomId}`;

            setSpecialId(portalSignature);
            setStatus('success');
            setTimeout(() => navigate('/login'), 6000);
        }, 4000);
    };

    const validateSecurityAndNext = () => {
        const { score } = getPasswordStrength(formData.password);
        if (score < 4) {
            setErrorMessage('Security criteria not fully satisfied.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Security signatures do not match.');
            return;
        }
        setErrorMessage('');
        nextStep();
    };
    const canProceed = () => {
        switch (currentStep) {
            case 2:
                const age = parseInt(formData.age);
                return formData.firstName && formData.lastName && formData.dob && formData.gender && age >= 17 && age <= 30;
            case 3:
                return formData.mobile.length === 10 && formData.personalEmail;
            case 7:
                const strength = getPasswordStrength(formData.password);
                return strength.score >= 4 && formData.password === formData.confirmPassword;
            default:
                return true;
        }
    };

    const triggerPhaseShift = (targetStep) => {
        setIsPhaseShifting(true);
        setTimeout(() => {
            setCurrentStep(targetStep);
            setIsPhaseShifting(false);
            setErrorMessage('');
        }, 800);
    };

    const nextStep = () => {
        if (currentStep === 2) {
            const age = parseInt(formData.age);
            if (!formData.firstName || !formData.lastName || !formData.dob || !formData.gender) {
                setErrorMessage('All mandatory identity fields must be filled.');
                return;
            }
            if (age < 17 || age > 30) {
                setErrorMessage('Age restriction: Node must be between 17 and 30 cycles.');
                return;
            }
        } else if (!canProceed()) {
            setErrorMessage('All mandatory protocol fields must be filled.');
            return;
        }
        setErrorMessage('');
        triggerPhaseShift(currentStep + 1);
    };
    const prevStep = () => triggerPhaseShift(currentStep - 1);

    // SECURITY ENTROPY CALCULATOR
    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, label: 'Insecure', color: 'bg-slate-200', reqs: { length: false, upper: false, number: false, special: false } };
        const reqs = {
            length: pass.length >= 6,
            upper: /[A-Z]/.test(pass),
            number: /[0-9]/.test(pass),
            special: /[^A-Za-z0-9]/.test(pass)
        };
        const score = Object.values(reqs).filter(Boolean).length;

        if (score === 0) return { score, label: 'Critical', color: 'bg-red-500', reqs };
        if (score === 1) return { score, label: 'Weak', color: 'bg-orange-500', reqs };
        if (score === 2) return { score, label: 'Fair', color: 'bg-yellow-500', reqs };
        if (score === 3) return { score, label: 'Good', color: 'bg-blue-500', reqs };
        return { score, label: 'Elite', color: 'bg-emerald-500', reqs };
    };

    // --- STEP RENDERING LOGIC ---
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5 px-1 pt-1 pb-3">
                        <div className="text-center space-y-1.5">
                            <div className="relative w-20 h-20 mx-auto mb-4">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[2px] border-dashed border-blue-500/10 rounded-full scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-[28px] rotate-12" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white border border-slate-100 rounded-[28px] shadow-sm relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <Sparkles size={32} className="text-blue-600 relative z-10" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter italic leading-tight">Join EventSphere</h3>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] opacity-50">Initiate identity discovery</p>
                        </div>

                        <div className="space-y-3 pt-1">
                            <button className="w-full h-13 bg-white border border-slate-200 text-slate-900 rounded-[18px] flex items-center px-4 gap-3 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group active:scale-[0.98]">
                                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-800">Continue with Google</p>
                                    <p className="text-[7px] text-blue-600 font-bold uppercase tracking-widest opacity-60">Synchronized Entry</p>
                                </div>
                                <ArrowRight size={12} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </button>

                            <div className="relative flex items-center justify-center py-1">
                                <div className="absolute inset-0 flex items-center px-8"><div className="w-full border-t border-slate-100"></div></div>
                                <span className="relative z-10 bg-white px-3 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Standard Terminal</span>
                            </div>

                            <button onClick={nextStep} className="w-full h-13 bg-slate-950 text-white rounded-[18px] flex items-center px-4 gap-3 hover:shadow-2xl hover:shadow-slate-950/20 transition-all duration-300 group active:scale-[0.98]">
                                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all">
                                    <Mail size={16} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-white">Continue with Email</p>
                                    <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">Manual traversal</p>
                                </div>
                                <ArrowRight size={12} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        <div className="pt-4 flex flex-col items-center gap-3">
                            <div className="px-5 py-1.5 bg-slate-50/50 border border-slate-100 rounded-full flex items-center gap-2">
                                <ShieldCheck size={8} className="text-emerald-500" />
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Encrypted Traversal active</span>
                            </div>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.form 
                        key="s1" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }} 
                        className="space-y-6"
                        onSubmit={(e) => { e.preventDefault(); handleEmailVerification(); }}
                    >
                        <div className="text-center space-y-1.5">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Verify Terminal</h3>
                            <p className="text-[11px] text-slate-500 font-medium tracking-tight">Enter your primary discovery address</p>
                        </div>
                        <div className="space-y-3">
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={16} className="text-slate-400 group-focus-within:text-blue-600" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="identity@gmail.com"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-[20px] p-4 pl-11 outline-none focus:border-blue-600 transition-all font-medium"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value.toLowerCase() });
                                        setErrorMessage('');
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setCurrentStep(0)} className="h-14 px-6 bg-slate-100 text-slate-500 rounded-[20px] hover:bg-slate-200 transition-colors flex items-center justify-center"><ArrowLeft size={16} /></button>
                            <button type="submit" className="flex-1 h-14 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[20px] shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                                Proceed <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.form>
                );
            case 2:
                return (
                    <motion.form 
                        key="s2" 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }} 
                        className="space-y-4"
                        onSubmit={(e) => { e.preventDefault(); nextStep(); }}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">First Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 text-slate-900 text-sm font-bold rounded-2xl p-4 border border-slate-200 outline-none focus:border-blue-500 transition-colors"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 text-slate-900 text-sm font-bold rounded-2xl p-4 border border-slate-200 outline-none focus:border-blue-500 transition-colors"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Chronology</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl p-3 border border-slate-200 outline-none"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender Vector</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Male', 'Female'].map((gender) => (
                                        <button
                                            key={gender}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, gender })}
                                            className={cn(
                                                "p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                                                formData.gender === gender
                                                    ? "bg-slate-950 text-white border-slate-950 shadow-lg shadow-slate-950/20"
                                                    : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-blue-600 rounded-2xl text-white flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-2.5">
                                <Calendar size={16} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Age Detector (17-30 Cycles)</span>
                            </div>
                            <span className="text-2xl font-black italic">{formData.age || '--'} <span className="text-[9px] not-italic opacity-50">Yrs</span></span>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            {/* ERROR_MARKER_REPLACED */}
                            <div className="flex gap-3">
                                <button type="button" onClick={prevStep} className="p-3.5 bg-slate-100 text-slate-500 rounded-xl"><ArrowLeft size={16} /></button>
                                <button type="submit" className="flex-1 p-3.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl">Next Phase</button>
                            </div>
                        </div>
                    </motion.form>
                );
            case 3:
                return (
                    <motion.form 
                        key="s3" 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }} 
                        className="space-y-6"
                        onSubmit={(e) => { e.preventDefault(); nextStep(); }}
                    >
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Signal Vector (10 Digits)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20">
                                    <Phone size={16} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-[24px] focus-within:border-blue-600 transition-all overflow-hidden group">
                                    <span className="pl-12 pr-4 text-xs font-black text-slate-500 tracking-tighter border-r border-slate-200 bg-slate-100/50 h-[52px] flex items-center">+91</span>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        placeholder="XXXXXXXXXX"
                                        className="w-full bg-transparent text-slate-900 text-sm p-4 pl-4 outline-none font-bold tracking-[0.2em]"
                                        value={formData.mobile}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').substring(0, 10);
                                            setFormData({ ...formData, mobile: val });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Personal Node (Username)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20">
                                    <Mail size={16} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-[24px] focus-within:border-blue-600 transition-all overflow-hidden group">
                                    <input
                                        type="text"
                                        placeholder="identity"
                                        className="w-full bg-transparent text-slate-900 text-sm p-4 pl-12 outline-none font-bold"
                                        value={formData.personalEmail}
                                        onChange={(e) => {
                                            // Strictly remove everything from @ and spaces
                                            const val = e.target.value.toLowerCase().split('@')[0].replace(/[^a-z0-9._]/g, '');
                                            setFormData({ ...formData, personalEmail: val });
                                        }}
                                    />
                                    <span className="pr-6 text-[11px] font-black text-blue-600/40 uppercase tracking-tighter bg-white/50 h-[52px] flex items-center px-4 border-l border-slate-100">@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex gap-3">
                                <button type="button" onClick={prevStep} className="p-4 bg-slate-100 text-slate-500 rounded-2xl transition-colors"><ArrowLeft size={16} /></button>
                                <button type="submit" className="flex-1 p-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl">Confirm Vectors</button>
                            </div>
                        </div>
                    </motion.form>
                );
            case 4:
                return (
                    <motion.form 
                        key="s4" 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.98 }} 
                        className="space-y-5"
                        onSubmit={(e) => { e.preventDefault(); nextStep(); }}
                    >
                        <div className="p-7 bg-white border border-slate-100 rounded-[35px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] space-y-5 relative overflow-hidden">
                            <div className="absolute top-6 right-8 opacity-20">
                                <Fingerprint size={32} className="text-slate-400" />
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">Review Protocol</p>
                                <h4 className="text-xl font-black italic text-slate-950 uppercase tracking-tight">
                                    {formData.firstName} {formData.lastName}
                                </h4>
                            </div>

                            <div className="pt-4 border-t border-slate-50 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Personal Anchor</p>
                                    <p className="text-sm font-black text-slate-900 italic break-all">{formData.personalEmail}<span className="text-blue-600">@gmail.com</span></p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50/50">
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Chronology</p>
                                        <p className="text-[11px] font-black italic text-slate-900">{formData.dob || 'TBD'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Gender</p>
                                        <p className="text-[11px] font-black italic text-slate-900">{formData.gender || 'TBD'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Signal</p>
                                        <p className="text-[11px] font-black italic text-slate-900">+91 {formData.mobile || '---'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-1">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                className="h-14 px-7 bg-slate-50 border border-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2"
                            >
                                <Pencil size={12} className="text-orange-500" />
                                Edit
                            </button>
                            <button
                                type="submit"
                                className="flex-1 h-14 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Save & Next <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.form>
                );
            case 5:
                return (
                    <motion.form 
                        key="s5" 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }} 
                        className="space-y-5"
                        onSubmit={(e) => { e.preventDefault(); handleAcademicVerification(); }}
                    >
                        {isInternal ? (
                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Internal Signature (Roll No)</label>
                                    <input
                                        type="text"
                                        maxLength={7}
                                        placeholder="YYDDNNN"
                                        className="w-full bg-slate-50 text-slate-900 text-sm font-black rounded-[20px] p-4 border border-slate-200 tracking-[0.5em] outline-none"
                                        value={formData.rollNo}
                                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                {formData.rollNo.length === 7 && (
                                    <>
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 rounded-[24px] border border-emerald-100/50">
                                            <p className="text-[10px] font-black text-emerald-950 italic text-center">
                                                {formData.rollNo.substring(2, 4)} Node · 20{formData.rollNo.substring(0, 2)} Cycle
                                            </p>
                                        </motion.div>
                                        
                                        <div className="space-y-1 mt-2">
                                            <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Section Assignment</label>
                                            <div className="relative">
                                                <div 
                                                    onClick={() => setIsSectionOpen(!isSectionOpen)}
                                                    className="w-full bg-slate-50 text-slate-900 text-[11px] rounded-2xl p-4 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all font-mono"
                                                >
                                                    <span className={formData.section ? "text-slate-900" : "text-slate-400"}>
                                                        {formData.section || "Select Section"}
                                                    </span>
                                                    <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isSectionOpen && "rotate-180")} />
                                                </div>

                                                <AnimatePresence>
                                                    {isSectionOpen && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            className="absolute z-[100] w-full bg-white border border-slate-200 rounded-2xl shadow-2xl mt-2 overflow-hidden"
                                                        >
                                                            <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                                {SECTIONS.map((sec) => (
                                                                    <div 
                                                                        key={sec}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setFormData({ ...formData, section: sec });
                                                                            setIsSectionOpen(false);
                                                                        }}
                                                                        className="px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all"
                                                                    >
                                                                        Section {sec}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Institution Name</label>
                                    <div className="relative">
                                        <div 
                                            onClick={() => setIsCollegeOpen(!isCollegeOpen)}
                                            className="w-full bg-slate-50 text-slate-900 text-sm rounded-[24px] p-4 pl-12 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all"
                                        >
                                            <span className={formData.collegeName ? "text-slate-900" : "text-slate-400"}>
                                                {formData.collegeName || "Select Peer Institution"}
                                            </span>
                                            <ChevronDown size={16} className={cn("text-slate-400 transition-transform duration-300", isCollegeOpen && "rotate-180")} />
                                        </div>
                                        <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        
                                        <AnimatePresence>
                                            {isCollegeOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    className="absolute z-[100] w-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-2xl shadow-blue-500/10 overflow-hidden"
                                                >
                                                    <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                                                        <div className="relative">
                                                            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                            <input 
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Search technical node..."
                                                                className="w-full bg-white border border-slate-100 rounded-xl p-2 pl-9 text-[11px] font-bold outline-none focus:border-blue-600 transition-all"
                                                                value={collegeSearch}
                                                                onChange={(e) => setCollegeSearch(e.target.value)}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                        {EXTERNAL_COLLEGELIST.filter(c => c.toLowerCase().includes(collegeSearch.toLowerCase())).length > 0 ? (
                                                            EXTERNAL_COLLEGELIST.filter(c => c.toLowerCase().includes(collegeSearch.toLowerCase())).map((college) => (
                                                                <div 
                                                                    key={college}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, collegeName: college });
                                                                        setIsCollegeOpen(false);
                                                                        setCollegeSearch('');
                                                                    }}
                                                                    className="px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors flex items-center justify-between group"
                                                                >
                                                                    {college}
                                                                    <ArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-6 text-center">
                                                                <p className="text-[10px] font-black text-slate-400 uppercase italic">No peers found</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Degree</label>
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setIsDegreeOpen(!isDegreeOpen);
                                                    setIsCollegeOpen(false);
                                                    setIsBranchOpen(false);
                                                }}
                                                className="w-full bg-slate-50 text-slate-900 text-[11px] rounded-2xl p-4 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all"
                                            >
                                                <span className={formData.degree ? "text-slate-900" : "text-slate-400"}>
                                                    {formData.degree || "Select Degree"}
                                                </span>
                                                <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isDegreeOpen && "rotate-180")} />
                                            </div>

                                            <AnimatePresence>
                                                {isDegreeOpen && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 10, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        className="absolute z-[100] w-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[20px] shadow-2xl shadow-blue-500/10 overflow-hidden"
                                                    >
                                                        <div className="p-2 border-b border-slate-50 bg-slate-50/20">
                                                            <div className="relative">
                                                                <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <input 
                                                                    autoFocus
                                                                    type="text"
                                                                    placeholder="Search degree..."
                                                                    className="w-full bg-white border border-slate-100 rounded-lg p-1.5 pl-8 text-[10px] font-bold outline-none focus:border-blue-600 transition-all"
                                                                    value={degreeSearch}
                                                                    onChange={(e) => setDegreeSearch(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                            {EXTERNAL_DEGREES.filter(d => d.toLowerCase().includes(degreeSearch.toLowerCase())).map((deg) => (
                                                                <div 
                                                                    key={deg}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, degree: deg });
                                                                        setIsDegreeOpen(false);
                                                                        setDegreeSearch('');
                                                                    }}
                                                                    className="px-4 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors flex items-center justify-between group"
                                                                >
                                                                    {deg}
                                                                    <ArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Branch</label>
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setIsBranchOpen(!isBranchOpen);
                                                    setIsCollegeOpen(false);
                                                    setIsDegreeOpen(false);
                                                }}
                                                className="w-full bg-slate-50 text-slate-900 text-[11px] rounded-2xl p-4 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all"
                                            >
                                                <span className={formData.branch ? "text-slate-900" : "text-slate-400"}>
                                                    {formData.branch ? (formData.branch.length > 20 ? formData.branch.substring(0, 18) + ".." : formData.branch) : "Select Branch"}
                                                </span>
                                                <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isBranchOpen && "rotate-180")} />
                                            </div>

                                            <AnimatePresence>
                                                {isBranchOpen && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 10, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        className="absolute z-[100] w-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[20px] shadow-2xl shadow-blue-500/10 overflow-hidden"
                                                    >
                                                        <div className="p-2 border-b border-slate-50 bg-slate-50/20">
                                                            <div className="relative">
                                                                <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <input 
                                                                    autoFocus
                                                                    type="text"
                                                                    placeholder="Search branch..."
                                                                    className="w-full bg-white border border-slate-100 rounded-lg p-1.5 pl-8 text-[10px] font-bold outline-none focus:border-blue-600 transition-all"
                                                                    value={branchSearch}
                                                                    onChange={(e) => setBranchSearch(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                            {EXTERNAL_BRANCHES.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase())).map((branch) => (
                                                                <div 
                                                                    key={branch}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, branch: branch });
                                                                        setIsBranchOpen(false);
                                                                        setBranchSearch('');
                                                                    }}
                                                                    className="px-4 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors flex items-center justify-between group"
                                                                >
                                                                    <span className="truncate pr-4">{branch}</span>
                                                                    <ArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Year</label>
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setIsYearOpen(!isYearOpen);
                                                    setIsCollegeOpen(false);
                                                    setIsDegreeOpen(false);
                                                    setIsBranchOpen(false);
                                                    setIsSectionOpen(false);
                                                }}
                                                className="w-full bg-slate-50 text-slate-900 text-[11px] rounded-2xl p-4 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all font-mono"
                                            >
                                                <span className={formData.academicYear ? "text-slate-900" : "text-slate-400"}>
                                                    {formData.academicYear || "Select Year"}
                                                </span>
                                                <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isYearOpen && "rotate-180")} />
                                            </div>

                                            <AnimatePresence>
                                                {isYearOpen && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="absolute z-[100] w-full bg-white border border-slate-200 rounded-2xl shadow-2xl mt-2 overflow-hidden"
                                                    >
                                                        <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                            {EXTERNAL_YEARS.map((year) => (
                                                                <div 
                                                                    key={year}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, academicYear: year });
                                                                        setIsYearOpen(false);
                                                                    }}
                                                                    className="px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                                                >
                                                                    Year {year}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Section</label>
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setIsSectionOpen(!isSectionOpen);
                                                    setIsCollegeOpen(false);
                                                    setIsDegreeOpen(false);
                                                    setIsBranchOpen(false);
                                                    setIsYearOpen(false);
                                                }}
                                                className="w-full bg-slate-50 text-slate-900 text-[11px] rounded-2xl p-4 pr-10 border border-slate-200 outline-none cursor-pointer flex items-center justify-between font-bold hover:border-blue-600 transition-all font-mono"
                                            >
                                                <span className={formData.section ? "text-slate-900" : "text-slate-400"}>
                                                    {formData.section || "Select Section"}
                                                </span>
                                                <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isSectionOpen && "rotate-180")} />
                                            </div>

                                            <AnimatePresence>
                                                {isSectionOpen && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="absolute z-[100] w-full bg-white border border-slate-200 rounded-2xl shadow-2xl mt-2 overflow-hidden"
                                                    >
                                                        <div className="max-h-48 overflow-y-auto custom-scrollbar py-1 overscroll-contain touch-pan-y">
                                                            {SECTIONS.map((sec) => (
                                                                <div 
                                                                    key={sec}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, section: sec });
                                                                        setIsSectionOpen(false);
                                                                    }}
                                                                    className="px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                                                >
                                                                    Section {sec}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-1 flex justify-between">
                                        Institutional Email <span className="opacity-50 italic">Optional</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your@college.edu"
                                        className="w-full bg-slate-50 text-xs rounded-2xl p-4 border border-slate-200 outline-none focus:border-blue-600 font-bold"
                                        value={formData.collegeEmail}
                                        onChange={(e) => setFormData({ ...formData, collegeEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex gap-3">
                                <button type="button" onClick={prevStep} className="p-3.5 bg-slate-100 text-slate-500 rounded-xl"><ArrowLeft size={16} /></button>
                                <button type="submit" className="flex-1 p-3.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl shadow-lg">Complete Sync</button>
                            </div>
                        </div>
                    </motion.form>
                );
            case 6:
                return (
                    <motion.form 
                        key="s6" 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.98 }} 
                        className="space-y-4"
                        onSubmit={(e) => { e.preventDefault(); nextStep(); }}
                    >
                        <div className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-xl space-y-4 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest">Institutional Verification</p>
                                    <h4 className="text-xl font-black italic text-slate-950 uppercase leading-tight">Academic Profile Confirmation</h4>
                                </div>
                                <GraduationCap size={24} className="text-slate-200" />
                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-50">
                                <div>
                                    <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5">Base Institution</p>
                                    <p className="text-[11px] font-bold text-slate-900 italic uppercase italic">{formData.collegeName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5">Department Node</p>
                                        <p className="text-[11px] font-bold text-slate-900">{formData.branch}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5">Roll Identifier</p>
                                        <p className="text-[11px] font-bold text-slate-900">{formData.rollNo || 'EXTERNAL'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50">
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5">Academic Cycle</p>
                                        <p className="text-[11px] font-bold text-slate-900">Year {formData.academicYear || 'TBD'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5">Section Node</p>
                                        <p className="text-[11px] font-bold text-slate-900">Section {formData.section || 'TBD'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(5)}
                                className="h-14 px-7 bg-slate-50 border border-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2"
                            >
                                <Pencil size={12} className="text-orange-500" />
                                Edit
                            </button>
                            <button
                                type="submit"
                                className="flex-1 h-14 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[20px] shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Save & Next <ArrowRight size={14} />
                            </button>
                        </div>


                    </motion.form>
                );
            case 7:
                return (
                    <motion.form 
                        key="s7" 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }} 
                        className="space-y-6"
                        onSubmit={(e) => { e.preventDefault(); validateSecurityAndNext(); }}
                    >
                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Set Access Key"
                                    className="w-full bg-slate-50 text-slate-900 text-sm rounded-[24px] p-5 pl-14 border border-slate-200 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold tracking-wider"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* STRENGTH INDICATOR */}
                            {formData.password && (
                                <div className="px-2 space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Momentum</span>
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest italic",
                                            getPasswordStrength(formData.password).score <= 1 ? "text-orange-500" :
                                                getPasswordStrength(formData.password).score <= 2 ? "text-yellow-600" :
                                                    getPasswordStrength(formData.password).score <= 3 ? "text-blue-600" : "text-emerald-600"
                                        )}>
                                            {getPasswordStrength(formData.password).label}
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5 h-1.5 px-0.5">
                                        {[1, 2, 3, 4].map((step) => (
                                            <div
                                                key={step}
                                                className={cn(
                                                    "flex-1 rounded-full transition-all duration-500",
                                                    step <= getPasswordStrength(formData.password).score
                                                        ? getPasswordStrength(formData.password).color
                                                        : "bg-slate-100"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                                        {[
                                            { key: 'length', label: '6+ Characters' },
                                            { key: 'upper', label: 'Uppercase Vector' },
                                            { key: 'number', label: 'Numerical Signal' },
                                            { key: 'special', label: 'Symbol Component' }
                                        ].map(req => (
                                            <div key={req.key} className="flex items-center gap-2">
                                                <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors border",
                                                    getPasswordStrength(formData.password).reqs[req.key]
                                                        ? "bg-emerald-500 border-emerald-500"
                                                        : "bg-white border-slate-200"
                                                )}>
                                                    {getPasswordStrength(formData.password).reqs[req.key] && <Zap size={8} className="text-white" fill="currentColor" />}
                                                </div>
                                                <span className={cn("text-[9px] font-bold uppercase tracking-wider transition-colors",
                                                    getPasswordStrength(formData.password).reqs[req.key] ? "text-emerald-600" : "text-slate-400"
                                                )}>{req.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="group relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Verify Access Key"
                                    className="w-full bg-slate-50 text-slate-900 text-sm rounded-[24px] p-5 pl-14 border border-slate-200 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold tracking-wider"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                <ShieldAlert size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-slate-50 mt-4">
                            <button type="button" onClick={prevStep} className="h-14 px-7 bg-slate-50 border border-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2">
                                <ArrowLeft size={16} />
                            </button>
                            <button
                                type="submit"
                                className="flex-1 h-14 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[20px] shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Save & Next <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.form>
                );
            case 8:
                return (
                    <motion.form 
                        key="s8" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }} 
                        className="space-y-3"
                        onSubmit={(e) => { e.preventDefault(); startGenesis(); }}
                    >
                        <div className="flex justify-between items-end px-1">
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em]">Phase 08 · Review</p>
                                <h4 className="text-xl font-black italic text-slate-950 uppercase tracking-tighter leading-none">Identity Confirmation</h4>
                                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest opacity-60 leading-tight">Authorize final sync protocol</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm">
                                <Fingerprint size={20} className="text-blue-600" />
                            </div>
                        </div>

                        <div className="p-4 bg-[#fcf9f4] border border-[#f5efde] rounded-[24px] space-y-3.5 relative shadow-sm">
                            <div className="flex items-center gap-2 text-[8px] font-black text-[#5c5447] uppercase tracking-widest bg-[#f7f0e0]/50 w-max px-2.5 py-1 rounded-md border border-[#ede3c9]">
                                📋 Manifest Overview
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Name:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic truncate max-w-[120px]">{formData.firstName} {formData.lastName}</span>
                                            </div>
                                            <div className="flex items-center gap-1 border-l border-[#f3ecda] pl-3">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">DOB:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic">{formData.dob}</span>
                                            </div>
                                            <div className="flex items-center gap-1 border-l border-[#f3ecda] pl-3">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Phone:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic">+91 {formData.mobile}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setCurrentStep(2)} className="h-7 px-2.5 bg-white border border-[#ede3c9] text-blue-600 text-[8px] font-black uppercase rounded-lg hover:shadow-md transition-all flex items-center gap-1.5 shadow-sm">
                                        <Pencil size={8} /> EDIT
                                    </button>
                                </div>

                                <div className="h-px bg-[#f3ecda]" />

                                <div className="flex justify-between items-start">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Dept:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic">{formData.deptCode || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 border-l border-[#f3ecda] pl-3">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Year:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic">{formData.academicYear || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 border-l border-[#f3ecda] pl-3">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Roll:</span>
                                                <span className="text-[10px] font-black text-slate-900 uppercase italic">{formData.rollNo || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setCurrentStep(5)} className="h-7 px-2.5 bg-white border border-[#ede3c9] text-blue-600 text-[8px] font-black uppercase rounded-lg hover:shadow-md transition-all flex items-center gap-1.5 shadow-sm">
                                        <Pencil size={8} /> EDIT
                                    </button>
                                </div>

                                <div className="h-px bg-[#f3ecda]" />

                                <div className="flex justify-between items-center bg-[#f7f0e0]/30 p-2.5 rounded-2xl border border-[#ede3c9]/50">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-black text-slate-700 font-mono tracking-tighter">{formData.personalEmail}@gmail.com</p>
                                        {formData.collegeEmail && <p className="text-[8px] text-[#8b7e6a] font-bold uppercase opacity-60">Auth: {formData.collegeEmail}</p>}
                                    </div>
                                    <div className={cn(
                                        "text-[8px] font-black uppercase px-3 py-1 rounded-full border shadow-sm",
                                        isInternal ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-blue-700 bg-blue-50 border-blue-100"
                                    )}>
                                        {isInternal ? 'Portal·SECE' : 'Portal·External'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50/50 rounded-xl border border-slate-100">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer shadow-sm transition-all"
                            />
                            <label htmlFor="terms" className="text-[9px] font-black text-slate-600 cursor-pointer hover:text-slate-900 transition-colors uppercase tracking-tight">
                                I verify all identity manifests are correct
                            </label>
                        </div>



                        <div className="pt-0.5">
                            <button
                                type="submit"
                                className="w-full h-12 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Rocket size={14} />
                                Initialize Account
                            </button>
                        </div>
                    </motion.form>
                );
            case 9:
                return (
                    <motion.div key="s9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                        {status === 'processing' ? (
                            <div className="space-y-8 py-8 px-4">
                                <div className="relative w-40 h-40 mx-auto">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-600/30 rounded-full" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles size={48} className="text-blue-600 animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Genesis Node Active</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Propagating Identity Signature</p>
                                </div>
                            </div>
                        ) : (
                            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-8">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-xl shadow-emerald-500/10">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">Account Created</p>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Account Created → Redirect to Login</h3>
                                </div>
                                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isInternal ? 'Internal ID:' : 'External ID:'}</span>
                                        <span className={cn(
                                            "text-[10px] font-black px-3 py-1.5 rounded-full font-mono",
                                            isInternal ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-blue-600 bg-blue-50 border border-blue-100"
                                        )}>{specialId}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Traversing to Terminal...</p>
                                    <div className="w-40 h-[2px] bg-slate-100 mx-auto rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6 }} className="h-full bg-blue-600" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout
            title={currentStep === 9 ? "Sync Complete" : "Manifest Identity"}
            subtitle={`Phase 0${currentStep} · Identity Discovery`}
        >
            <style>
                {`
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #94a3b8 transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                        display: block !important;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #94a3b8;
                        border-radius: 10px;
                        border: 1px solid transparent;
                        background-clip: content-box;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #64748b;
                    }
                    .custom-scrollbar {
                        overflow-y: auto !important;
                    }
                `}
            </style>
            <div className="max-w-sm mx-auto">
                {/* COMPACT PROGRESS */}
                {currentStep > 0 && currentStep < 9 && (
                    <div className="mb-2 flex gap-1.5 justify-center">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                i + 1 === currentStep ? "w-8 bg-blue-600 shadow-[0_0_8px_#2563eb55]" : "w-1.5 bg-slate-100",
                                i + 1 < currentStep ? "bg-slate-950" : ""
                            )} />
                        ))}
                    </div>
                )}

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
                                    <p className="text-[10px] font-black uppercase text-red-600 tracking-widest leading-none mb-1">Protocol Restriction</p>
                                    <p className="text-[11px] font-bold text-slate-900 leading-tight">{errorMessage}</p>
                                </div>
                                <button 
                                    onClick={() => setErrorMessage('')}
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

                <AnimatePresence mode="wait">
                    {isPhaseShifting ? (
                        <motion.div
                            key="phase-shift-loader"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center justify-center py-24 space-y-6"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-[3px] border-blue-600/5 border-t-blue-600 rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm animate-pulse">
                                        <Sparkles size={20} className="text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                                </div>
                                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 italic">Recalibrating</h4>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Synchronizing Identity Protocol</p>
                            </div>
                        </motion.div>
                    ) : (
                        renderStep()
                    )}
                </AnimatePresence>

                {currentStep < 9 && (
                    <div className="mt-2 text-center pb-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Already Manifested? <Link to="/login" className="text-blue-600 ml-1 border-b border-blue-600/30 transition-colors hover:text-blue-700 hover:border-blue-600 uppercase">Login</Link>
                        </p>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
