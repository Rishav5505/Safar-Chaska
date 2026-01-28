import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';

const allPackages = [
    {
        title: "Chakrata Bliss",
        location: "Uttarakhand",
        price: "4,999",
        duration: "3D/2N",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
        link: "/destination/chakrata",
        category: "Adventure"
    },
    {
        title: "Shimla Heritage",
        location: "Himachal Pradesh",
        price: "6,499",
        duration: "4D/3N",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
        link: "/destination/shimla",
        category: "Honeymoon"
    },
    {
        title: "Manali Aurora",
        location: "Himachal Pradesh",
        price: "8,999",
        duration: "5D/4N",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
        link: "/destination/manali",
        category: "Adventure"
    },
    {
        title: "Rishikesh Yoga Retreat",
        location: "Uttarakhand",
        price: "3,999",
        duration: "3D/2N",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
        link: "/destination/rishikesh",
        category: "Wellness"
    },
    {
        title: "Rajasthan Royale",
        location: "Rajasthan",
        price: "12,999",
        duration: "6D/5N",
        rating: "4.9",
        image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800",
        link: "/destination/rajasthan",
        category: "Culture"
    },
    {
        title: "Leh Ladakh Expedition",
        location: "Ladakh",
        price: "14,999",
        duration: "6D/5N",
        rating: "5.0",
        image: "/ladakh-hero.png",
        link: "/destination/ladakh",
        category: "Adventure"
    }
];

const Packages = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Adventure', 'Honeymoon', 'Culture', 'Wellness'];

    const filteredPackages = allPackages.filter(pkg => {
        const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-slate-900 text-center text-white overflow-hidden">
                <div className="container-custom relative z-10">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl text-white">
                            Our Packages
                        </h1>
                    </Reveal>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        Handcrafted journeys for every kind of traveler.
                    </motion.p>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-12 -mt-16 relative z-20">
                <div className="container-custom">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search destinations..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="py-8 md:py-20">
                <div className="container-custom">
                    <AnimatePresence mode="wait">
                        {filteredPackages.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {filteredPackages.map((pkg, i) => (
                                    <motion.div
                                        key={pkg.title}
                                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                                            <div className="absolute top-4 left-4 py-1.5 px-4 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                                {pkg.category}
                                            </div>
                                        </div>
                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-primary font-bold uppercase text-[10px] tracking-widest mb-1 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {pkg.location}
                                                    </p>
                                                    <h3 className="text-2xl font-bold text-slate-900">{pkg.title}</h3>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-slate-900">₹{pkg.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 py-4 border-y border-slate-50 mb-6 text-sm font-medium text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-primary" /> {pkg.duration}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-secondary fill-secondary" /> {pkg.rating}
                                                </div>
                                            </div>
                                            <Link to={pkg.link} className="mt-auto">
                                                <Button className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                                    Explore Trip <ArrowUpRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-40">
                                <h3 className="text-2xl font-bold text-slate-900">No trails found.</h3>
                                <p className="text-slate-500 mt-2">Try searching for something else.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                    className="mt-6 text-primary font-bold underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Packages;
