import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { ArrowRight, MapPin, Star, Shield, Zap, Heart, Globe, Compass, Camera, Sparkles, MoveRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';

import Reveal from '../components/common/Reveal';
import SectionHeader from '../components/common/SectionHeader';
import Magnetic from '../components/effects/Magnetic';
import VelocityMarquee from '../components/effects/VelocityMarquee';
import HorizontalShowcase from '../components/effects/HorizontalShowcase';
import SeasonFinder from '../components/effects/SeasonFinder';
import ImageReveal from '../components/effects/ImageReveal';
import CursorLabel from '../components/effects/CursorLabel';
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

// Import local images
import img1 from '../assets/optimized/IMG_1481.webp';
import img2 from '../assets/optimized/IMG_1497.webp';
import img3 from '../assets/optimized/IMG_2235.webp';
import img4 from '../assets/optimized/IMG_2237.webp';
import img5 from '../assets/optimized/IMG_2239.webp';
import img6 from '../assets/optimized/IMG_3175.webp';
import img7 from '../assets/optimized/IMG_5983.webp';
import img8 from '../assets/optimized/IMG_7994.webp';
import img9 from '../assets/optimized/IMG_8022.webp';
import img10 from '../assets/optimized/IMG_8032.webp';


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

const HERO_INTERVAL = 6000;

const heroSlides = [
    { img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000", place: "Himalayan Ridges" },
    { img: img10, place: "High Peaks" },
    { img: img9, place: "Snow Trails" },
    { img: img3, place: "Forest Treks" },
];


const Home = () => {
    const heroRef = useRef(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    // Restarting on index change keeps manual clicks in sync with the progress bar.
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
        }, HERO_INTERVAL);
        return () => clearTimeout(timer);
    }, [currentHeroIndex]);

    // Preload hero images so crossfades never flash an empty frame.
    React.useEffect(() => {
        heroSlides.forEach(({ img }) => { const i = new Image(); i.src = img; });
    }, []);

    const galleryImages = [
        img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
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
        <div className="bg-sand min-h-screen flex flex-col selection:bg-primary selection:text-white overflow-x-clip">
            <Navbar />
            <Seo description="Handcrafted Himalayan journeys to Chakrata, Ladakh, Kashmir, Spiti and beyond — led by certified trip captains. Treks, honeymoons and weekend escapes from Delhi & Dehradun." />
            {/* Hero */}
            <section ref={heroRef} className="grain relative h-[100svh] min-h-[640px] flex items-end overflow-hidden bg-ink">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentHeroIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.6, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroSlides[currentHeroIndex].img}
                            alt={heroSlides[currentHeroIndex].place}
                            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

                <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="relative z-10 w-full container-custom pb-36 md:pb-44">
                    <div className="max-w-4xl text-white">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="eyebrow !text-secondary mb-6"
                        >
                            Himalayan Season · Now Booking
                        </motion.p>

                        <h1 className="font-serif font-light text-[2.75rem] leading-[1.02] sm:text-6xl md:text-8xl tracking-tight !text-white">
                            {['Explore the', 'unseen Himalayas.'].map((line, i) => (
                                <span key={i} className="block overflow-hidden pb-[0.08em]">
                                    <motion.span
                                        initial={{ y: '110%' }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1.2, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
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
                            Handcrafted journeys to the most secluded corners of Northern India — led by trusted mountain captains, designed for memories that last a lifetime.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 1 }}
                            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Magnetic className="w-full sm:w-auto">
                                <Link to="/packages" className="block">
                                    <Button size="lg" className="w-full sm:w-auto rounded-full px-9 text-base">
                                        Start Your Adventure <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </Magnetic>
                            <Magnetic className="w-full sm:w-auto">
                                <Link to="/about" className="block">
                                    <Button variant="glass" size="lg" className="w-full sm:w-auto rounded-full px-9 text-base">Our Story</Button>
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom bar: slide progress + quick stats */}
                <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/10 bg-ink/30 backdrop-blur-md">
                    <div className="container-custom flex items-center justify-between gap-6 py-5">
                        <div className="flex items-center gap-4 md:gap-6 flex-1 max-w-xl">
                            {heroSlides.map((slide, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentHeroIndex(i)}
                                    className="group flex-1 text-left py-2"
                                    aria-label={`Show ${slide.place}`}
                                >
                                    <div className="h-px w-full bg-white/20 overflow-hidden">
                                        {i === currentHeroIndex && (
                                            <motion.div
                                                key={currentHeroIndex}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: HERO_INTERVAL / 1000, ease: 'linear' }}
                                                className="h-full bg-secondary origin-left"
                                            />
                                        )}
                                    </div>
                                    <p className={`hidden md:block mt-3 text-[11px] uppercase tracking-[0.2em] transition-colors ${i === currentHeroIndex ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                                        <span className="font-serif italic normal-case tracking-normal text-secondary mr-2">0{i + 1}</span>{slide.place}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-10 text-white">
                            {[['10K+', 'Travellers'], ['4.9★', 'Rated'], ['15+', 'Destinations']].map(([v, l]) => (
                                <div key={l} className="text-right">
                                    <p className="font-serif text-2xl leading-none">{v}</p>
                                    <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="hidden md:flex absolute right-8 bottom-32 z-20 flex-col items-center gap-3 text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
                    <span className="block w-px h-14 bg-white/50 animate-scroll-cue" />
                </div>
            </section>

            {/* Destination marquee — reacts to scroll speed & direction */}
            <section className="bg-sand border-b border-ink/5 py-6 md:py-8">
                <VelocityMarquee
                    items={['Chakrata', 'Ladakh', 'Kashmir', 'Kedarnath', 'Spiti', 'Rajasthan', 'Manali', 'Sikkim', 'Kerala', 'Andaman']}
                    className="font-serif font-light italic text-4xl md:text-6xl text-ink/80"
                />
            </section>

            <PopularPackages />

            <HorizontalShowcase />

            <SeasonFinder />

            {/* Weather Widget */}
            <section className="py-16 md:py-24 bg-sand">
                <div className="container-custom">
                    <SectionHeader center eyebrow="Conditions" title={<>Live from <em>the peaks</em></>} subtitle="Real-time mountain weather, so you know exactly what to pack before you head out." />

                    <WeatherWidget location="Chakrata" />
                </div>
            </section>

            <InteractiveMap />

            <TravelQuiz />

            <WhyChooseUs />

            <MeetCaptains />

            {/* Experience Counters */}
            <section className="py-16 md:py-24 bg-ink overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="p-8 md:p-12 text-left border-r border-b border-white/10 group hover:bg-white/[0.03] transition-colors duration-500"
                            >
                                <stat.icon className="w-5 h-5 text-secondary mb-8 md:mb-12 opacity-80" />
                                <h3 className="font-serif font-light !text-white text-4xl md:text-6xl leading-none mb-3">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-white/45 uppercase tracking-[0.25em] text-[10px]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 md:py-28 bg-sand">
                <div className="container-custom">
                    <SectionHeader eyebrow="Experiences" title={<>Find your <em>vibe</em></>} subtitle="Handpicked experiences for every kind of soul — from summit pushes to slow village mornings." />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {categories.map((cat, i) => (
                            <Link key={i} to="/packages">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    className={`group relative h-[380px] lg:h-[460px] rounded-3xl overflow-hidden cursor-pointer shadow-premium ${i % 2 === 1 ? 'lg:mt-12' : ''}`}
                                >
                                    <ImageReveal src={cat.img} alt={cat.title} delay={i * 0.12} className="!absolute inset-0" imgClassName="transition-[filter] duration-700 group-hover:brightness-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>

                                    <div className="relative h-full p-8 flex flex-col justify-between text-white z-10 text-left">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                            <cat.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-serif italic text-secondary-light text-sm mb-1">0{i + 1}</p>
                                            <h3 className="font-serif font-light !text-white text-3xl mb-2">{cat.title}</h3>
                                            <p className="text-white/70 text-sm leading-relaxed max-w-[220px] lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-premium">
                                                {cat.desc}
                                            </p>
                                            <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/90">
                                                Explore <MoveRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16 md:py-28 bg-ink">
                <div className="container-custom">
                    <SectionHeader center dark eyebrow="Through Our Lens" title={<>The <em>epic</em> gallery</>} subtitle="Where every frame tells a story of courage and beauty — shot on our own trips." />



                    <CursorLabel label="View">
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                            {galleryImages.map((img, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => openLightbox(index)}
                                    aria-label={`Open gallery image ${index + 1}`}
                                    className="relative block w-full mb-4 break-inside-avoid rounded-2xl overflow-hidden group shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50"
                                >
                                    <ImageReveal
                                        src={img}
                                        alt={`Gallery image ${index + 1}`}
                                        from={['bottom', 'left', 'top', 'right'][index % 4]}
                                        delay={(index % 4) * 0.1}
                                        className="rounded-2xl"
                                        imgClassName="!h-auto grayscale-[30%] group-hover:grayscale-0 transition-[filter] duration-700"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-secondary/60 transition-all duration-500" />
                                </button>
                            ))}
                        </div>
                    </CursorLabel>

                </div>
            </section>

            {/* Featured */}
            <section className="py-16 md:py-28 bg-sand">
                <div className="container-custom">
                    <SectionHeader center eyebrow="Signature Journey" title={<>Escape to <em>Chakrata</em></>} />
                    <div className="max-w-6xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-premium flex flex-col md:flex-row">

                        <div className="md:w-1/2 h-[400px] md:h-auto md:min-h-[520px] overflow-hidden">
                            <ImageReveal src="/chakrata-group.webp" alt="Chakrata" from="left" className="w-full h-full" />
                        </div>

                        <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white text-left">
                            <h3 className="font-serif font-light text-3xl md:text-5xl text-ink mb-2 leading-[1.05]">
                                Chakrata Waterfall <span className="text-slate-300 mx-1">/</span> <br className="md:hidden" /><em className="text-primary">Moila Top</em>
                            </h3>


                            <p className="text-base md:text-lg text-slate-500 mb-8 mt-4">
                                4 Days / 3 Nights from <span className="font-serif text-3xl text-ink">₹6,999</span> <span className="text-sm text-slate-400 font-normal not-italic uppercase ml-1">per person</span>
                            </p>


                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10 border-t border-b border-slate-100 py-6">
                                <div className="text-center">
                                    <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight">Trusted Trip Captains</p>
                                </div>
                                <div className="text-center border-l border-slate-200 pl-2 md:pl-0">
                                    <p className="text-xl md:text-3xl font-black text-slate-900 mb-1 leading-none">10+</p>
                                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Years Exp.</p>
                                </div>
                                <div className="text-center border-l border-slate-200 pl-2 md:pl-0">
                                    <p className="text-xl md:text-3xl font-black text-slate-900 mb-1 leading-none">300+</p>
                                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Travellers</p>
                                </div>
                            </div>

                            <Link to="/chakrata">
                                <Button className="w-full py-4 md:py-5 text-sm rounded-full uppercase tracking-[0.2em]">View Full Experience <ArrowRight className="w-4 h-4" /></Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-16 md:py-28 bg-ink text-white">
                <div className="container-custom">
                    <SectionHeader center dark eyebrow="Our Promise" title={<>Safety in <em>every step</em></>} />
                </div>
                <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { icon: Shield, title: "Verified Captains", desc: "Led by certified mountain captains with years of experience." },
                        { icon: Zap, title: "Smart Bookings", desc: "No hidden costs. 100% transparency with digital confirmation." },
                        { icon: Heart, title: "Nature First", desc: "Eco-friendly footprints to preserve mountain beauty." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/10 p-10 rounded-3xl text-left group hover:border-secondary/40 hover:bg-white/[0.06] transition-all duration-500 cursor-default"
                        >
                            <div className="w-14 h-14 border border-secondary/30 text-secondary rounded-full flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-ink transition-all duration-500">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif font-light text-3xl mb-4 !text-white">{item.title}</h3>
                            <p className="text-white/55 leading-relaxed">{item.desc}</p>
                        </motion.div>
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
