import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import seceLogo from '../../../assets/logo/sece-logo-primary.png';

const InternalNavbar = ({ pageTitle = "Page Name" }) => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 h-18 flex items-center px-4 md:px-8">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto relative h-full">

                {/* Left Side: Back Button & Responsive Logo */}
                <div className="flex items-center gap-2 sm:gap-4 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 sm:p-2.5 rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <img
                        src={seceLogo}
                        alt="SECE Logo"
                        className="h-6 sm:h-8 w-auto object-contain cursor-pointer hidden sm:block"
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* Center: Absolutely Centered Page Title */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
                    <h1 className="text-base md:text-xl font-extrabold text-slate-900 tracking-tight truncate pointer-events-auto">
                        {pageTitle}
                    </h1>
                </div>

                {/* Right: Home Link for quick exit */}
                <div className="flex items-center justify-end z-20">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-500/10"
                    >
                        Home Vector
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default InternalNavbar;
