import React, { useState } from 'react';
import { Clock, Star, MapPin, ArrowUpRight, ImageOff } from 'lucide-react';
import { formatINR, discountPercent, FALLBACK_IMAGE } from '../../utils/format';

// Image with its own broken-state; remount with key={src} to reset when the URL changes.
export const SafeImage = ({ src, alt = '', className = '', showBrokenNote = false }) => {
    const [broken, setBroken] = useState(false);
    if (!src) {
        return (
            <div className={`flex items-center justify-center bg-slate-100 text-slate-300 ${className}`}>
                <ImageOff className="w-6 h-6" />
            </div>
        );
    }
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={broken ? FALLBACK_IMAGE : src}
                alt={alt}
                onError={() => setBroken(true)}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {broken && showBrokenNote && (
                <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold bg-rose-500 text-white rounded-lg px-2 py-1 text-center">
                    Couldn&apos;t load this link, showing a placeholder
                </span>
            )}
        </div>
    );
};

// Simplified approximation of the public PackageCard so the owner sees roughly how it will look.
const PackageCardPreview = ({ pkg }) => {
    const price = Number(pkg.price) || 0;
    const original = Number(pkg.originalPrice) || 0;
    const off = discountPercent(price, original);
    const label = pkg.tag || pkg.category;

    return (
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
            <SafeImage key={pkg.image} src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/15 to-transparent pointer-events-none" />
            <div className="absolute top-4 inset-x-4 flex flex-wrap gap-2">
                {label && (
                    <span className="py-1.5 px-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                        {label}
                    </span>
                )}
                {off > 0 && (
                    <span className="py-1.5 px-3 bg-secondary text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]">
                        {off}% off
                    </span>
                )}
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-200 mb-2 truncate">
                    <MapPin className="w-3 h-3 shrink-0" /> {pkg.location || 'Location'}
                </p>
                <h3 className="font-serif font-light !text-white text-xl leading-tight mb-3 line-clamp-2">
                    {pkg.title || 'Your package title'}
                </h3>
                <div className="flex items-end justify-between pt-3 border-t border-white/15">
                    <div>
                        <p className="flex items-center gap-3 text-xs text-white/60 mb-1">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration || '—'}</span>
                            {pkg.rating !== '' && pkg.rating !== undefined && (
                                <span className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {Number(pkg.rating || 0).toFixed(1)}
                                </span>
                            )}
                        </p>
                        <p className="font-serif text-xl leading-none">
                            {formatINR(price)}
                            {off > 0 && <span className="font-sans text-xs text-white/40 line-through ml-2">{formatINR(original)}</span>}
                        </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PackageCardPreview;
