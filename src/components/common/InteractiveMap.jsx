import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

const ease = [0.22, 1, 0.36, 1];

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
    const [activeId, setActiveId] = useState(spots[0].id);
    const active = spots.find((s) => s.id === activeId) || spots[0];
    const activeIdx = spots.indexOf(active);

    return (
        <section className="py-16 md:py-28 bg-ink overflow-hidden">
            <div className="container-custom">
                <SectionHeader
                    dark
                    eyebrow="Interactive Map"
                    title={<>Hidden gems around <em>Chakrata</em></>}
                    subtitle="Tap a marker to explore the places our captains love most."
                />

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease }}
                        className="lg:col-span-8 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] border border-white/10 bg-white/[0.03]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1464817739973-0128fe77a1b7?auto=format&fit=crop&q=80&w=2000"
                            alt="Aerial view of the Himalayan foothills around Chakrata"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[35%]"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />
                        {/* Faint topographic grid */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-[0.12]"
                            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
                        />

                        {spots.map((spot, i) => {
                            const isActive = spot.id === activeId;
                            return (
                                <button
                                    key={spot.id}
                                    type="button"
                                    className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 p-2 focus-visible:outline-none"
                                    style={{ left: `${spot.x}%`, top: `${spot.y + 10}%` }}
                                    onMouseEnter={() => setActiveId(spot.id)}
                                    onFocus={() => setActiveId(spot.id)}
                                    onClick={() => setActiveId(spot.id)}
                                    aria-label={`${spot.name}: ${spot.desc}`}
                                    aria-pressed={isActive}
                                >
                                    <span className="relative flex items-center justify-center w-9 h-9">
                                        {isActive && <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping" />}
                                        <span className={`relative flex items-center justify-center w-9 h-9 rounded-full border text-xs font-serif transition-all duration-500 ease-premium group-focus-visible:ring-2 group-focus-visible:ring-white ${isActive ? 'bg-secondary border-secondary text-ink' : 'bg-ink/60 backdrop-blur-md border-white/40 text-white group-hover:border-secondary'}`}>
                                            {i + 1}
                                        </span>
                                    </span>
                                    <span className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60'}`}>
                                        {spot.name}
                                    </span>
                                </button>
                            );
                        })}

                        <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] text-white/50">Chakrata · Uttarakhand</p>
                    </motion.div>

                    {/* Detail panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                        className="lg:col-span-4 flex flex-col gap-4"
                    >
                        <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.45 }}
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <motion.img
                                            initial={{ scale: 1.08 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1.2, ease }}
                                            src={active.image}
                                            alt={active.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:p-7">
                                        <p className="font-serif italic text-secondary text-sm mb-1">0{activeIdx + 1}</p>
                                        <h3 className="font-serif font-light !text-white text-3xl mb-2">{active.name}</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">{active.desc}</p>
                                        <Link to="/chakrata" className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-secondary transition-colors">
                                            Explore Chakrata <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {spots.map((spot, i) => (
                                <button
                                    key={spot.id}
                                    type="button"
                                    onClick={() => setActiveId(spot.id)}
                                    className={`text-left px-4 py-3 rounded-2xl border text-sm transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ${spot.id === activeId ? 'border-secondary/50 bg-white/[0.06] text-white' : 'border-white/10 text-white/60 hover:border-white/25 hover:text-white'}`}
                                >
                                    <span className="font-serif italic text-secondary mr-2">{i + 1}</span>{spot.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
