import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    ArrowRight,
    Sparkles,
    LayoutGrid,
    Info,
    Inbox,
    Zap,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/Navbar/PublicNavbar';
import PublicPreloader from '../../components/common/Preloader/PublicPreloader';
import { cn } from '../../utils/cn';

// Mock Events Data for Schedule
const scheduleEvents = [];

const SchedulePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Calendar Helper Functions
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const getEventsForDate = (date) => {
        return scheduleEvents.filter(event => isSameDay(event.date, date));
    };

    const selectedEvents = getEventsForDate(selectedDate);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
                >
                    <PublicPreloader />
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-h-screen w-full bg-[#fafbfc] overflow-y-auto lg:overflow-hidden flex flex-col relative text-slate-900 selection:bg-indigo-500/10 lg:h-screen"
                >
                    {/* AMBIENT BACKGROUND */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00a_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <PublicNavbar />

                    <main className="relative z-10 flex-1 flex flex-col lg:flex-row lg:overflow-hidden pt-20">

                        {/* LEFT: MINI CALENDAR PANEL */}
                        <div className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col bg-white shrink-0 lg:h-full">
                            <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 lg:overflow-y-auto custom-scrollbar">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        <Sparkles size={12} className="animate-pulse" />
                                        <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[.3em]">Temporal Grid</span>
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl font-black italic uppercase tracking-tight text-slate-950">
                                        Chronos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Sync</span>
                                    </h2>
                                </div>

                                {/* CALENDAR MODULE */}
                                <div className="bg-slate-50/50 rounded-[28px] lg:rounded-[32px] p-4 sm:p-6 border border-slate-100/50 shadow-sm">
                                    <div className="flex items-center justify-between mb-6 lg:mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Timeline</span>
                                            <span className="text-base lg:text-lg font-black italic uppercase text-slate-900">{monthName} {currentDate.getFullYear()}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={prevMonth} className="p-2 lg:p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 shadow-sm">
                                                <ChevronLeft size={14} />
                                            </button>
                                            <button onClick={nextMonth} className="p-2 lg:p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 shadow-sm">
                                                <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* GRID */}
                                    <div className="grid grid-cols-7 gap-1 lg:gap-1.5 text-center mb-4">
                                        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
                                            <span key={day} className="text-[8px] lg:text-[9px] font-black text-slate-300 uppercase tracking-widest py-1 lg:py-2">{day}</span>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {[...Array(firstDayOfMonth)].map((_, i) => (
                                            <div key={`empty-${i}`} className="aspect-square" />
                                        ))}
                                        {[...Array(daysInMonth)].map((_, i) => {
                                            const day = i + 1;
                                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                            const isSelected = isSameDay(date, selectedDate);
                                            const hasEvents = getEventsForDate(date).length > 0;
                                            const isToday = isSameDay(date, new Date());

                                            return (
                                                <motion.button
                                                    key={day}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setSelectedDate(date)}
                                                    onHoverStart={() => setHoveredDate(date)}
                                                    onHoverEnd={() => setHoveredDate(null)}
                                                    className={cn(
                                                        "aspect-square rounded-lg lg:rounded-xl text-[10px] lg:text-xs font-black flex flex-col items-center justify-center relative transition-all duration-300",
                                                        isSelected
                                                            ? "bg-slate-950 text-white shadow-xl shadow-indigo-500/10"
                                                            : "hover:bg-indigo-50 text-slate-600",
                                                        isToday && !isSelected && "border border-indigo-200 text-indigo-600"
                                                    )}
                                                >
                                                    <span>{day}</span>
                                                    {hasEvents && (
                                                        <div className={cn(
                                                            "absolute bottom-1.5 lg:bottom-2 w-0.5 lg:w-1 h-0.5 lg:h-1 rounded-full",
                                                            isSelected ? "bg-indigo-400" : "bg-indigo-600 animate-pulse"
                                                        )} />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* LEGEND / STATUS */}
                                <div className="hidden sm:block space-y-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Status</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[8px] font-bold text-slate-950 uppercase italic">Linked Live</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-slate-50 p-3 lg:p-4 rounded-2xl border border-slate-100 flex flex-col gap-0.5">
                                            <span className="text-[16px] lg:text-[20px] font-black text-slate-950 italic leading-tight">32</span>
                                            <span className="text-[7px] lg:text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Events</span>
                                        </div>
                                        <div className="bg-white p-3 lg:p-4 rounded-2xl border border-slate-100 flex flex-col gap-0.5 shadow-sm">
                                            <span className="text-[16px] lg:text-[20px] font-black text-indigo-600 italic leading-tight">08</span>
                                            <span className="text-[7px] lg:text-[8px] font-black text-slate-400 uppercase tracking-widest">This Week</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto p-8 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Info size={14} className="text-indigo-600" />
                                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                                        Select any active signal node to view encrypted event parameters.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: EVENT DETAILS PANEL */}
                        <div className="flex-1 bg-slate-50/30 lg:overflow-hidden flex flex-col min-h-0">

                            {/* Selected Date Header */}
                            <div className="p-4 sm:p-6 lg:p-8 pb-2 lg:pb-4 flex flex-row items-center justify-between gap-4">
                                <div className="space-y-0.5 lg:space-y-1">
                                    <p className="text-[8px] lg:text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] lg:tracking-[0.4em]">Transmission for</p>
                                    <h3 className="text-lg lg:text-2xl font-black italic uppercase text-slate-950 tracking-tight line-clamp-1">
                                        {selectedDate.toLocaleDateString('default', { weekday: 'short' })}, {selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'short' })}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setSelectedDate(new Date())}
                                    className="flex items-center gap-2 lg:gap-3 bg-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm shrink-0 hover:border-indigo-100 transition-colors"
                                >
                                    <CalendarIcon size={14} className="text-indigo-600" />
                                    <span className="text-[9px] lg:text-[11px] font-black text-slate-900 uppercase tracking-widest">Today</span>
                                </button>
                            </div>

                            {/* Events List Scroll Area */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-2 lg:pt-4 custom-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {selectedEvents.length > 0 ? (
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                            {selectedEvents.map((event, idx) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="group bg-white rounded-[24px] lg:rounded-[28px] border border-slate-100 p-4 lg:p-5 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.06)] hover:border-indigo-100 transition-all duration-500 relative overflow-hidden flex flex-col sm:flex-row xl:flex-col gap-5 lg:gap-6"
                                                >
                                                    {/* Ambient Glow */}
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full -mr-12 -mt-12" />

                                                    {/* Time Module - Side by side on mobile list */}
                                                    <div className="w-full sm:w-32 xl:w-full flex flex-col shrink-0 border-b sm:border-b-0 sm:border-r xl:border-r-0 xl:border-b border-slate-50 pb-4 sm:pb-0 sm:pr-5 xl:pr-0 xl:pb-4 relative z-10">
                                                        <div className="flex items-center gap-2 text-indigo-600 mb-1 lg:mb-2">
                                                            <Clock size={12} />
                                                            <span className="text-[10px] font-black uppercase tracking-wider">{event.startTime}</span>
                                                        </div>
                                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest pl-5 lg:pl-0">Ends: {event.endTime}</span>
                                                        <div className="mt-3 lg:mt-4">
                                                            <span className="px-2.5 py-1 bg-indigo-600/5 text-indigo-600 text-[8px] font-black uppercase tracking-widest rounded-lg border border-indigo-100/30 inline-block">
                                                                {event.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content & Meta */}
                                                    <div className="flex-1 flex flex-col relative z-10 min-w-0">
                                                        <div className="space-y-2 mb-4">
                                                            <h4 className="text-lg font-black italic uppercase text-slate-950 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors truncate">
                                                                {event.title}
                                                            </h4>
                                                            <p className="text-[11px] text-slate-400 font-medium italic line-clamp-1 sm:line-clamp-2 xl:line-clamp-1 leading-relaxed">
                                                                {event.description}
                                                            </p>
                                                        </div>

                                                        {/* Grid Meta */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-5">
                                                            <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-2 lg:py-2.5 rounded-xl border border-slate-100/50">
                                                                <MapPin size={12} className="text-rose-500" />
                                                                <span className="text-[9px] font-bold text-slate-900 truncate">{event.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-slate-50/50 px-3 py-2 lg:py-2.5 rounded-xl border border-slate-100/50">
                                                                <Users size={12} className="text-blue-500" />
                                                                <span className="text-[9px] font-bold text-slate-900 truncate">Core Member</span>
                                                            </div>
                                                        </div>

                                                        {/* Footer Action */}
                                                        <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                                                            <div className="flex items-center gap-1.5 text-emerald-500">
                                                                <Zap size={10} className="fill-emerald-500" />
                                                                <span className="text-[8px] font-black uppercase tracking-widest">Live Node</span>
                                                            </div>
                                                            <motion.button
                                                                whileHover={{ x: 3 }}
                                                                className="flex items-center gap-2 text-slate-950 hover:text-indigo-600 transition-all font-black text-[9px] uppercase tracking-widest"
                                                            >
                                                                Full Intel
                                                                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-all">
                                                                    <ArrowRight size={14} />
                                                                </div>
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-center space-y-8"
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-indigo-500/5 blur-[50px] rounded-full" />
                                                <div className="relative w-32 h-32 bg-white rounded-[40px] border border-slate-100 flex items-center justify-center text-slate-200 shadow-sm">
                                                    <Inbox size={48} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black italic uppercase text-slate-950 tracking-tight">Zero Transmissions</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-[280px] leading-relaxed">
                                                    No active signals detected for this temporal coordinate.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedDate(new Date())}
                                                className="px-8 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl shadow-xl hover:bg-indigo-600 transition-all animate-pulse"
                                            >
                                                Resync to Today
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>

                    {/* CSS FOR CUSTOM SCROLLBAR */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #e2e8f0;
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #cbd5e1;
                        }
                    `}} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SchedulePage;
