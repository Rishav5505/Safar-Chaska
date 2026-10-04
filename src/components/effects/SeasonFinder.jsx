import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { destinations, seasonalExtras, MONTHS } from '../../data/showcase';
import { onImageError } from '../../utils/format';

const ALL = [...destinations, ...seasonalExtras];

// "When are you travelling?" — pick a month, see the places at their best.
const SeasonFinder = () => {
    const [month, setMonth] = useState(() => new Date().getMonth());
    const stripRef = useRef(null);

    const picks = useMemo(() => ALL.filter((d) => d.months.includes(month)).slice(0, 4), [month]);

    return (
        <section className="py-16 md:py-28 bg-sand overflow-hidden">
            <div className="container-custom">
                <SectionHeader
                    center
                    eyebrow="Season Finder"
                    title={<>When are you <em>travelling?</em></>}
                    subtitle="Pick a month — we'll show you where the Himalayas (and beyond) are at their most beautiful."
                />

                <div ref={stripRef} role="tablist" aria-label="Travel month" className="relative mx-auto max-w-4xl flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide p-1.5 rounded-full bg-white shadow-premium mb-12 md:mb-16">
                    {MONTHS.map((m, i) => (
                        <button
                            key={m}
                            role="tab"
                            aria-selected={month === i}
                            onClick={() => setMonth(i)}
                            className={`relative shrink-0 flex-1 min-w-[56px] py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 ${month === i ? 'text-white' : 'text-slate-500 hover:text-ink'}`}
                        >
                            {month === i && (
                                <motion.span layoutId="season-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                            )}
                            <span className="relative">{m}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={month}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={{ show: { transition: { staggerChildren: 0.08 } }, exit: { transition: { staggerChildren: 0.04 } } }}
                    >
                        {picks.map((d, i) => (
                            <motion.div
                                key={d.name}
                                variants={{
                                    hidden: { opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 },
                                    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                                    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
                                }}
                            >
                                <Link to={`/packages?search=${encodeURIComponent(d.search)}`} className="group block relative aspect-[3/4] rounded-3xl overflow-hidden bg-ink shadow-premium">
                                    <img src={d.img} alt={d.name} loading="lazy" onError={onImageError} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                                    <span className="absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1.5 py-1 px-2.5 md:py-1.5 md:px-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white">
                                        <CalendarDays className="w-3 h-3" /> Best in {MONTHS[month]}
                                    </span>
                                    <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 text-white">
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-secondary-light mb-1.5">{d.region}</p>
                                        <h3 className="font-serif font-light !text-white text-2xl md:text-3xl leading-tight">{d.name}</h3>
                                        <p className="hidden md:block mt-2 text-sm text-white/65">{d.line}</p>
                                    </div>
                                    <span className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-ink flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-premium">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SeasonFinder;
