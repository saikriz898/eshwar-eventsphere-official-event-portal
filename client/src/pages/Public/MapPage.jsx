import React from 'react';
import ErrorLayout from '../Error/ErrorLayout';
import { Map as MapIcon } from 'lucide-react';

const MapPage = () => {
    return (
        <ErrorLayout
            code="MAP"
            title="Cartographic Manifestation"
            description="Our spatial architects are currently recalibrating the navigation grid for this sector. The high-fidelity portal map is undergoing topographical rendering."
            icon={MapIcon}
            accentColor="emerald"
            showBackButton={true}
            showHomeButton={true}
        >
            <div className="mt-8 flex flex-col items-center lg:items-start animate-fade-in">
                <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Spatial Sync</span>
                    <span className="text-2xl font-black italic tracking-tighter text-emerald-600">PENDING</span>
                </div>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase italic">Architectural status: rendering navigation meshes...</p>
            </div>
        </ErrorLayout>
    );
};

export default MapPage;
