import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Shield, Star, Globe, Compass, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import SectionHeader from '../components/common/SectionHeader';

// Import local images
import aboutHeroImg from '../assets/optimized/IMG_8032.webp';
import missionImg from '../assets/optimized/IMG_1481.webp';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, delay: i * 0.1, ease },
});

const About = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const imgRef = useRef(null);
    const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
    const imgY = useTransform(imgProgress, [0, 1], ['-6%', '6%']);

    const stats = [
        { label: "Happy Travelers", value: "2,500+", icon: Users },
        { label: "Destinations", value: "15+", icon: Globe },
        { label: "Guest Rating", value: "4.9/5", icon: Star },
        { label: "Safety Score", value: "100%", icon: Shield },
    ];

    return (
        <div className="bg-sand min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            <Seo title={'About Us'} description="Meet the trip captains behind Safar Chaska — a small team of mountain lovers running safe, eco-friendly Himalayan journeys since 2024." />

            {/* Hero */}
            <section ref={heroRef} className="grain relative h-[85svh] min-h-[560px] flex items-end overflow-hidden bg-ink">
                <img src={aboutHeroImg} alt="Trekkers on a Himalayan ridge at dusk" className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

                <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 w-full container-custom pb-20 md:pb-28">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="eyebrow !text-secondary mb-6"
                    >
                        About Safar Chaska
                    </motion.p>
                    <h1 className="font-serif font-light text-[2.75rem] leading-[1.02] sm:text-6xl md:text-8xl tracking-tight !text-white max-w-4xl">
                        {['Our story,', 'written in the hills.'].map((line, i) => (
                            <span key={i} className="block overflow-hidden pb-[0.08em]">
                                <motion.span
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1.2, delay: 0.35 + i * 0.15, ease }}
                                    className={`block ${i === 1 ? 'italic text-secondary-light' : ''}`}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="mt-6 md:mt-8 text-base md:text-lg text-white/75 max-w-xl leading-relaxed font-light"
                    >
                        From a group of trekking friends to a boutique Himalayan travel house — still guided by the same love for the peaks.
                    </motion.p>
                </motion.div>

                <div className="hidden md:flex absolute right-8 bottom-12 z-20 flex-col items-center gap-3 text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
                    <span className="block w-px h-14 bg-white/50 animate-scroll-cue" />
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 md:py-28 bg-sand">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
                        <div className="lg:col-span-6">
                            <SectionHeader
                                className="!mb-8"
                                eyebrow="The Safar Chaska Vision"
                                title={<>Authentic adventures, <em>guided by passion.</em></>}
                            />
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <motion.p {...fadeUp(1)}>
                                    Welcome to <span className="text-ink font-medium">Safar Chaska</span>, where we believe travel is more than just checking off destinations — it&rsquo;s about the connection between humans and the raw beauty of our planet.
                                </motion.p>
                                <motion.p {...fadeUp(2)}>
                                    Founded on the trails of the Himalayas, we evolved from a group of trekking enthusiasts into a professional travel boutique dedicated to creating seamless, safe, and soulful mountain experiences.
                                </motion.p>
                                <motion.blockquote {...fadeUp(3)} className="border-l-2 border-secondary pl-6 py-1 font-serif font-light italic text-2xl text-ink leading-snug">
                                    &ldquo;We bridge the gap between human curiosity and the whispering silence of the peaks.&rdquo;
                                </motion.blockquote>
                            </div>
                        </div>

                        <motion.div {...fadeUp(1)} className="lg:col-span-6 relative">
                            <div ref={imgRef} className="relative rounded-3xl overflow-hidden shadow-premium aspect-[4/5]">
                                <motion.img
                                    style={{ y: imgY }}
                                    src={missionImg}
                                    alt="Mountain expedition led by Safar Chaska captains"
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-8 left-4 sm:-left-8 bg-white p-6 md:p-7 rounded-3xl shadow-premium flex items-center gap-4">
                                <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center">
                                    <Zap className="w-5 h-5" />
                                </span>
                                <div>
                                    <p className="font-serif text-3xl text-ink leading-none">100%</p>
                                    <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px] mt-1">Pure satisfaction</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 md:py-28 bg-ink">
                <div className="container-custom">
                    <SectionHeader dark eyebrow="By the numbers" title={<>Small team, <em>big mountains</em></>} />
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                {...fadeUp(i)}
                                className="p-6 sm:p-8 md:p-12 border-r border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-500"
                            >
                                <stat.icon className="w-5 h-5 text-secondary mb-8 md:mb-12 opacity-80" />
                                <p className="font-serif font-light text-white text-4xl md:text-6xl leading-none mb-3">{stat.value}</p>
                                <p className="text-white/45 uppercase tracking-[0.25em] text-[10px]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-16 md:py-28 bg-sand text-center">
                <div className="container-custom max-w-4xl mx-auto">
                    <motion.span {...fadeUp(0)} className="w-14 h-14 rounded-full border border-primary/20 text-primary flex items-center justify-center mx-auto mb-10">
                        <Compass className="w-6 h-6" />
                    </motion.span>
                    <motion.h2 {...fadeUp(1)} className="heading-premium text-3xl sm:text-4xl md:text-6xl mb-8">
                        &ldquo;Tradition in hospitality, <br className="hidden md:block" /><em>innovation in exploration.</em>&rdquo;
                    </motion.h2>
                    <motion.p {...fadeUp(2)} className="eyebrow !text-slate-400">The Safar Chaska DNA</motion.p>
                </div>
            </section>

            <CTA />
            <Footer />
        </div>
    );
};

export default About;
