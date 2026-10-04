import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import useWishlist from '../../hooks/useWishlist';
import TiltCard from '../effects/TiltCard';
import { formatINR, discountPercent, onImageError } from '../../utils/format';

// Image-first package card used on Home, Packages and "similar trips".
const PackageCard = ({ pkg, index = 0, className = '' }) => {
    const { has, toggle } = useWishlist();
    const saved = has(pkg._id);
    const off = discountPercent(pkg.price, pkg.originalPrice);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            <TiltCard max={6}>
            <Link to={`/destination/${pkg._id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium bg-ink">
                    <img
                        src={pkg.image}
                        loading="lazy"
                        onError={onImageError}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-premium group-hover:scale-110"
                        alt={pkg.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />

                    <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                            {(pkg.tag || pkg.category) && (
                                <span className="py-1.5 px-3.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                                    {pkg.tag || pkg.category}
                                </span>
                            )}
                            {off > 0 && (
                                <span className="py-1.5 px-3 bg-secondary text-ink rounded-full text-[10px] font-bold uppercase tracking-[0.15em]">
                                    {off}% off
                                </span>
                            )}
                        </div>
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => { e.preventDefault(); toggle(pkg._id); }}
                            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                            aria-pressed={saved}
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors duration-300 ${saved ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/15 border-white/25 text-white hover:bg-white hover:text-rose-500'}`}
                        >
                            <motion.span key={saved ? 'on' : 'off'} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
                                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                            </motion.span>
                        </motion.button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-secondary-light mb-2">
                            <MapPin className="w-3 h-3" /> {pkg.location}
                        </p>
                        <h3 className="font-serif font-light !text-white text-2xl md:text-[1.7rem] leading-tight mb-4">{pkg.title}</h3>
                        <div className="flex items-end justify-between pt-4 border-t border-white/15">
                            <div>
                                <p className="flex items-center gap-3 text-xs text-white/60 mb-1.5">
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
                                    {pkg.rating && (
                                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-secondary fill-secondary" /> {Number(pkg.rating).toFixed(1)}</span>
                                    )}
                                </p>
                                <p className="font-serif text-2xl leading-none">
                                    {formatINR(pkg.price)}
                                    {off > 0 && <span className="font-sans text-xs text-white/40 line-through ml-2">{formatINR(pkg.originalPrice)}</span>}
                                </p>
                            </div>
                            <span className="w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center transition-all duration-500 ease-premium group-hover:bg-secondary group-hover:rotate-45">
                                <ArrowUpRight className="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            </TiltCard>
        </motion.div>
    );
};

export default PackageCard;
