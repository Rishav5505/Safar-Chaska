import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Pulls its child gently toward the cursor while hovered (desktop only).
const Magnetic = ({ children, strength = 0.3, className = '' }) => {
    const ref = useRef(null);
    const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
    const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });

    const onMove = (e) => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={`inline-block ${className}`}>
            {children}
        </motion.div>
    );
};

export default Magnetic;
