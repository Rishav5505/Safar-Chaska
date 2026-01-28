import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import Reveal from '../common/Reveal';

const feed = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400",
];

const SocialSection = () => {
    return (
        <section className="py-8 md:py-20 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-8 md:mb-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <Reveal width="100%">
                            <span className="text-primary font-black uppercase tracking-widest text-xs md:text-sm mb-4 block">Our Community</span>
                        </Reveal>
                        <Reveal width="100%">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">Follow The <br className="hidden md:block" /> Adventure.</h2>
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {feed.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Instagram Post" />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
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
                </div>
            </div>
        </section>
    );
};

export default SocialSection;
