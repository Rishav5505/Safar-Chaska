import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="pt-2 md:pt-4 pb-12 md:pb-24 bg-primary selection:text-primary selection:bg-white text-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 text-center md:text-left">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">Stay <span className="text-secondary">Wild.</span></h2>
                        </Reveal>
                        <p className="text-white/70 leading-relaxed font-light text-lg italic">Get exclusive trail maps and early-bird adventure deals directly in your inbox.</p>

                    </div>

                    <div className="md:w-1/2 w-full">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
                            >
                                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-white" />
                                <h3 className="text-xl font-bold mb-2">You're Subscribed!</h3>
                                <p className="text-white/70">Welcome to the tribe. Check your inbox soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all font-medium"
                                />
                                <Button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-secondary text-white hover:bg-white hover:text-primary px-10 rounded-xl py-4 h-auto font-bold shrink-0 transition-all"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Join Now'}
                                </Button>
                            </form>
                        )}
                        <p className="text-xs text-white/40 mt-4 text-center md:text-left">No spam. Only high-altitude inspiration.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
