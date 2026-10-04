import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Mail } from 'lucide-react';
import Button from '../common/Button';
import SectionHeader from '../common/SectionHeader';

const ease = [0.22, 1, 0.36, 1];

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
        <section className="pt-0 pb-16 md:pb-28 bg-sand">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="relative overflow-hidden rounded-3xl bg-white shadow-premium px-6 py-12 sm:px-10 md:px-16 md:py-16"
                >
                    <div aria-hidden="true" className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-primary/10" />
                    <div aria-hidden="true" className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-primary/10" />

                    <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <SectionHeader
                            className="!mb-0"
                            eyebrow="The Trail Letter"
                            title={<>Stay <em>wild.</em></>}
                            subtitle="Exclusive trail maps and early-bird adventure deals, delivered to your inbox once a month."
                        />

                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="ok"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="flex items-start gap-5 rounded-2xl border border-primary/15 bg-sand/60 p-6 md:p-8"
                                        role="status"
                                    >
                                        <span className="shrink-0 w-12 h-12 rounded-full border border-primary/25 text-primary flex items-center justify-center">
                                            <Check className="w-5 h-5" />
                                        </span>
                                        <div>
                                            <h3 className="font-serif font-light text-2xl text-ink mb-1">You&rsquo;re subscribed</h3>
                                            <p className="text-slate-500">Welcome to the tribe. Check your inbox soon.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        exit={{ opacity: 0, y: -8 }}
                                        onSubmit={handleSubscribe}
                                        className="flex flex-col sm:flex-row gap-3"
                                    >
                                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                                        <div className="relative flex-grow">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                id="newsletter-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full bg-sand/70 border border-ink/10 rounded-full pl-12 pr-6 py-4 text-ink placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="group rounded-full px-8 py-4 shrink-0"
                                        >
                                            {status === 'loading' ? 'Sending…' : <>Join now <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" /></>}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            <p className="text-xs text-slate-400 mt-4 tracking-wide">No spam. Only high-altitude inspiration.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
