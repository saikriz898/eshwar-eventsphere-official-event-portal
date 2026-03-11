import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorLayout from './ErrorLayout';
import { Settings } from 'lucide-react';

const Maintenance = () => {
    return (
        <ErrorLayout
            code="SYNC"
            title="Temporal Grid Sync"
            description="The administrative core is currently conducting a high-fidelity synchronization of the portal's thermal grid. Transmission vectors are temporarily re-aligning for peak integrity."
            icon={Settings}
            accentColor="amber"
            showBackButton={false}
            showHomeButton={false}
        >
            <div className="mt-8 flex flex-col items-center lg:items-start animate-fade-in">
                <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Grid Stability</span>
                    <span className="text-2xl font-black italic tracking-tighter text-amber-600">0s</span>
                </div>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase italic">Signal status: re-aligning transmission nodes...</p>
            </div>
        </ErrorLayout>
    );
};

export default Maintenance;
