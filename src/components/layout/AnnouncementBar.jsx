import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
    return (
        <div className="bg-primary py-2.5 relative overflow-hidden">
            <motion.div
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light/20 to-primary opacity-50"
            ></motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-center gap-4 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                    <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                    <span>Flat 20% Off on Group Bookings for March</span>
                    <Link to="/booking" className="flex items-center gap-1 hover:underline decoration-2 underline-offset-4">
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
