import { motion, AnimatePresence } from 'framer-motion';

// Smoothly animates its children's height in and out.
const Collapse = ({ open, children, id }) => (
    <AnimatePresence initial={false}>
        {open && (
            <motion.div
                id={id}
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export default Collapse;
