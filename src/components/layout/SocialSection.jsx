import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import Reveal from '../common/Reveal';

const feed = [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop", // Trekking/Hiking
    "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=600&auto=format&fit=crop", // River Rafting
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop", // Camping/Bonfire
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=600&auto=format&fit=crop", // Friends/Group Travel
];




const SocialSection = () => {
    return (
        <section className="pt-2 md:pt-4 pb-8 md:pb-16 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-6 md:mb-10">
                    <div className="max-w-2xl text-center md:text-left">
                        <Reveal width="100%">
                            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 block">Join Our Community</span>
                        </Reveal>
                        <Reveal width="100%">
                            <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">LIVE THE <br className="hidden md:block" /> STORY.</h2>
                        </Reveal>
                    </div>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-slate-950 text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:scale-105 hover:bg-slate-900 transition-all shadow-2xl h-fit w-full md:w-auto justify-center"
                    >
                        <Instagram className="w-6 h-6 md:w-8 md:h-8" />
                        @SafarChaska
                    </a>
                </div>

                <div className="relative mt-12 overflow-hidden group">
                    <motion.div
                        className="flex gap-4 w-max"
                        animate={{
                            x: [0, -1344]
                        }}


                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 15,
                                ease: "linear"
                            }
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {/* Duplicate the feed to make it infinite */}
                        {[...feed, ...feed, ...feed].map((img, i) => (
                            <motion.div
                                key={i}
                                className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
                            >
                                <img src={img} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" alt="Instagram Post" />
                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white group/item">
                                    <span className="flex items-center gap-2 font-black">
                                        <Heart className="w-6 h-6 fill-white" />
                                        1.2k
                                    </span>
                                    <span className="flex items-center gap-2 font-black">
                                        <MessageCircle className="w-6 h-6 fill-white" />
                                        48
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default SocialSection;
