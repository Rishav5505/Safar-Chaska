import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Minimal brand intro — shown once per session, about a second long.
const Loader = ({ duration = 1.1 }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
            className="grain fixed inset-0 z-[10000] bg-ink flex items-center justify-center overflow-hidden"
            role="status"
            aria-label="Loading Safar Chaska"
        >
            <div className="relative z-10 flex flex-col items-center px-6">
                <motion.img
                    src="/logo.webp"
                    alt=""
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="w-12 h-12 rounded-full object-cover border border-white/15 mb-6"
                />
                <div className="overflow-hidden pb-[0.1em]">
                    <motion.p
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                        className="font-serif font-light text-white text-4xl sm:text-5xl tracking-tight"
                    >
                        Safar <em className="italic text-secondary-light">Chaska</em>
                    </motion.p>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/40"
                >
                    Himalayan journeys
                </motion.p>
                <div className="mt-8 w-40 h-px bg-white/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-secondary origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
