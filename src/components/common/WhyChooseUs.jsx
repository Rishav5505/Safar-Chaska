import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Hotel, Headset, Tag, ShieldCheck, Map, ArrowRight, X } from 'lucide-react';
import Reveal from './Reveal';

const usps = [
    {
        title: "Pristine Destinations",
        desc: "Handpicked locations in Chakrata that remain untouched by commercial crowds.",
        detail: "We explore the path less traveled. Our team spends months scouting remote meadows and hidden waterfalls to ensure you experience the mountains as nature intended, away from the concrete jungles of typical hill stations.",
        icon: Globe,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Luxury Retreats",
        desc: "Premium cottages and sustainable stays that blend local charm with modern luxury.",
        detail: "From high-end wooden cottages to eco-friendly boutique stays, we partner only with properties that share our vision of hospitality. Expect warm local vibes, organic food, and premium comfort in the heart of the wilderness.",
        icon: Hotel,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        title: "24/7 Concierge",
        desc: "Our mountain captains are available around the clock to ensure your comfort.",
        detail: "Our 'Mountain Captains' aren't just guides; they are your local brothers. Whether you need a midnight bonfire, a change in itinerary, or local medication, we are just a call away, 24 hours a day.",
        icon: Headset,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        title: "Fair Pricing",
        desc: "Direct-to-traveler pricing with no hidden middleman costs or platform fees.",
        detail: "Transparency is our foundation. We eliminate travel agents and commission-heavy platforms to give you the best possible rates. Every rupee you pay goes directly into creating a high-quality experience for you.",
        icon: Tag,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Safety Shield",
        desc: "Every trek is led by certified professionals with advanced first-aid training.",
        detail: "Your safety is non-negotiable. All our leads are certified by Nehru Institute of Mountaineering (NIM). We carry GPS trackers, emergency oxygen, and comprehensive medical kits on every expedition.",
        icon: ShieldCheck,
        color: "text-rose-500",
        bg: "bg-rose-50"
    },
    {
        title: "Fluid Itineraries",
        desc: "Custom-built journeys tailored to your physical pace and aesthetic vibe.",
        detail: "We hate rigid schedules. Want to spend an extra hour at the waterfall? Or skip a temple for a forest nap? Our itineraries are fluid, meaning they bend according to your mood and energy level.",
        icon: Map,
        color: "text-indigo-500",
        bg: "bg-indigo-50"
    }
];

const WhyChooseUs = () => {
    const [selectedId, setSelectedId] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedId !== null) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [selectedId]);

    return (
        <section className="pt-2 md:pt-4 pb-8 md:pb-20 bg-slate-50 relative">
            <div className="container-custom">
                <div className="text-center mb-6 md:mb-10">

                    <Reveal center>
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Why Travelers Trust Us</h2>
                    </Reveal>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">The Safar Chaska edge lies in our attention to detail and passion for the peaks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {usps.map((usp, i) => (
                        <motion.div
                            key={i}
                            onClick={() => setSelectedId(i)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-primary transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 md:w-16 md:h-16 ${usp.bg} ${usp.color} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all`}>
                                <usp.icon className="w-7 h-7 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{usp.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6">{usp.desc}</p>

                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-auto">
                                View Detail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Portal */}
            <AnimatePresence>
                {selectedId !== null && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />

                        {/* Modal */}
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-white max-h-[90vh] overflow-y-auto relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className={`w-16 h-16 ${usps[selectedId].bg} ${usps[selectedId].color} rounded-2xl flex items-center justify-center mb-8`}>
                                    {React.createElement(usps[selectedId].icon, { className: "w-8 h-8" })}
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 mb-6">{usps[selectedId].title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                                    {usps[selectedId].desc}
                                </p>

                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                    <p className="text-slate-700 leading-relaxed italic">
                                        "{usps[selectedId].detail}"
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="w-full mt-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary transition-all"
                                >
                                    Got it
                                </button>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WhyChooseUs;
