import React from 'react';
import { motion } from 'framer-motion';

const EventCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
            <div className="p-2">
                <div className="relative h-48 rounded-2xl bg-slate-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            </div>
            <div className="px-5 pb-5 flex flex-1 flex-col space-y-4">
                <div className="space-y-2">
                    <div className="h-5 bg-slate-100 rounded-lg w-3/4" />
                    <div className="h-3 bg-slate-50 rounded-lg w-full" />
                    <div className="h-3 bg-slate-50 rounded-lg w-5/6" />
                </div>
                <div className="h-10 bg-slate-50 rounded-xl border border-slate-100/50" />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="h-2 bg-slate-100 rounded w-16" />
                        <div className="h-2 bg-slate-100 rounded w-12" />
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                </div>
                <div className="pt-1">
                    <div className="w-full h-12 bg-slate-100 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
