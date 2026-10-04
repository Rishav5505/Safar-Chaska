import { motion } from 'framer-motion';
import { EASE } from './bookingUtils';

// Circle + tick drawn with SVG path-length animation
const AnimatedCheck = ({ size = 96, delay = 0 }) => (
    <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
    >
        <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary/15"
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: delay + 0.6 }}
        />
        <svg viewBox="0 0 52 52" width={size} height={size} aria-hidden="true" className="relative">
            <motion.circle
                cx="26" cy="26" r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: delay + 0.1 }}
                style={{ rotate: -90, originX: '50%', originY: '50%' }}
            />
            <motion.circle
                cx="26" cy="26" r="20"
                className="fill-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 0.55 }}
                style={{ originX: '50%', originY: '50%' }}
            />
            <motion.path
                d="M16 27 l7 7 l13 -15"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: EASE, delay: delay + 0.85 }}
            />
        </svg>
    </motion.div>
);

export default AnimatedCheck;
