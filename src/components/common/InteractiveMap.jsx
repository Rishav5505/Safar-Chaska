import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, Star, ArrowUpRight, Info } from 'lucide-react';
import Reveal from './Reveal';

const spots = [
    {
        id: 'tiger-falls',
        name: 'Tiger Falls',
        x: 45,
        y: 35,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
        desc: 'One of the highest direct waterfalls in India.'
    },
    {
        id: 'deoban',
        name: 'Deoban',
        x: 30,
        y: 15,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=800',
        desc: 'Dense Deodar forests with Himalayan views.'
    },
    {
        id: 'kanasar',
        name: 'Kanasar',
        x: 65,
        y: 20,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
        desc: 'Home to some of the oldest Deodar trees in Asia.'
    },
    {
        id: 'budher',
        name: 'Budher Caves',
        x: 75,
        y: 55,
        image: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=800',
        desc: 'Ancient limestone caves and alpine meadows.'
    }
];

const InteractiveMap = () => {
    const [activeSpot, setActiveSpot] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <Reveal center>
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Interactive Map</h2>
                    </Reveal>
                    <p className="text-slate-500 mt-4">Discover the hidden gems around Chakrata.</p>
                </div>

                {/* Container without overflow-hidden to let tooltips pop out */}
                <div className="max-w-5xl mx-auto relative bg-slate-100 rounded-3xl aspect-[16/9] shadow-inner border border-slate-200">

                    {/* Background Layer (Colorful & Vibrant) */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden bg-slate-200">
                        <div className="absolute inset-0 opacity-100 pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1464817739973-0128fe77a1b7?auto=format&fit=crop&q=80&w=2000"
                                alt="Himalayan Map"
                                className="w-full h-full object-cover saturate-[1.6]"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000";
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
                    </div>

                    {/* Spots */}
                    {spots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute z-20 cursor-pointer group"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            onMouseEnter={() => setActiveSpot(spot)}
                            onMouseLeave={() => setActiveSpot(null)}
                            onClick={() => setActiveSpot(activeSpot?.id === spot.id ? null : spot)}
                        >
                            <div className="relative -translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                    animate={{ scale: activeSpot?.id === spot.id ? 1.2 : 1 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeSpot?.id === spot.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm'}`}
                                >
                                    <MapPin className="w-5 h-5" />
                                </motion.div>

                                <AnimatePresence>
                                    {activeSpot?.id === spot.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: spot.y < 30 ? -10 : 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: spot.y < 30 ? -10 : 10, scale: 0.9 }}
                                            className={`absolute ${spot.y < 30 ? 'top-full mt-4' : 'bottom-full mb-4'} left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl p-4 z-50 border border-slate-100`}
                                        >
                                            <div className="h-32 rounded-xl overflow-hidden mb-4">
                                                <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="font-bold text-slate-900 mb-1">{spot.name}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-3">{spot.desc}</p>
                                            <div className="flex items-center text-[10px] font-bold text-primary uppercase tracking-widest gap-1">
                                                <Info className="w-3 h-3" /> View Details
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}

                    {/* Helper text */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 shadow-sm text-xs font-medium text-slate-500">
                            Click on a point to reveal details
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
