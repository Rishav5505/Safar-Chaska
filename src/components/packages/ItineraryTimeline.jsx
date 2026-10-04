import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Collapse from './Collapse';

// Vertical day-by-day timeline whose spine draws itself as the reader scrolls.
const ItineraryTimeline = ({ days }) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(() => new Set([0]));
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

    const toggle = (i) =>
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    return (
        <div ref={ref} className="relative">
            <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-px bg-ink/10" aria-hidden="true" />
            <motion.div
                style={{ scaleY }}
                className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-primary via-primary to-secondary origin-top"
                aria-hidden="true"
            />

            <ol className="space-y-4">
                {days.map((item, i) => {
                    const isOpen = open.has(i);
                    const panelId = `day-panel-${i}`;
                    const dayNo = item.day ?? i + 1;
                    return (
                        <motion.li
                            key={`${dayNo}-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="relative pl-14 md:pl-20"
                        >
                            <span
                                className={`absolute left-0 top-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-colors duration-500 ${isOpen ? 'bg-primary border-primary text-white' : 'bg-sand border-ink/15 text-ink'}`}
                                aria-hidden="true"
                            >
                                <span className="font-serif italic text-base md:text-lg">{dayNo}</span>
                            </span>

                            <div className={`rounded-2xl border transition-colors duration-500 ${isOpen ? 'bg-white border-white shadow-premium' : 'bg-white/40 border-ink/10 hover:bg-white/70'}`}>
                                <h3 className="!font-sans">
                                    <button
                                        type="button"
                                        onClick={() => toggle(i)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-primary mb-1">
                                                Day <span className="font-serif italic normal-case tracking-normal text-sm">{dayNo}</span>
                                            </span>
                                            <span className="block font-serif font-light text-lg md:text-xl text-ink leading-snug break-words">{item.title}</span>
                                        </span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center text-ink"
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.span>
                                    </button>
                                </h3>
                                <Collapse open={isOpen} id={panelId}>
                                    <p className="px-5 md:px-6 pb-6 text-slate-600 leading-relaxed">{item.desc}</p>
                                </Collapse>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </div>
    );
};

export default ItineraryTimeline;
