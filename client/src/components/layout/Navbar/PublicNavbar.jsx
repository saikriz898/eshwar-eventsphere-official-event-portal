import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    CalendarDays,
    Calendar,
    Compass,
    Image as ImageIcon,
    Map as MapIcon,
    ChevronDown,
    LogIn,
    UserPlus,
    Menu,
    X,
    Sparkles,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import seceLogo from '../../../assets/logo/sece-logo-primary.png';

const PublicNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Discover', path: '/', icon: Home },
        { name: 'Events', path: '/events', icon: CalendarDays },
        { name: 'Schedule', path: '/calendar', icon: Calendar },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <div className="w-full px-4 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-22">

                    {/* Left: Logo */}
                    <div className="flex-1 flex justify-start">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img
                                src={seceLogo}
                                alt="SECE Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Desktop Links */}
                    <div className="hidden lg:flex flex-none items-center space-x-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.hash === link.path || (location.hash === '' && link.path === '#home') || (link.path.startsWith('/') && location.pathname === link.path);

                            const isScrollLink = link.path.startsWith('#');
                            const LinkComponent = isScrollLink ? 'a' : Link;
                            const linkProps = isScrollLink ? { href: link.path } : { to: link.path };

                            return (
                                <LinkComponent
                                    key={link.path}
                                    {...linkProps}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-slate-500 hover:text-indigo-600'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.name}</span>
                                </LinkComponent>
                            );
                        })}

                        <div className="relative group/explore">
                            <button
                                onMouseEnter={() => setIsExploreOpen(true)}
                                onMouseLeave={() => setIsExploreOpen(false)}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                            >
                                <Compass className="w-4 h-4" />
                                <span>Explore</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isExploreOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        onMouseEnter={() => setIsExploreOpen(true)}
                                        onMouseLeave={() => setIsExploreOpen(false)}
                                        className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 origin-top z-[110]"
                                    >
                                        <Link
                                            to="/gallery"
                                            className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all font-bold text-sm"
                                        >
                                            <ImageIcon className="w-4 h-4 opacity-70" />
                                            <span>Gallery</span>
                                        </Link>
                                        <Link
                                            to="/map"
                                            className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all font-bold text-sm"
                                        >
                                            <MapIcon className="w-4 h-4 opacity-70" />
                                            <span>Event Map</span>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Desktop Auth Buttons */}
                    <div className="flex-1 flex justify-end">
                        <div className="hidden lg:flex items-center gap-3">


                            <Link
                                to="/login"
                                className="flex items-center gap-2.5 px-5 py-2.5 text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                    <LogIn className="w-4 h-4" />
                                </div>
                                <span>Sign In</span>
                            </Link>

                            <Link
                                to="/register"
                                className="h-12 flex items-center justify-center px-7 rounded-xl bg-slate-900 text-white text-sm font-bold transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
                            >
                                <div className="flex items-center gap-2">
                                    <span>Get Started</span>
                                    <UserPlus className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-3 rounded-xl bg-slate-100 text-slate-900 border border-slate-200/50 hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 pt-4 pb-12 space-y-1">
                            {[
                                ...navLinks,
                                { name: 'Gallery', path: '/gallery', icon: ImageIcon },
                                { name: 'Event Map', path: '/map', icon: MapIcon },
                            ].map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path || location.hash === link.path;
                                const isScrollLink = link.path.startsWith('#');
                                const LinkComponent = isScrollLink ? 'a' : Link;
                                const linkProps = isScrollLink ? { href: link.path } : { to: link.path };

                                return (
                                    <LinkComponent
                                        key={link.path}
                                        {...linkProps}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                                        </div>
                                        <span className={`text-[15px] font-black uppercase tracking-wider ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>
                                            {link.name}
                                        </span>
                                    </LinkComponent>
                                );
                            })}

                            <div className="mt-8 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mb-4">Account Access</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all text-[11px] uppercase tracking-[0.2em] border border-slate-200/50"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center py-4 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all text-[11px] uppercase tracking-[0.2em]"
                                    >
                                        Join Now
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default PublicNavbar;
