import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Image as ImageIcon,
    Calendar,
    MapPin,
    Maximize2,
    ExternalLink,
    Sparkles,
    Filter,
    ArrowRight,
    PlayCircle
} from 'lucide-react';
import InternalNavbar from '../../components/layout/Navbar/InternalNavbar';
import InternalFooter from '../../components/layout/Footer/InternalFooter';
import InternalPreloader from '../../components/common/Preloader/InternalPreloader';
import { cn } from '../../utils/cn';

const GalleryPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewingImage, setViewingImage] = useState(null);

    // Categories for filtering
    const categories = ['All', 'Technical', 'Non-Technical', 'Workshop', 'Cultural', 'Sports'];

    // Gallery Data - Synchronized to empty manifest
    const galleryItems = [];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredItems = selectedCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200]"
                >
                    <InternalPreloader />
                </motion.div>
            ) : (
                <motion.div
                    key="gallery-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-indigo-100 flex flex-col pt-20"
                >
                    <InternalNavbar pageTitle="Visual Archive" />

                    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 text-indigo-600"
                                >
                                    <Sparkles size={16} className="animate-pulse" />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">Visual Archive</span>
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-950 leading-[0.85]"
                                >
                                    Past <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Events</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-slate-400 font-medium italic text-sm lg:text-lg max-w-xl"
                                >
                                    Relive the moments of innovation, creativity, and excellence that define our community.
                                </motion.p>
                            </div>

                            {/* Filters */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-2 lg:gap-3"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
                                            selectedCategory === cat
                                                ? "bg-slate-950 text-white border-slate-950 shadow-xl shadow-indigo-500/10 scale-105"
                                                : "bg-white text-slate-400 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        </div>

                        {/* Gallery Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item, idx) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className="group relative h-[450px] rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                                    >
                                        {/* Image */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col gap-4 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-indigo-400">
                                                    <Calendar size={12} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{item.date}</span>
                                                </div>
                                                <h3 className="text-2xl font-black italic uppercase text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <p className="text-slate-300 text-[11px] font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <MapPin size={12} />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest">{item.location}</span>
                                                </div>
                                                <button
                                                    onClick={() => setViewingImage(item)}
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-300"
                                                >
                                                    <Maximize2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black uppercase tracking-widest text-white">
                                                {item.category}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Empty State */}
                        {filteredItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-40 space-y-6 text-center">
                                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-100">
                                    <ImageIcon size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black italic uppercase text-slate-950 tracking-tight">No Archive Found</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The requested sector contains zero visual nodes.</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="px-8 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-indigo-600 transition-all"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>

                    <InternalFooter />

                    {/* Fullscreen Image Overlay */}
                    <AnimatePresence>
                        {viewingImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-20"
                                onClick={() => setViewingImage(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="relative w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={viewingImage.image}
                                        alt={viewingImage.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 space-y-4">
                                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                                            <div className="space-y-2">
                                                <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">{viewingImage.category} Archive</span>
                                                <h2 className="text-4xl lg:text-5xl font-black italic uppercase text-white tracking-tighter">
                                                    {viewingImage.title}
                                                </h2>
                                                <p className="text-slate-400 max-w-2xl font-medium italic text-sm lg:text-base">
                                                    {viewingImage.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{viewingImage.location}</span>
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{viewingImage.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setViewingImage(null)}
                                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all"
                                    >
                                        <Maximize2 size={20} className="rotate-45" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GalleryPage;
