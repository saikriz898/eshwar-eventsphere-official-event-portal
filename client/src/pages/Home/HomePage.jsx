import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    ArrowDownAZ
} from 'lucide-react';
import PublicNavbar from '../../components/layout/Navbar/PublicNavbar';
import PublicFooter from '../../components/layout/Footer/PublicFooter';
import PublicPreloader from '../../components/common/Preloader/PublicPreloader';
import EventCardSkeleton from '../../components/common/Skeleton/EventCardSkeleton';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEventsLoading, setIsEventsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    // Simulate page-level preloader
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // After page loads, simulate data fetching for components
            const dataTimer = setTimeout(() => {
                setIsEventsLoading(false);
            }, 1500);
            return () => clearTimeout(dataTimer);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <PublicPreloader />;

    const filters = ["All", "Hackathon", "Workshop"];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <PublicNavbar />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-white">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 -z-10 w-[55%] h-full bg-slate-50/80 rounded-bl-[140px] border-l border-b border-slate-100/50" />
                <div className="absolute top-1/3 left-0 -translate-y-1/2 -z-10 w-64 h-64 bg-indigo-50/40 rounded-full blur-[100px]" />

                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8 text-center lg:text-left pt-8 lg:pt-0"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/80 backdrop-blur-sm text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100/50"
                                >
                                    <Sparkles className="w-3.5 h-3.5" /> Discover The Future
                                </motion.div>
                                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    Every Event <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Elevated.</span>
                                </h1>
                                <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    Experience the most premium event management portal.
                                    Connect, celebrate, and create memories that last forever
                                    at SECE.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <a
                                    href="#join"
                                    className="h-14 px-8 bg-slate-900 text-white rounded-xl font-bold transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:scale-95 flex items-center gap-2.5 justify-center"
                                >
                                    Join Hub <ArrowRight className="w-4.5 h-4.5" />
                                </a>
                                <Link
                                    to="/events"
                                    className="h-14 px-8 bg-white text-slate-700 border-2 border-slate-100 rounded-xl font-bold hover:border-indigo-100 hover:text-indigo-600 transition-all active:scale-95 flex items-center justify-center"
                                >
                                    Explore Events
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="hidden lg:flex relative justify-center lg:justify-end pb-10 lg:pb-0"
                        >
                            <div className="w-full max-w-[390px] group">
                                <div className="relative bg-white rounded-[36px] p-5 shadow-[0_24px_50px_-15px_rgba(79,70,229,0.1)] border border-slate-100 transition-transform duration-500 group-hover:-translate-y-2">
                                    {isEventsLoading ? (
                                        <div className="animate-pulse">
                                            <div className="h-56 bg-slate-100 rounded-[28px] mb-5" />
                                            <div className="space-y-4 px-1">
                                                <div className="h-4 bg-slate-50 rounded w-1/4" />
                                                <div className="h-6 bg-slate-100 rounded w-3/4" />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="h-10 bg-slate-50 rounded-xl" />
                                                    <div className="h-10 bg-slate-50 rounded-xl" />
                                                </div>
                                                <div className="h-12 bg-slate-100 rounded-2xl" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-indigo-50 rounded-full blur-xl opacity-50" />
                                                <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-50">
                                                    <Sparkles className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">
                                                    Live Highlights
                                                </h4>
                                                <p className="text-[10px] font-bold text-slate-400 max-w-[180px] leading-relaxed">
                                                    Our spotlight is currently searching for the next big event.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Discovery Hub */}
            <section id="explore" className="py-16 bg-white border-t border-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Row */}
                    <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-6 mb-8 sm:mb-12">
                        <div className="space-y-1 sm:space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3">
                                <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-indigo-600 rounded-full shrink-0" />
                                <span className="whitespace-nowrap">Discovery Hub</span>
                            </h2>
                            <p className="text-slate-400 font-bold text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] ml-3.5 sm:ml-5 leading-relaxed">
                                Browse Events & Workshops
                            </p>
                        </div>

                        {/* Right Side: Action Link */}
                        <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => window.location.href = '/events'}
                            className="flex items-center gap-1.5 sm:gap-2 text-indigo-600 hover:text-indigo-700 transition-all group py-1 sm:py-2 shrink-0 mt-1 sm:mt-0"
                        >
                            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap">View Events</span>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm shrink-0">
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                        </motion.button>
                    </div>

                    {/* Compact Controls Section */}
                    <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className="flex items-stretch gap-3">
                            {/* Search Bar - Full Width & Premium */}
                            <div className="relative group flex-1">
                                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-4.5 sm:h-4.5 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search fests or events..."
                                    className="w-full pl-11 sm:pl-14 pr-4 sm:pr-6 py-3.5 sm:py-5 bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:bg-white focus:border-indigo-600/20 transition-all font-bold text-xs sm:text-sm text-slate-700 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filter Chips */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0 w-fit">
                                <Filter className="w-3 h-3 text-slate-400" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Explore:</span>
                            </div>
                            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 w-full sm:w-auto">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setSelectedFilter(f)}
                                        className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3 rounded-xl text-[11px] font-black whitespace-nowrap transition-all border ${selectedFilter === f
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-100'
                                            : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-100 hover:text-indigo-600'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Grid - Refined Compact 3-Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isEventsLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))
                        ) : events.length > 0 ? (
                            events.slice(0, 6).map((event) => (
                                <motion.div
                                    key={event.id}
                                    whileHover={{ y: -6 }}
                                    className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
                                >
                                    <div className="p-2">
                                        <div className="relative h-48 rounded-2xl overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[9px] font-black text-indigo-600 uppercase tracking-wider shadow-sm border border-white/10">
                                                    {event.category}
                                                </span>
                                            </div>
                                            <button className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all">
                                                <Info className="w-4 h-4" />
                                            </button>

                                            <div className="absolute bottom-3 left-3">
                                                <div className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black shadow-lg">
                                                    {event.price === 0 ? 'FREE' : `₹${event.price}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-5 flex flex-1 flex-col space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">
                                                {event.title}
                                            </h3>
                                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                                                {event.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                                <span className="text-[10px] font-bold uppercase">{event.date}</span>
                                            </div>
                                            <div className="w-px h-3 bg-slate-200" />
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                                <span className="text-[10px] font-bold uppercase truncate">{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tight">
                                                <span className="text-slate-400">Slots Availability</span>
                                                {(() => {
                                                    const avail = event.totalCapacity - event.filledSeats;
                                                    return (
                                                        <span className={avail < 20 ? 'text-rose-600' : 'text-emerald-600'}>
                                                            {avail} Left
                                                        </span>
                                                    );
                                                })()}
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${((event.totalCapacity - event.filledSeats) / event.totalCapacity) > 0.1 ? 'bg-indigo-500' : 'bg-rose-500'
                                                        }`}
                                                    style={{ width: `${(event.filledSeats / event.totalCapacity) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-1">
                                            <button className="w-full h-12 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group/btn active:scale-95 shadow-sm">
                                                Register Now
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100/50">
                                    <Search className="w-7 h-7" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-xs">No Events Found</p>
                                    <p className="text-slate-400 text-[10px] font-bold max-w-xs">We couldn't find any events matching your current filters. Try exploring other categories!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Upcoming Events: Premium Zigzag Timeline */}
            <section id="schedule" className="py-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-50 relative overflow-hidden border-t border-slate-100">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-50/30 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Updated Header Row (Discovery Hub Style) */}
                    <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-6 mb-8 sm:mb-12 flex-col sm:flex-row">
                        <div className="space-y-3 sm:space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-indigo-600 text-white rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-lg shadow-indigo-100"
                            >
                                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Live Schedule
                            </motion.div>
                            <div className="space-y-1 sm:space-y-2">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3">
                                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-indigo-600 rounded-full shrink-0" />
                                    <span className="whitespace-nowrap flex gap-1">Upcoming <span className="text-indigo-600">Events</span></span>
                                </h2>
                                <p className="text-slate-400 font-bold text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.3em] ml-3.5 sm:ml-5 leading-relaxed">
                                    Step into the future of campus events
                                </p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-1.5 sm:gap-3 transition-all group shrink-0 mt-4 sm:mt-0 self-start sm:self-auto"
                        >
                            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-600 group-hover:text-indigo-600 transition-colors whitespace-nowrap">Full Schedule</span>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all shadow-lg shrink-0">
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                        </motion.button>
                    </div>

                    {/* Zigzag Timeline Container */}
                    <div className="relative mt-2 sm:mt-8">

                        {/* Desktop Timeline Track (SVG Path) - Absolute Precision */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 hidden lg:block -translate-y-1/2 overflow-visible z-20">
                            <svg className="w-full h-1 overflow-visible">
                                <motion.line
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    x1="16.666%" y1="2" x2="83.333%" y2="2"
                                    stroke="#4f46e5" strokeWidth="4" strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div className="flex flex-col lg:flex-row h-full gap-4 sm:gap-8 lg:gap-0 relative">
                            {isEventsLoading ? (
                                Array(3).fill(0).map((_, idx) => (
                                    <div key={idx} className="relative flex-1 flex flex-col items-center">
                                        <div className="w-full lg:w-[420px] bg-white/50 animate-pulse h-32 rounded-[32px] border border-slate-100" />
                                    </div>
                                ))
                            ) : upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, idx) => (
                                    <div key={idx} className="relative flex-1 flex flex-col items-center">

                                        {/* Timeline Node */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center">
                                            <div className="relative w-10 h-10 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-indigo-600/20 rounded-full animate-ping" />
                                                <div className="w-6 h-6 bg-white border-[6px] border-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] relative z-10" />
                                                <div className="absolute -bottom-10 whitespace-nowrap px-3 py-1 bg-white border border-indigo-50 shadow-md rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 z-50">
                                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                                    Event {idx + 1} <span className="text-slate-400 font-bold ml-1 border-l border-slate-200 pl-2">{event.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Card Wrapper */}
                                        <motion.div
                                            initial={{ opacity: 0, y: idx % 2 === 0 ? -60 : 60, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }}
                                            className={`relative flex flex-col items-center w-full px-4 lg:px-0 ${idx % 2 === 0 ? 'lg:justify-start lg:pb-32' : 'lg:justify-end lg:h-full lg:pt-32'}`}
                                        >
                                            <motion.div
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="w-full lg:w-[420px] bg-white/80 backdrop-blur-xl p-5 rounded-[32px] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-10px_rgba(79,70,229,0.1)] transition-all cursor-pointer group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-indigo-100/40 transition-colors" />

                                                <div className="flex gap-6 items-center relative z-10">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-500">
                                                        <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-20" />
                                                    </div>

                                                    <div className="flex-1 space-y-2 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest">{event.time}</span>
                                                        </div>
                                                        <h4 className="text-[15px] font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                                            {event.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
                                                                <MapPin className="w-3 h-3 text-rose-500" />
                                                            </div>
                                                            <span className="truncate">{event.loc}</span>
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                                                            <ChevronRight className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                whileInView={{ height: '120px', opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: idx * 0.2 + 0.6 }}
                                                className={`hidden lg:block w-1 relative z-0 ${idx % 2 === 0 ? '-mt-1 order-last origin-top' : '-mb-1 order-first origin-bottom'}`}
                                            >
                                                <div className="w-full h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.1)]" />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex-1 py-16 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm border border-slate-50">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">Schedule Pending</p>
                                        <p className="text-slate-400 text-[9px] font-bold">New dates will be announced soon.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimalist Light CTA Section */}
            <section id="join" className="py-20 px-4 relative overflow-hidden bg-white">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 right-0 -z-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-0 left-0 -z-0 w-64 h-64 bg-sky-50/50 rounded-full blur-[100px] opacity-60" />

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
                    {/* Visual Anchor */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-100 rounded-3xl blur-xl opacity-40 animate-pulse" />
                            <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm">
                                <Sparkles className="w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100/50 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                Experience The Future
                            </motion.span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                Ready to Shape Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Event Experience?</span>
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                                Join the most premium event management portal. Host, discover, and celebrate SECE campus life with our sophisticated all-in-one platform.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                            <motion.button
                                whileHover={{ y: -4, shadow: "0 20px 40px rgba(79,70,229,0.15)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ borderColor: "rgba(79,70,229,0.2)", color: "#4f46e5" }}
                                className="w-full sm:w-auto px-10 py-4 bg-white text-slate-400 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                            >
                                Learn More
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
};

export default HomePage;
