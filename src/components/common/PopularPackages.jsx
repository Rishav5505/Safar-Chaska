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

    const staticPackages = [

        {
            title: "Spiti Valley Circuit",
            location: "Himachal Pradesh",
            price: "21,999",
            duration: "9D/8N",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
            link: "/destination/shimla",
            tag: "Trending"
        },
        {
            title: "Manali Aurora",
            location: "Himachal Pradesh",
            price: "8,999",
            duration: "5D/4N",
            rating: "5.0",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
            link: "/destination/manali",
            tag: "Premium"
        },
        {
            title: "Sikkim Explorer",
            location: "Sikkim",
            price: "24,999",
            duration: "13D/12N",
            rating: "5.0",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
            link: "/destination/sikkim",
            tag: "Educational"
        },
        {
            title: "Kashmir Paradise",
            location: "J&K",
            price: "18,999",
            duration: "8D/7N",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
            link: "/destination/kashmir",
            tag: "Bestseller"
        }
    ];


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                if (data && data.length > 0) {
                    // Map backend data to match frontend structure if needed
                    const formattedData = data.map(pkg => ({
                        ...pkg,
                        price: pkg.price.toLocaleString(),
                        rating: pkg.rating || "4.9",
                        link: `/destination/${pkg._id}`,
                        tag: pkg.isFeatured ? "Featured" : "New"
                    }));
                    setPackages(formattedData);
                } else {
                    setPackages(staticPackages);
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
                setPackages(staticPackages);
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

    return (
        <section className="pt-4 md:pt-12 pb-8 md:pb-24 bg-white text-slate-900">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">

                    <div className="text-center md:text-left">
                        <Reveal>
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
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;
