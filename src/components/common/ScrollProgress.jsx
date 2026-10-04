import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin amber reading-progress bar pinned above everything (including the navbar).
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 inset-x-0 h-[2px] bg-secondary origin-left z-[9999] pointer-events-none"
        />
    );
};

export default ScrollProgress;
