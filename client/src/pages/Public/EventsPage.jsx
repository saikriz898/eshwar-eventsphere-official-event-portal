import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    ArrowRight,
    Star,
    Users,
    Sparkles,
    ChevronRight,
    Info,
    Clock,
    SlidersHorizontal,
    ArrowDownAZ,
    Zap,
    LayoutGrid,
    ListFilter
} from 'lucide-react';
import PublicNavbar from '../../components/layout/Navbar/PublicNavbar';
import PublicFooter from '../../components/layout/Footer/PublicFooter';
import PublicPreloader from '../../components/common/Preloader/PublicPreloader';
import EventCardSkeleton from '../../components/common/Skeleton/EventCardSkeleton';

const EventsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEventsLoading, setIsEventsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Date");
    const [visibleCount, setVisibleCount] = useState(6);

    // Mock Data for Events (Removed for Clean Slate)
    const mockEvents = [];

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            const dataTimer = setTimeout(() => {
                setEvents([]); // NO DEMO DATA
                setIsEventsLoading(false);
            }, 1000);
            return () => clearTimeout(dataTimer);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const filters = ["All", "Hackathon", "Workshop"];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === "All" || event.category === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    if (isLoading) return <PublicPreloader />;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <PublicNavbar />

            {/* Main Content Area */}
            <main className="flex-1 pt-28 pb-20">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">

                    {/* Header Row: Cinematic Split Design */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div className="relative space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-indigo-600/5 rounded-xl text-indigo-600 border border-indigo-100/50"
                            >
                                <Sparkles size={14} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Nexus Hub</span>
                            </motion.div>

                            <div className="space-y-3">
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85] italic uppercase">
                                    Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Registry</span>
                                </h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.4em] max-w-xl border-l-[3px] border-indigo-600/20 pl-6 py-1">
                                    Browsing elite workshops & campus hackathons
                                </p>
                            </div>
                        </div>

                        {/* Premium Signals Module */}
                        <div className="flex items-center gap-6">
                            <div className="relative group cursor-default">
                                {/* Ambient Glow */}
                                <div className="absolute -inset-6 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative flex flex-col items-end">
                                    <div className="flex items-center gap-2.5 mb-2.5 mr-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total Signals</p>
                                    </div>

                                    <div className="flex items-center gap-6 bg-white border border-slate-100 p-2.5 pl-5 pr-7 rounded-[28px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:border-indigo-100 hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.08)] transition-all duration-500">
                                        <div className="flex -space-x-3.5">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-11 h-11 rounded-full border-[3px] border-white bg-slate-50 ring-1 ring-slate-100/50 shadow-sm overflow-hidden flex items-center justify-center relative group-hover/avatar:scale-105 transition-transform">
                                                    <Users size={16} className="text-slate-300" />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="h-10 w-px bg-slate-100" />

                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-3xl font-black text-slate-950 tracking-tighter italic">
                                                {isEventsLoading ? ".." : (filteredEvents.length < 10 ? `0${filteredEvents.length}` : filteredEvents.length)}
                                            </span>
                                            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1.5">Stream</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Row: Search & Filters */}
                    <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                            {/* Search */}
                            <div className="lg:col-span-6 relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="SEARCH BY EVENT TITLE OR KEYWORD..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-[11px] font-black tracking-widest text-slate-900 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all uppercase"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Filter Chips */}
                            <div className="lg:col-span-4 flex items-center gap-3">
                                <div className="flex-1 flex gap-2">
                                    {filters.map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setSelectedFilter(f)}
                                            className={`flex-1 py-4 px-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border uppercase ${selectedFilter === f
                                                ? 'bg-slate-950 text-white border-slate-950 shadow-xl'
                                                : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Toggle */}
                            <div className="lg:col-span-2">
                                <button className="w-full h-full min-h-[56px] bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:bg-slate-100 transition-all group">
                                    <SlidersHorizontal className="w-4 h-4 group-hover:text-indigo-600" />
                                    <span className="text-[10px] font-black tracking-widest uppercase group-hover:text-slate-900">Sort: {sortBy}</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isEventsLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))
                        ) : filteredEvents.length > 0 ? (
                            filteredEvents.slice(0, visibleCount).map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -8 }}
                                    className="flex flex-col h-full bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.12)] transition-all group"
                                >
                                    {/* Image Wrapper */}
                                    <div className="p-3">
                                        <div className="relative h-64 rounded-[32px] overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                                            {/* Category Overlay */}
                                            <div className="absolute top-4 left-4">
                                                <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] shadow-lg">
                                                    {event.category}
                                                </div>
                                            </div>

                                            {/* Price Overlay */}
                                            <div className="absolute bottom-6 left-6">
                                                <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[11px] font-black shadow-xl flex items-center gap-2">
                                                    <Zap size={12} className="fill-white" />
                                                    {event.price === 0 ? 'FREE JOINING' : `ENTRY ₹${event.price}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="px-8 pb-8 flex-1 flex flex-col">
                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600">
                                                    <LayoutGrid size={14} />
                                                </div>
                                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{event.organizer}</p>
                                            </div>

                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight italic uppercase">
                                                {event.title}
                                            </h3>

                                            <p className="text-[12px] text-slate-400 leading-relaxed font-medium line-clamp-3">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-indigo-500">
                                                    <Calendar size={13} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Date</span>
                                                </div>
                                                <span className="text-[11px] font-black text-slate-900">{event.date}</span>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-rose-500">
                                                    <MapPin size={13} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Venue</span>
                                                </div>
                                                <span className="text-[11px] font-black text-slate-900 truncate">{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-8">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronization Status</span>
                                                <span className="text-[10px] font-black text-indigo-600">
                                                    {event.filledSeats}/{event.totalCapacity} SLOTS
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(event.filledSeats / event.totalCapacity) * 100}%` }}
                                                    className="h-full bg-indigo-600 rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                                            <div className="flex gap-1">
                                                {event.tags.map(tag => (
                                                    <span key={tag} className="text-[8px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg group/btn"
                                            >
                                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-white rounded-[32px] border border-slate-100 flex items-center justify-center text-slate-200 mb-8 shadow-sm">
                                    <ListFilter size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-950 uppercase italic mb-2 tracking-tight">Access Denied</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed"> No events found matching your current transmission criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(""); setSelectedFilter("All"); }}
                                    className="mt-8 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-indigo-600/20 pb-1"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Load More Action */}
                    {!isEventsLoading && filteredEvents.length > visibleCount && (
                        <div className="mt-20 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setVisibleCount(prev => prev + 3)}
                                className="px-10 py-5 bg-white border border-slate-100 rounded-[24px] text-slate-900 font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-4 group"
                            >
                                Load More Transmissions
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                                    <Clock size={14} className="group-hover:rotate-12 transition-transform" />
                                </div>
                            </motion.button>
                        </div>
                    )}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
};

export default EventsPage;
