import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, BadgeCheck, Quote } from 'lucide-react';
import SectionHeader from './SectionHeader';

const ease = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 7000;

const testimonials = [
    {
        name: "Rishav",
        role: "Passionate Traveler",
        trip: "Chakrata Waterfall & Moila Top",
        date: "Spring 2025",
        content: "Safar Chaska organized the best trip of my life to Chakrata. The local captains knew spots that weren't even on Google Maps. Truly an authentic experience!",
        avatar: "/rishav-test.webp",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Content Creator",
        trip: "Golden Hour Photography Trail",
        date: "Autumn 2025",
        content: "As a photographer, I was looking for silent peaks and golden hours. The itinerary was perfectly paced, and the team was incredibly helpful. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        rating: 5
    },
    {
        name: "Ankit Verma",
        role: "Corporate Group",
        trip: "Team Retreat · 20 travellers",
        date: "Winter 2025",
        content: "We did a team building trip with 20 people. Everything was seamless — from transport to the bonfire nights. Safar Chaska is the gold standard for group travel.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        rating: 5
    }
];

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const Avatar = ({ person }) => {
    const [failed, setFailed] = useState(false);
    return (
        <span className="relative w-14 h-14 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-serif text-lg overflow-hidden shrink-0">
            {initials(person.name)}
            {person.avatar && !failed && (
                <img
                    src={person.avatar}
                    alt=""
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
        </span>
    );
};

const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

const Testimonials = () => {
    const [[index, dir], setState] = useState([0, 1]);
    const [paused, setPaused] = useState(false);
    const reduceMotion = useReducedMotion();

    const go = useCallback((delta) => {
        setState(([i]) => [(i + delta + testimonials.length) % testimonials.length, delta]);
    }, []);
    const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

    useEffect(() => {
        if (paused || reduceMotion) return;
        const t = setTimeout(() => go(1), AUTOPLAY_MS);
        return () => clearTimeout(t);
    }, [index, paused, reduceMotion, go]);

    const t = testimonials[index];

    return (
        <section className="py-16 md:py-28 bg-sand overflow-hidden" aria-roledescription="carousel" aria-label="Traveller testimonials">
            <div className="container-custom">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: title + aggregate rating */}
                    <div className="lg:col-span-4">
                        <SectionHeader
                            className="!mb-10"
                            eyebrow="Testimonials"
                            title={<>Stories from <em>the trail</em></>}
                            subtitle="Straight from the hearts of those who climbed with us."
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2, ease }}
                            className="inline-flex items-center gap-5 rounded-3xl bg-white shadow-premium px-6 py-5"
                        >
                            <p className="font-serif font-light text-5xl text-ink leading-none">4.9</p>
                            <div>
                                <div className="flex gap-0.5 mb-1.5" aria-label="Rated 4.9 out of 5">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
                                </div>
                                <p className="text-xs text-slate-500">Avg. from <span className="text-ink font-medium">1,200+ reviews</span></p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-0.5">10,000+ travellers guided</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                        className="lg:col-span-8"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocusCapture={() => setPaused(true)}
                        onBlurCapture={() => setPaused(false)}
                    >
                        <div className="relative rounded-3xl bg-white shadow-premium p-7 sm:p-10 md:p-14 overflow-hidden">
                            <Quote aria-hidden="true" className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 md:w-24 md:h-24 text-primary/[0.07] fill-primary/[0.07]" />

                            <div className="relative min-h-[340px] sm:min-h-[300px] md:min-h-[320px]" aria-live="polite">
                                <AnimatePresence mode="wait" custom={dir} initial={false}>
                                    <motion.figure
                                        key={index}
                                        custom={dir}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.6, ease }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.18}
                                        onDragEnd={(_, { offset, velocity }) => {
                                            if (offset.x < -60 || velocity.x < -400) go(1);
                                            else if (offset.x > 60 || velocity.x > 400) go(-1);
                                        }}
                                        className="cursor-grab active:cursor-grabbing select-none touch-pan-y"
                                        aria-roledescription="slide"
                                        aria-label={`${index + 1} of ${testimonials.length}`}
                                    >
                                        <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-secondary text-secondary' : 'text-slate-200'}`} />
                                            ))}
                                        </div>

                                        <blockquote className="font-serif font-light text-ink text-2xl sm:text-3xl md:text-[2.4rem] leading-[1.25] tracking-tight">
                                            &ldquo;{t.content}&rdquo;
                                        </blockquote>

                                        <figcaption className="mt-10 flex items-center gap-4">
                                            <Avatar person={t} />
                                            <div className="min-w-0">
                                                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink font-medium">
                                                    {t.name}
                                                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">
                                                        <BadgeCheck className="w-3.5 h-3.5" /> Verified traveller
                                                    </span>
                                                </p>
                                                <p className="text-sm text-slate-500 truncate">
                                                    {t.trip} <span className="text-slate-300 mx-1">·</span> {t.date}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </motion.figure>
                                </AnimatePresence>
                            </div>

                            {/* Controls */}
                            <div className="mt-8 pt-6 border-t border-ink/5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            role="tab"
                                            aria-selected={i === index}
                                            aria-label={`Show testimonial ${i + 1}`}
                                            onClick={() => goTo(i)}
                                            className="py-3 focus-visible:outline-none group"
                                        >
                                            <span className={`block h-1 rounded-full transition-all duration-500 ease-premium group-focus-visible:ring-2 group-focus-visible:ring-primary/40 ${i === index ? 'w-10 bg-primary' : 'w-4 bg-ink/15 group-hover:bg-ink/30'}`} />
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => go(-1)}
                                        aria-label="Previous testimonial"
                                        className="w-12 h-12 rounded-full border border-ink/10 text-ink flex items-center justify-center transition-all duration-500 ease-premium hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => go(1)}
                                        aria-label="Next testimonial"
                                        className="w-12 h-12 rounded-full border border-ink/10 text-ink flex items-center justify-center transition-all duration-500 ease-premium hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
