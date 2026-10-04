import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// While the pointer is inside, a round label (e.g. "View") trails the cursor. Desktop only.
const CursorLabel = ({ label = 'View', children, className = '' }) => {
    const ref = useRef(null);
    const [active, setActive] = useState(false);
    const x = useSpring(useMotionValue(0), { stiffness: 400, damping: 30, mass: 0.5 });
    const y = useSpring(useMotionValue(0), { stiffness: 400, damping: 30, mass: 0.5 });

    const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const onMove = (e) => {
        if (!fine()) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        if (!active) setActive(true);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setActive(false)}
            className={`relative ${active ? 'cursor-none' : ''} ${className}`}
        >
            {children}
            <AnimatePresence>
                {active && (
                    <motion.div
                        aria-hidden="true"
                        style={{ x, y }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="pointer-events-none absolute top-0 left-0 z-50 -ml-12 -mt-12 w-24 h-24 rounded-full bg-secondary text-ink flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.25em] shadow-[0_20px_40px_-15px_rgba(245,158,11,0.6)]"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CursorLabel;
