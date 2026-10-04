import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COLORS = ['#0F766E', '#2DD4BF', '#F59E0B', '#FCD34D', '#0B1215', '#EDE6DA'];

// Deterministic pseudo-random so renders stay pure
const rand = (seed) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
};

// A single, light burst of particles from the centre — no dependencies
const Confetti = ({ count = 36, delay = 0.9 }) => {
    const reduce = useReducedMotion();
    const pieces = useMemo(() => Array.from({ length: count }, (_, i) => {
        const angle = rand(i + 1) * Math.PI * 2;
        const dist = 120 + rand(i + 7) * 180;
        return {
            id: i,
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.75 - 40,
            fall: 140 + rand(i + 13) * 120,
            rotate: rand(i + 3) * 720 - 360,
            w: 5 + rand(i + 5) * 5,
            h: rand(i + 11) > 0.5 ? 10 + rand(i + 2) * 6 : 6,
            round: rand(i + 17) > 0.7,
            color: COLORS[i % COLORS.length],
            d: rand(i + 19) * 0.15,
        };
    }), [count]);

    if (reduce) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-12 w-0 h-0 z-0">
            {pieces.map((p) => (
                <motion.span
                    key={p.id}
                    className="absolute block"
                    style={{
                        width: p.w,
                        height: p.round ? p.w : p.h,
                        background: p.color,
                        borderRadius: p.round ? '9999px' : '2px',
                        marginLeft: -p.w / 2,
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
                    animate={{
                        x: [0, p.x, p.x * 1.1],
                        y: [0, p.y, p.y + p.fall],
                        opacity: [0, 1, 0],
                        rotate: p.rotate,
                        scale: 1,
                    }}
                    transition={{ duration: 2.2, delay: delay + p.d, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
        </div>
    );
};

export default Confetti;
