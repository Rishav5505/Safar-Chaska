import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Sun, Check, X, Phone, Mail, Shield, Mountain, Heart, Zap, Car, Expand } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import Lightbox from '../components/common/Lightbox';
import { chakrataData } from '../data/chakrata';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, delay: i * 0.08, ease },
});

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const inputCls = "w-full bg-sand/60 border border-ink/10 rounded-2xl px-5 py-3.5 text-ink placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all duration-300";
const labelCls = "text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2 block";

const Chakrata = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        guests: '2',
        message: ''
    });

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const itineraryImages = [
        chakrataData.images.hero,
        ...chakrataData.images.others
    ];

    const openLightbox = (imageIndex) => {
        setCurrentImageIndex(imageIndex);
        setIsLightboxOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Hi, I want to book Chakrata package for ${formData.guests} guests on ${formData.date}. Name: ${formData.name}, Phone: ${formData.phone}`;
        window.open(`https://wa.me/918171379469?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const quickStats = [
        { label: "Altitude", value: "7,000+ ft", icon: Mountain },
        { label: "Best Season", value: "March – Oct", icon: Sun },
        { label: "From Delhi", value: "330 km", icon: Car },
        { label: "Difficulty", value: "Moderate", icon: Zap }
    ];

    const price = chakrataData.packages[0].price;

    return (
        <div className="bg-sand min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            <Seo title={'Chakrata Trip'} description="Chakrata Waterfall & Moila Top escape — 4 days of deodar forests, Tiger Falls, meadow treks and bonfire nights in Uttarakhand's best-kept secret." />

            {/* Hero */}
            <section ref={heroRef} className="grain relative h-[100svh] min-h-[680px] flex items-end overflow-hidden bg-ink">
                <img src={chakrataData.images.hero} alt="Misty Deodar forests of Chakrata" className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

                <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 w-full container-custom pb-48 md:pb-44">
                    <div className="max-w-4xl text-white">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="eyebrow !text-secondary mb-6"
                        >
                            {chakrataData.state}, India
                        </motion.p>
                        <h1 className="font-serif font-light text-[2.75rem] leading-[1.02] sm:text-6xl md:text-8xl tracking-tight !text-white">
                            {['Explore', `${chakrataData.name}.`].map((line, i) => (
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
                            Escape to the mist-covered mountains where dense forests of Deodar and Oak whisper secrets of the old world.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 1 }}
                            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Button onClick={() => scrollToId('itinerary')} size="lg" className="w-full sm:w-auto rounded-full px-9 text-base">
                                Plan your trip <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => scrollToId('booking')} variant="glass" size="lg" className="w-full sm:w-auto rounded-full px-9 text-base">
                                Book now
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick stats bar */}
                <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/10 bg-ink/30 backdrop-blur-md">
                    <div className="container-custom grid grid-cols-2 md:grid-cols-4">
                        {quickStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 1.1 + i * 0.08, ease }}
                                className={`py-4 md:py-6 flex items-center gap-3 md:gap-4 text-white ${i % 2 === 1 ? 'pl-4 md:pl-0' : ''} ${i > 0 ? 'md:pl-8 md:border-l md:border-white/10' : ''} ${i < 2 ? 'border-b border-white/10 md:border-b-0' : ''}`}
                            >
                                <stat.icon className="w-4 h-4 text-secondary shrink-0" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{stat.label}</p>
                                    <p className="font-serif text-lg md:text-xl leading-tight">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Package summary */}
            <section className="py-16 md:py-28 bg-sand">
                <div className="container-custom">
                    <motion.div {...fadeUp()} className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-premium flex flex-col lg:flex-row">
                        <div className="lg:w-7/12 p-8 sm:p-10 lg:p-16">
                            <SectionHeader className="!mb-10" eyebrow="Inclusive Package" title={<>Handcrafted mountain <em>getaway</em></>} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                                {[
                                    { icon: Clock, label: "Duration", value: chakrataData.packageSummary.duration },
                                    { icon: MapPin, label: "Coverage", value: chakrataData.packageSummary.destinations },
                                    { icon: Heart, label: "Meals", value: chakrataData.packageSummary.meals },
                                    { icon: Shield, label: "Stay", value: chakrataData.packageSummary.stay }
                                ].map((item, i) => (
                                    <motion.div key={item.label} {...fadeUp(i)} className="flex gap-4">
                                        <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5" />
                                        </span>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                                            <p className="text-ink leading-snug">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="grain relative lg:w-5/12 bg-ink p-8 sm:p-10 lg:p-16 text-white flex flex-col justify-center overflow-hidden">
                            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/25 blur-[100px]" />
                            <div className="relative z-[2]">
                                <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-4">Best price guaranteed</p>
                                <p className="font-serif font-light text-6xl md:text-7xl leading-none mb-3">₹{price.toLocaleString('en-IN')}</p>
                                <p className="text-white/50 mb-10">Per person · all inclusive</p>
                                <Button onClick={() => scrollToId('booking')} variant="secondary" size="lg" className="group w-full rounded-full">
                                    Secure my spot <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                </Button>
                                <p className="mt-6 text-xs text-white/50 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-secondary" /> No hidden taxes
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="py-16 md:py-28 bg-ink scroll-mt-20">
                <div className="container-custom">
                    <SectionHeader dark center eyebrow="Day by Day" title={<>Your 4-day <em>journey</em></>} subtitle="A gentle rhythm of forest trails, waterfalls and slow mountain evenings." />

                    <div className="relative max-w-6xl mx-auto">
                        <div aria-hidden="true" className="hidden md:block absolute left-[1.45rem] top-2 bottom-2 w-px bg-white/10" />
                        <div className="space-y-6 md:space-y-10">
                            {chakrataData.itinerary.map((item, index) => {
                                const imgIndex = index === 0 ? 0 : 1 + (index % chakrataData.images.others.length);
                                return (
                                    <motion.article key={item.day} {...fadeUp(0)} className="md:pl-20 relative">
                                        <span className="hidden md:flex absolute left-0 top-8 w-12 h-12 rounded-full border border-secondary/40 bg-ink text-secondary items-center justify-center font-serif italic text-lg">
                                            0{item.day}
                                        </span>
                                        <div className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row transition-colors duration-500 hover:border-secondary/40">
                                            <button
                                                type="button"
                                                onClick={() => openLightbox(imgIndex)}
                                                aria-label={`View photo for day ${item.day}: ${item.title}`}
                                                className="relative md:w-2/5 h-56 md:h-auto md:min-h-[260px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                            >
                                                <img
                                                    src={itineraryImages[imgIndex]}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
                                                    alt={item.title}
                                                />
                                                <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <Expand className="w-4 h-4" />
                                                </span>
                                            </button>
                                            <div className="md:w-3/5 p-7 md:p-10 flex flex-col justify-center">
                                                <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-3">
                                                    <span className="md:hidden font-serif italic normal-case tracking-normal text-base mr-2">0{item.day}</span>
                                                    Day {item.day}
                                                </p>
                                                <h3 className="font-serif font-light !text-white text-2xl md:text-3xl mb-4">{item.title}</h3>
                                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Inclusions */}
            <section className="py-16 md:py-28 bg-sand">
                <div className="container-custom">
                    <SectionHeader center eyebrow="Transparent Pricing" title={<>What&rsquo;s <em>included</em></>} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
                        <motion.div {...fadeUp(0)} className="bg-white rounded-3xl p-8 md:p-10 shadow-premium">
                            <h3 className="font-serif font-light text-2xl md:text-3xl text-ink mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-full border border-primary/20 text-primary flex items-center justify-center"><Check className="w-5 h-5" /></span>
                                Included
                            </h3>
                            <ul className="space-y-4">
                                {chakrataData.inclusions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div {...fadeUp(1)} className="rounded-3xl p-8 md:p-10 border border-ink/10">
                            <h3 className="font-serif font-light text-2xl md:text-3xl text-ink mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-full border border-ink/15 text-slate-400 flex items-center justify-center"><X className="w-5 h-5" /></span>
                                Not included
                            </h3>
                            <ul className="space-y-4">
                                {chakrataData.exclusions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-500">
                                        <X className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Booking */}
            <section id="booking" className="py-16 md:py-28 bg-ink scroll-mt-20 relative overflow-hidden">
                <div aria-hidden="true" className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary/10 blur-[120px]" />
                <div className="container-custom relative">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <SectionHeader dark className="!mb-10" eyebrow="Reserve" title={<>Ready for <em>the adventure?</em></>} subtitle="Leave your details and our trip captains will reach out within 30 minutes to finalise." />
                            <div className="space-y-6">
                                {[
                                    { icon: Phone, label: 'Call or WhatsApp', value: chakrataData.contact.phone, href: `tel:${chakrataData.contact.phone.replace(/\s/g, '')}` },
                                    { icon: Mail, label: 'Email support', value: 'ops@safarchaska.com', href: 'mailto:ops@safarchaska.com' },
                                ].map((c, i) => (
                                    <motion.a key={c.label} href={c.href} {...fadeUp(i)} className="group flex items-center gap-4 w-fit">
                                        <span className="w-12 h-12 rounded-full border border-secondary/30 text-secondary flex items-center justify-center transition-all duration-500 group-hover:bg-secondary group-hover:text-ink">
                                            <c.icon className="w-5 h-5" />
                                        </span>
                                        <span>
                                            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/45">{c.label}</span>
                                            <span className="block font-serif text-xl text-white">{c.value}</span>
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <motion.div {...fadeUp(1)} className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="ck-name" className={labelCls}>Name</label>
                                    <input id="ck-name" type="text" name="name" required value={formData.name} onChange={handleChange} className={inputCls} placeholder="John Doe" autoComplete="name" />
                                </div>
                                <div>
                                    <label htmlFor="ck-phone" className={labelCls}>Phone</label>
                                    <input id="ck-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+91 XXXX XXXX" autoComplete="tel" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="ck-date" className={labelCls}>Date</label>
                                        <input id="ck-date" type="date" name="date" required value={formData.date} onChange={handleChange} className={`${inputCls} text-sm`} />
                                    </div>
                                    <div>
                                        <label htmlFor="ck-guests" className={labelCls}>Guests</label>
                                        <select id="ck-guests" name="guests" value={formData.guests} onChange={handleChange} className={inputCls}>
                                            {[1, 2, 3, 4, 5, 6, '7+'].map((n) => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="group w-full rounded-full mt-2">
                                    Send request <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                </Button>
                                <p className="text-center text-slate-400 text-xs">Fast response via WhatsApp message.</p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTA />
            <Footer />

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={itineraryImages}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
            />
        </div>
    );
};

export default Chakrata;
