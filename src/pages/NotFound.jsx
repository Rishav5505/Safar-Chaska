import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, MessageCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Button from '../components/common/Button';

const ease = [0.22, 1, 0.36, 1];

const NotFound = () => (
    <div className="bg-ink min-h-screen flex flex-col">
        <Navbar />
        <Seo title="Page not found" description="This trail doesn't exist — head back to explore Safar Chaska's Himalayan journeys." noindex />

        <section className="grain relative flex-1 flex items-center justify-center overflow-hidden px-4 py-32">
            <img src="/ladakh-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 animate-kenburns" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

            <div className="relative z-10 text-center text-white max-w-xl">
                <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease }}
                    className="mx-auto mb-8 w-16 h-16 rounded-full border border-secondary/40 text-secondary flex items-center justify-center"
                >
                    <motion.span animate={{ rotate: [0, 25, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                        <Compass className="w-7 h-7" />
                    </motion.span>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="eyebrow !text-secondary justify-center mb-4">
                    Error 404
                </motion.p>
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease }}
                    className="font-serif font-light !text-white text-5xl md:text-7xl leading-[1.05]"
                >
                    Looks like you've gone <em className="italic text-secondary-light">off-trail.</em>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-white/60 leading-relaxed">
                    The page you were looking for has wandered off into the mountains. Let's get you back to base camp.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/">
                        <Button size="lg" className="w-full sm:w-auto rounded-full px-8 text-base"><ArrowLeft className="w-4 h-4" /> Back to home</Button>
                    </Link>
                    <Link to="/packages">
                        <Button variant="glass" size="lg" className="w-full sm:w-auto rounded-full px-8 text-base">Explore journeys</Button>
                    </Link>
                </motion.div>
                <a href="https://wa.me/918171379469" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" /> Need help? Chat with a trip captain
                </a>
            </div>
        </section>
    </div>
);

export default NotFound;
