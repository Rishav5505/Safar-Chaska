import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const R = 22;

// Circular button with a ring that fills as the page scrolls.
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    useMotionValueEvent(scrollY, 'change', (y) => setIsVisible(y > 500));

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="group fixed bottom-[5.5rem] right-6 z-50 w-14 h-14 rounded-full bg-ink/90 backdrop-blur-md text-white flex items-center justify-center shadow-premium transition-colors duration-500 hover:bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                >
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
                        <circle cx="28" cy="28" r={R} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
                        <motion.circle
                            cx="28" cy="28" r={R}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            style={{ pathLength: progress }}
                        />
                    </svg>
                    <ArrowUp className="relative w-4 h-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
