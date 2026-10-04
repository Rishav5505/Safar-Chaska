import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';

const wrap = (min, max, v) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

// Endless text strip that speeds up — and flips direction — with the user's scroll.
const VelocityMarquee = ({ items, baseVelocity = -2.5, className = '' }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
    const direction = useRef(1);
    const reduceMotion = useReducedMotion();

    // Content is rendered 4x, so wrapping across one quarter loops seamlessly.
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (reduceMotion) return;
        let moveBy = direction.current * baseVelocity * (delta / 1000);
        const vf = velocityFactor.get();
        if (vf < 0) direction.current = -1;
        else if (vf > 0) direction.current = 1;
        moveBy += direction.current * moveBy * vf;
        baseX.set(baseX.get() + moveBy);
    });

    const row = (
        <span className="flex shrink-0 items-center">
            {items.map((item) => (
                <span key={item} className="flex items-center">
                    <span className="px-6 md:px-10">{item}</span>
                    <span className="text-secondary text-[0.5em]" aria-hidden="true">✦</span>
                </span>
            ))}
        </span>
    );

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-label={items.join(', ')}>
            <motion.div style={{ x }} className="flex w-max" aria-hidden="true">
                {row}{row}{row}{row}
            </motion.div>
        </div>
    );
};

export default VelocityMarquee;
