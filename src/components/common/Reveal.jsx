import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Text rises from behind a mask — calmer and more editorial than a colour wipe.
const Reveal = ({ children, width = "fit-content", delay = 0.1, center = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden", margin: center ? "0 auto" : "0", paddingBottom: "0.1em" }}>
            <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
