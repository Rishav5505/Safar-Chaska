import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { formatINR } from '../../utils/format';

// Smoothly tweens between rupee values when the total changes
const AnimatedNumber = ({ value, className = '' }) => {
    const [display, setDisplay] = useState(value);
    const prev = useRef(value);

    useEffect(() => {
        const controls = animate(prev.current, value, {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        prev.current = value;
        return () => controls.stop();
    }, [value]);

    return <span className={`tabular-nums ${className}`}>{formatINR(display)}</span>;
};

export default AnimatedNumber;
