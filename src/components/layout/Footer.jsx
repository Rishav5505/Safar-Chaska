import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.22, 1, 0.36, 1];

const socials = [
    { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: Facebook, label: 'Facebook', href: '#' },
    { Icon: Twitter, label: 'Twitter', href: '#' },
    { Icon: Youtube, label: 'YouTube', href: '#' },
];

const trails = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Expeditions' },
    { to: '/chakrata', label: 'Chakrata' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Get Help' },
];

const Footer = () => {
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);
    const year = new Date().getFullYear();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail('');
    };

    return (
        <footer className="relative bg-ink text-white overflow-hidden">
            <div className="container-custom pt-20 md:pt-28">
                {/* Statement + newsletter */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20 border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease }}
                        className="lg:col-span-7"
                    >
                        <p className="eyebrow !text-secondary mb-6">Safar Chaska</p>
                        <h2 className="font-serif font-light !text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
                            The mountains are calling. <em className="italic text-secondary-light">Let&rsquo;s answer together.</em>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1, ease }}
                        className="lg:col-span-5 lg:pt-14"
                    >
                        <p className="text-white/60 leading-relaxed mb-6">
                            Monthly trail notes, new departures and private deals — no noise, just mountains.
                        </p>
                        <AnimatePresence mode="wait">
                            {done ? (
                                <motion.p
                                    key="done"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 text-white/80 py-4"
                                    role="status"
                                >
                                    <span className="w-9 h-9 rounded-full border border-secondary/40 text-secondary flex items-center justify-center"><Check className="w-4 h-4" /></span>
                                    Welcome to the tribe — see you on the trail.
                                </motion.p>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="group flex items-center border-b border-white/20 focus-within:border-secondary transition-colors duration-500">
                                    <label htmlFor="footer-email" className="sr-only">Email address</label>
                                    <input
                                        id="footer-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="flex-1 min-w-0 bg-transparent py-4 text-base text-white placeholder:text-white/35 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        className="shrink-0 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 ease-premium hover:bg-secondary hover:border-secondary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Link columns */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 py-14 md:py-16">
                    <div className="col-span-2 md:col-span-5">
                        <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Safar Chaska home">
                            <span className="w-11 h-11 rounded-full overflow-hidden border border-white/15">
                                <img src="/logo.webp" alt="Safar Chaska logo" className="w-full h-full object-cover" />
                            </span>
                            <span className="font-serif text-2xl font-light">Safar <em className="italic text-secondary-light">Chaska</em></span>
                        </Link>
                        <p className="mt-5 text-white/50 leading-relaxed text-sm max-w-sm">
                            Handcrafting raw and premium mountain experiences for the modern soul. Founded on the trails of Chakrata.
                        </p>
                        <div className="mt-7 flex items-center gap-3">
                            {socials.map(({ Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={label}
                                    className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all duration-500 ease-premium hover:border-secondary hover:text-secondary hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] !text-white/40 mb-6 font-sans">Quick trails</h4>
                        <ul className="space-y-3.5">
                            {trails.map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to} className="group inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors duration-300">
                                        <span className="relative">
                                            {l.label}
                                            <span className="absolute left-0 -bottom-0.5 h-px w-full bg-secondary scale-x-0 origin-left transition-transform duration-500 ease-premium group-hover:scale-x-100" />
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-secondary" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] !text-white/40 mb-6 font-sans">Reach out</h4>
                        <ul className="space-y-4 text-white/75 text-sm">
                            <li>
                                <a href="tel:+918171379469" className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-secondary shrink-0" /> +91 81713 79469
                                </a>
                            </li>
                            <li>
                                <a href="mailto:ops@safarchaska.com" className="flex items-center gap-3 hover:text-white transition-colors break-all">
                                    <Mail className="w-4 h-4 text-secondary shrink-0" /> ops@safarchaska.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-secondary shrink-0" /> Chakrata, Uttarakhand
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
                    <p>© {year} Safar Chaska. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Credits</a>
                        <Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>

            {/* Giant faded wordmark */}
            <div aria-hidden="true" className="pointer-events-none select-none -mb-[0.22em] overflow-hidden">
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease }}
                    className="font-serif font-light italic text-center whitespace-nowrap leading-none text-[19vw] tracking-tight bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-transparent"
                >
                    Safar Chaska
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
