import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Hotel, Headset, Tag, ShieldCheck, Map, ArrowUpRight, X } from 'lucide-react';
import SectionHeader from './SectionHeader';

const ease = [0.22, 1, 0.36, 1];

const usps = [
    {
        title: "Pristine Destinations",
        desc: "Handpicked locations in Chakrata that remain untouched by commercial crowds.",
        detail: "We explore the path less traveled. Our team spends months scouting remote meadows and hidden waterfalls to ensure you experience the mountains as nature intended, away from the concrete jungles of typical hill stations.",
        icon: Globe,
    },
    {
        title: "Luxury Retreats",
        desc: "Premium cottages and sustainable stays that blend local charm with modern luxury.",
        detail: "From high-end wooden cottages to eco-friendly boutique stays, we partner only with properties that share our vision of hospitality. Expect warm local vibes, organic food, and premium comfort in the heart of the wilderness.",
        icon: Hotel,
    },
    {
        title: "24/7 Concierge",
        desc: "Our mountain captains are available around the clock to ensure your comfort.",
        detail: "Our 'Mountain Captains' aren't just guides; they are your local brothers. Whether you need a midnight bonfire, a change in itinerary, or local medication, we are just a call away, 24 hours a day.",
        icon: Headset,
    },
    {
        title: "Fair Pricing",
        desc: "Direct-to-traveler pricing with no hidden middleman costs or platform fees.",
        detail: "Transparency is our foundation. We eliminate travel agents and commission-heavy platforms to give you the best possible rates. Every rupee you pay goes directly into creating a high-quality experience for you.",
        icon: Tag,
    },
    {
        title: "Safety Shield",
        desc: "Every trek is led by certified professionals with advanced first-aid training.",
        detail: "Your safety is non-negotiable. All our leads are certified by Nehru Institute of Mountaineering (NIM). We carry GPS trackers, emergency oxygen, and comprehensive medical kits on every expedition.",
        icon: ShieldCheck,
    },
    {
        title: "Fluid Itineraries",
        desc: "Custom-built journeys tailored to your physical pace and aesthetic vibe.",
        detail: "We hate rigid schedules. Want to spend an extra hour at the waterfall? Or skip a temple for a forest nap? Our itineraries are fluid, meaning they bend according to your mood and energy level.",
        icon: Map,
    }
];

const WhyChooseUs = () => {
    const [selectedId, setSelectedId] = useState(null);

    // Lock body scroll (without jumping the page) and close on Escape while the modal is open.
    useEffect(() => {
        if (selectedId === null) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') setSelectedId(null); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [selectedId]);

    const selected = selectedId !== null ? usps[selectedId] : null;

    return (
        <section className="py-16 md:py-28 bg-ink relative overflow-hidden">
            <div aria-hidden="true" className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-primary/10 blur-[120px]" />

            <div className="container-custom relative">
                <SectionHeader
                    dark
                    center
                    eyebrow="The Safar Chaska Edge"
                    title={<>Why travellers <em>trust us</em></>}
                    subtitle="Our edge lies in obsessive attention to detail — and a genuine passion for the peaks."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {usps.map((usp, i) => (
                        <motion.button
                            type="button"
                            key={usp.title}
                            onClick={() => setSelectedId(i)}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
                            className="group text-left bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-3xl transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                        >
                            <div className="flex items-start justify-between mb-10">
                                <span className="w-12 h-12 rounded-full border border-secondary/30 text-secondary flex items-center justify-center transition-all duration-500 group-hover:bg-secondary group-hover:text-ink">
                                    <usp.icon className="w-5 h-5" />
                                </span>
                                <span className="font-serif italic text-white/25 text-lg">0{i + 1}</span>
                            </div>
                            <h3 className="font-serif font-light !text-white text-2xl md:text-3xl mb-3">{usp.title}</h3>
                            <p className="text-white/55 leading-relaxed text-sm md:text-base mb-8">{usp.desc}</p>
                            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover:text-secondary transition-colors duration-500">
                                Read more <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Detail modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-4"
                    >
                        <div onClick={() => setSelectedId(null)} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" aria-hidden="true" />
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="usp-title"
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            transition={{ duration: 0.6, ease }}
                            className="relative w-full max-w-lg bg-sand rounded-3xl p-8 md:p-12 shadow-3xl max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                type="button"
                                autoFocus
                                onClick={() => setSelectedId(null)}
                                aria-label="Close"
                                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-ink/10 text-ink flex items-center justify-center transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center mb-8">
                                <selected.icon className="w-5 h-5" />
                            </span>

                            <p className="eyebrow mb-4">0{selectedId + 1} — Why us</p>
                            <h3 id="usp-title" className="heading-premium text-3xl md:text-4xl mb-5">{selected.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-8">{selected.desc}</p>

                            <blockquote className="border-l-2 border-primary/40 pl-5 font-serif font-light italic text-lg text-ink/80 leading-relaxed">
                                {selected.detail}
                            </blockquote>

                            <button
                                type="button"
                                onClick={() => setSelectedId(null)}
                                className="w-full mt-10 py-4 bg-ink text-white rounded-full font-medium tracking-wide transition-colors duration-500 hover:bg-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                            >
                                Got it
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WhyChooseUs;
