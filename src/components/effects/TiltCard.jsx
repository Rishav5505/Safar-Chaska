import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// 3D tilt that follows the cursor, with a soft glare highlight. Inert on touch screens.
const TiltCard = ({ children, max = 8, className = '', glare = true }) => {
    const ref = useRef(null);
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const spring = { stiffness: 180, damping: 18, mass: 0.6 };

    const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
    const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
    const glareX = useTransform(px, (v) => `${v * 100}%`);
    const glareY = useTransform(py, (v) => `${v * 100}%`);
    const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 55%)`;
    const glareOpacity = useSpring(0, spring);

    const onMove = (e) => {
        if (!canHover()) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glareOpacity.set(1);
    };

    const onLeave = () => {
        px.set(0.5);
        py.set(0.5);
        glareOpacity.set(0);
    };

    return (
        <div style={{ perspective: 1000 }} className={className}>
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative will-change-transform"
            >
                {children}
                {glare && (
                    <motion.div
                        aria-hidden="true"
                        style={{ background: glareBg, opacity: glareOpacity }}
                        className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-overlay z-10"
                    />
                )}
            </motion.div>
        </div>
    );
};

export default TiltCard;
