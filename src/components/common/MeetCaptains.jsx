import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Compass } from 'lucide-react';
import SectionHeader from './SectionHeader';

const ease = [0.22, 1, 0.36, 1];

const captains = [
    {
        name: "Jaspal Rana",
        role: "Founder & Captain",
        exp: "Founder",
        img: "/cap-jaspal.webp",
        specialty: "High Altitude Leadership",
        insta: "#"
    },
    {
        name: "Rishav",
        role: "Captain",
        exp: "8+ Years",
        img: "/cap-rishav.webp",
        specialty: "Expedition Planning",
        insta: "#"
    },
    {
        name: "Vinay Badnoriya",
        role: "Expert Trek Leader",
        exp: "6+ Years",
        img: "/cap-vinay.webp",
        specialty: "Mountain Safety Specialist",
        insta: "#"
    }
];

const MeetCaptains = () => {
    return (
        <section className="py-16 md:py-28 bg-sand">
            <div className="container-custom">
                <SectionHeader
                    center
                    eyebrow="The People"
                    title={<>Meet your <em>captains</em></>}
                    subtitle="Led by certified mountain professionals who know these trails by heart."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {captains.map((cap, i) => (
                        <motion.article
                            key={cap.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, delay: i * 0.1, ease }}
                            className={`group ${i === 1 ? 'lg:mt-12' : ''}`}
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ink shadow-premium">
                                <img
                                    src={cap.img}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-105"
                                    alt={`${cap.name}, ${cap.role}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                                <span className="absolute top-4 left-4 py-1.5 px-3.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                                    {cap.exp}
                                </span>

                                <a
                                    href={cap.insta}
                                    aria-label={`${cap.name} on Instagram`}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-500 hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>

                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-secondary-light mb-2">{cap.role}</p>
                                    <h3 className="font-serif font-light !text-white text-3xl leading-tight">{cap.name}</h3>
                                    <p className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2 text-sm text-white/70">
                                        <Compass className="w-4 h-4 text-secondary" /> {cap.specialty}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MeetCaptains;
