import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Button from './Button';
import API from '../../utils/api';

const PopularPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                if (data && data.length > 0) {
                    // Show featured packages first, or just the first 4
                    const sortedData = data
                        .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
                        .slice(0, 4)
                        .map(pkg => ({
                            ...pkg,
                            price: pkg.price.toLocaleString(),
                            rating: pkg.rating || "4.9",
                            link: `/destination/${pkg._id}`,
                            tag: pkg.tag || (pkg.isFeatured ? "Featured" : "Trending")
                        }));

                    setPackages(sortedData);
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    if (packages.length === 0) return null;

    return (
        <section className="pt-4 md:pt-12 pb-8 md:pb-24 bg-white text-slate-900">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    <div className="text-center md:text-left">
                        <Reveal center>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Popular Escapes</h2>
                        </Reveal>
                        <p className="text-slate-500 mt-2">Handpicked journeys for every kind of traveler.</p>
                    </div>
                    <Link to="/packages">
                        <Button variant="outline" className="rounded-full px-8">View All Packages</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.title} />
                                <div className="absolute top-4 left-4 py-1.5 px-4 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                    {pkg.tag}
                                </div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col text-left">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-primary font-bold uppercase text-[10px] tracking-widest mb-1">{pkg.location}</p>
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
                                        Details <ArrowUpRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;
