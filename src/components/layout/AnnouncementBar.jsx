import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
    return (
        <div className="bg-ink border-b border-white/10 py-2.5">
            <div className="container-custom">
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/80 text-[11px] md:text-xs uppercase tracking-[0.2em] text-center">
                    <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    <span>
                        <span className="font-serif italic normal-case tracking-normal text-secondary-light text-sm mr-1.5">Flat 20% off</span>
                        on group bookings for March
                    </span>
                    <Link to="/booking" className="group inline-flex items-center gap-1.5 text-white hover:text-secondary transition-colors">
                        <span className="relative">
                            Book now
                            <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current scale-x-0 origin-left transition-transform duration-500 ease-premium group-hover:scale-x-100" />
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
