import { motion } from 'framer-motion';
import Reveal from './Reveal';

// Usage: title may contain <em>…</em> for an italic accent word.
const SectionHeader = ({ eyebrow, title, subtitle, center = false, dark = false, className = '' }) => {
    return (
        <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className}`}>
            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`eyebrow mb-5 ${dark ? 'text-secondary' : ''}`}
                >
                    {eyebrow}
                </motion.p>
            )}

            <Reveal center={center} width="100%">
                <h2 className={`heading-premium text-4xl md:text-6xl ${dark ? '!text-white [&_em]:!text-secondary' : ''}`}>
                    {title}
                </h2>
            </Reveal>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`mt-5 text-base md:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${dark ? 'text-white/60' : 'text-slate-500'}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
