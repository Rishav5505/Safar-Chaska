import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { destinations } from '../../data/showcase';
import { onImageError } from '../../utils/format';

// One destination panel; the photo drifts against the scroll for depth.
const Panel = ({ d, i, progress }) => {
    const shift = useTransform(progress, [0, 1], ['-8%', '8%']);
    return (
        <Link
            to={`/packages?search=${encodeURIComponent(d.search)}`}
            className="group relative shrink-0 w-[78vw] sm:w-[60vw] md:w-[42vw] lg:w-[34vw] h-[62vh] md:h-[68vh] rounded-[2rem] overflow-hidden bg-ink snap-center"
        >
            <motion.img
                src={d.img}
                alt={d.name}
                loading="lazy"
                onError={onImageError}
                style={{ x: shift, scale: 1.25 }}
                className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />

            <div className="absolute top-6 left-6 right-6 flex items-start justify-between text-white">
                <span className="font-serif italic text-5xl md:text-6xl text-white/25 leading-none">0{i + 1}</span>
                <span className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-500 ease-premium group-hover:bg-secondary group-hover:border-secondary group-hover:text-ink group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-secondary-light mb-3">{d.region}</p>
                <h3 className="font-serif font-light !text-white text-5xl md:text-6xl leading-none mb-3 transition-transform duration-700 ease-premium group-hover:-translate-y-1">
                    {d.name}
                </h3>
                <p className="text-white/70 text-sm md:text-base max-w-xs">{d.line}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/80 overflow-hidden">
                    <span className="transition-transform duration-500 group-hover:translate-x-1">View journeys</span>
                    <MoveRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
            </div>
        </Link>
    );
};

const Intro = () => (
    <div className="shrink-0 w-[78vw] sm:w-[60vw] md:w-[34vw] flex flex-col justify-center pr-6 md:pr-12 text-white">
        <p className="eyebrow !text-secondary mb-6">Destinations</p>
        <h2 className="font-serif font-light !text-white text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Where will the <em className="italic text-secondary-light">mountains</em> take you?
        </h2>
        <p className="mt-6 text-white/55 max-w-sm leading-relaxed">
            Eight regions we know by heart — scouted on foot, run by our own captains.
        </p>
        <p className="mt-10 hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40">
            Keep scrolling <MoveRight className="w-4 h-4 animate-pulse" />
        </p>
    </div>
);

// Desktop: the section pins and vertical scroll drives a horizontal track.
// Mobile: a native swipe row with snap points (pinning feels heavy on phones).
const HorizontalShowcase = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);

    useLayoutEffect(() => {
        const measure = () => {
            setIsDesktop(window.innerWidth >= 768);
            if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [isDesktop]); // re-measure once the desktop track has mounted

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
    const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
    const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    if (!isDesktop) {
        return (
            <section ref={sectionRef} className="grain relative bg-ink py-16 overflow-hidden">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-2">
                    <Intro />
                    {destinations.map((d, i) => <Panel key={d.name} d={d} i={i} progress={scrollYProgress} />)}
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative bg-ink" style={{ height: `calc(100vh + ${distance}px)` }}>
            <div className="grain sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div ref={trackRef} style={{ x: smoothX }} className="flex items-center gap-6 pl-[6vw] pr-[6vw] will-change-transform">
                    <Intro />
                    {destinations.map((d, i) => <Panel key={d.name} d={d} i={i} progress={scrollYProgress} />)}
                </motion.div>

                <div className="absolute bottom-10 left-[6vw] right-[6vw] flex items-center gap-6 text-white/40 text-[11px] uppercase tracking-[0.3em]">
                    <span>01</span>
                    <div className="relative flex-1 h-px bg-white/15 overflow-hidden">
                        <motion.div style={{ scaleX: bar }} className="absolute inset-0 bg-secondary origin-left" />
                    </div>
                    <span>0{destinations.length}</span>
                </div>
            </div>
        </section>
    );
};

export default HorizontalShowcase;
