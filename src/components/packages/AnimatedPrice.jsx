import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { formatINR } from '../../utils/format';

// Rupee amount that glides to its new value instead of jumping.
const AnimatedPrice = ({ value, className = '' }) => {
    const spring = useSpring(value, { stiffness: 120, damping: 22, mass: 0.6 });
    const text = useTransform(spring, (v) => formatINR(Math.round(v)));

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span className={className}>{text}</motion.span>;
};

export default AnimatedPrice;
