import React from 'react';
import { motion } from 'framer-motion';

// Subtle fade/rise used between routes. Opacity + small translate only,
// so fixed-position children (navbar, modals) are not affected by transforms after settling.
const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transitionEnd: { transform: 'none' } }}
        exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export default PageTransition;
