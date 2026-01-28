import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Star, Shield, Zap, Heart, Globe, Compass, Camera, Sparkles, MoveRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import { chakrataData } from '../data/chakrata';

import Reveal from '../components/common/Reveal';
import Separator from '../components/common/Separator';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import PopularPackages from '../components/common/PopularPackages';
import WhyChooseUs from '../components/common/WhyChooseUs';
import MeetCaptains from '../components/common/MeetCaptains';
import InteractiveMap from '../components/common/InteractiveMap';
import TravelQuiz from '../components/common/TravelQuiz';
import WeatherWidget from '../components/common/WeatherWidget';
import Newsletter from '../components/layout/Newsletter';
import SocialSection from '../components/layout/SocialSection';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Lightbox from '../components/common/Lightbox';

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const numericValue = parseInt(value.replace(/,/g, '').replace('+', ''));
    const isDecimal = value.includes('.');
    const suffix = value.includes('+') ? '+' : '';

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 2000; // 2 seconds
                    const increment = numericValue / (duration / 16);

                    const animate = () => {
                        start += increment;
                        if (start < numericValue) {
                            setCount(start);
                            requestAnimationFrame(animate);
                        } else {
                            setCount(numericValue);
                        }
                    };
                    animate();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [numericValue, hasAnimated]);

    return (
        <span ref={countRef}>
            {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
            {suffix}
        </span>
    );
};

const Home = () => {
    const heroRef = useRef(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200"
    ];

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const stats = [
        { label: "Trips Completed", value: "2,500+", icon: Globe },
        { label: "Travelers Guided", value: "10,000+", icon: Heart },
        { label: "Average Rating", value: "4.9/5", icon: Star },
        { label: "Destinations", value: "15+", icon: MapPin },
    ];

    const categories = [
        {
            title: "Snow Treks",
            desc: "Climb through the white clouds",
            icon: Compass,
            color: "from-blue-600/60 to-slate-900/90",
            img: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=800"
        },
        {
            title: "Village Tours",
            desc: "Experience local traditions",
            icon: MapPin,
            color: "from-amber-600/60 to-slate-900/90",
            img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800"
        },
        {
            title: "Photography",
            desc: "Capture the golden hour",
            icon: Camera,
            color: "from-rose-600/60 to-slate-900/90",
            img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800"
        },
        {
            title: "Camping",
            desc: "Sleep under a billion stars",
            icon: Sparkles,
            color: "from-teal-600/60 to-slate-900/90",
            img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800"
        }
    ];

    return (
        <div className="bg-white min-h-screen flex flex-col selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            {/* Hero Section implementation... */}
            {/* ... keeping existing Hero code ... */}
            <section ref={heroRef} className="relative min-h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-40 md:pt-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600')` }}>
                    <div className="absolute inset-0 bg-slate-900/40"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-4 md:mb-8"
                    >
                        <span className="h-2 w-2 rounded-full bg-secondary"></span>
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">The Himalayan Season is Live</span>
                    </motion.div>

                    <Reveal width="100%" delay={0.2} center>
                        <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
                            Explore The Unseen <br />
                            <span className="text-gradient">Himalayas.</span>
                        </h1>
                    </Reveal>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-slate-200 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Handcrafted journeys to the most secluded corners of Northern India. Professional guides, safe travels, and lifetime memories.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/packages">
                            <Button size="lg" className="rounded-xl px-10">Start Your Adventure</Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20">Our Story</Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20">
                    <Separator variant="horizon" color="fill-white" height="h-16 md:h-32" />
                </div>
            </section>

            <PopularPackages />

            {/* Weather Widget */}
            <section className="py-8 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-10 md:mb-16">
                        <Reveal center>
                            <h2 className="text-4xl font-bold text-slate-900">Live From The Peaks</h2>
                        </Reveal>
                        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Get real-time updates before you head out.</p>
                    </div>
                    <WeatherWidget location="Chakrata" />
                </div>
            </section>

            <InteractiveMap />

            <TravelQuiz />

            <WhyChooseUs />

            <MeetCaptains />

            {/* Experience Counters */}
            <section className="py-8 md:py-20 bg-slate-50 overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl text-center shadow-sm border border-slate-100 group hover:shadow-xl transition-all"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-10 md:mb-16">
                        <Reveal center>
                            <h2 className="text-4xl font-bold text-slate-900">Find Your Vibe</h2>
                        </Reveal>
                        <p className="text-slate-500 mt-4">Handpicked experiences for every soul.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <Link key={i} to="/packages">
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative h-[320px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
                                >
                                    <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={cat.title} />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>

                                    <div className="relative h-full p-8 flex flex-col justify-between text-white z-10 text-left">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                            <cat.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:mb-4 transition-all">{cat.title}</h3>
                                            <p className="invisible group-hover:visible opacity-0 group-hover:opacity-100 text-white/90 text-[10px] font-medium leading-relaxed transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 max-w-[180px]">
                                                {cat.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-8 md:py-20 bg-slate-900">
                <div className="container-custom">
                    <div className="text-center mb-16 text-white">
                        <h2 className="text-4xl font-bold">Gallery of Dreams</h2>
                        <p className="text-white/40 mt-4 italic">Captured moments from our expeditions.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                        <div className="space-y-4">
                            <div onClick={() => openLightbox(0)} className="h-2/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[0]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div onClick={() => openLightbox(1)} className="h-1/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[1]} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div onClick={() => openLightbox(2)} className="h-1/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[2]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div onClick={() => openLightbox(3)} className="h-2/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[3]} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div onClick={() => openLightbox(4)} className="h-2/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[4]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div onClick={() => openLightbox(5)} className="h-1/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[5]} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div onClick={() => openLightbox(6)} className="h-1/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[6]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div onClick={() => openLightbox(7)} className="h-2/3 rounded-2xl overflow-hidden cursor-pointer">
                                <img src={galleryImages[7]} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured */}
            <section className="py-8 md:py-20 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Escape to Chakrata</h2>
                    </div>
                    <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-[400px] md:h-auto overflow-hidden">
                            <img src={chakrataData.images.hero} alt="Chakrata" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:w-1/2 p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">The Pristine Jewel of Uttarakhand</h3>
                            <p className="text-slate-600 mb-10 leading-relaxed text-lg">Experience dense Deodar forests and cascading waterfalls in our curated Chakrata experience.</p>
                            <div className="pt-8 border-t border-slate-100 mb-8">
                                <p className="text-slate-400 font-bold uppercase text-[10px] mb-1">Starts @</p>
                                <p className="text-4xl font-bold text-slate-900">₹4,999</p>
                            </div>
                            <Link to="/chakrata">
                                <Button className="w-full py-4 rounded-xl font-bold">View Full Experience</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-8 md:py-20 bg-slate-900 text-white">
                <div className="container-custom text-center mb-16">
                    <h2 className="text-4xl font-bold">Safety In Every Step</h2>
                </div>
                <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { icon: Shield, title: "Verified Captains", desc: "Led by certified mountain captains with years of experience." },
                        { icon: Zap, title: "Smart Bookings", desc: "No hidden costs. 100% transparency with digital confirmation." },
                        { icon: Heart, title: "Nature First", desc: "Eco-friendly footprints to preserve mountain beauty." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                            <div className="w-14 h-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Testimonials />
            <SocialSection />
            <FAQ />
            <Newsletter />
            <CTA />
            <Footer />

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={galleryImages}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
            />
        </div>
    );
};

export default Home;
