import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { onImageError } from '../../utils/format';

const ease = [0.76, 0, 0.24, 1];

// Curtain-style reveal: the frame wipes open from one side while the photo settles from a zoom.
const ImageReveal = ({ src, alt = '', className = '', imgClassName = '', from = 'bottom', delay = 0, children, ...imgProps }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-10% 0px' });

    const hidden = {
        bottom: 'inset(100% 0% 0% 0%)',
        top: 'inset(0% 0% 100% 0%)',
        left: 'inset(0% 100% 0% 0%)',
        right: 'inset(0% 0% 0% 100%)',
    }[from];

    return (
        <motion.div
            ref={ref}
            initial={{ clipPath: hidden }}
            animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 1.3, delay, ease }}
            className={`relative overflow-hidden ${className}`}
        >
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                onError={onImageError}
                initial={{ scale: 1.35 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full h-full object-cover ${imgClassName}`}
                {...imgProps}
            />
            {children}
        </motion.div>
    );
};

export default ImageReveal;
