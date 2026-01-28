import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Button from './Button';

const packages = [
    {
        title: "Chakrata Bliss",
        location: "Uttarakhand",
        price: "4,999",
        duration: "3D/2N",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
        link: "/destination/chakrata",
        tag: "Bestseller"
    },
    {
        title: "Shimla Heritage",
        location: "Himachal Pradesh",
        price: "6,499",
        duration: "4D/3N",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&q=80&w=800",
        link: "/destination/shimla",
        tag: "Popular"
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
        title: "Leh Ladakh Expedition",
        location: "Ladakh",
        price: "14,999",
        duration: "6D/5N",
        rating: "5.0",
        image: "/ladakh-hero.png",
        link: "/destination/ladakh",
        tag: "Dream Ride"
    }
];

const PopularPackages = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
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
                            <div className="p-8 flex-grow flex flex-col">
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
