import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const testimonials = [
    {
        name: "Rishav",
        role: "Passionate Traveler",
        content: "Safar Chaska organized the best trip of my life to Chakrata. The local captains knew spots that weren't even on Google Maps. Truly an authentic experience!",
        avatar: "/rishav-test.jpg",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Content Creator",
        content: "As a photographer, I was looking for silent peaks and golden hours. The itinerary was perfectly paced, and the team was incredibly helpful. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        rating: 5
    },
    {
        name: "Ankit Verma",
        role: "Corporate Group",
        content: "We did a team building trip with 20 people. Everything was seamless - from transport to the bonfire nights. Safar Chaska is the gold standard for group travel.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        rating: 5
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="pt-2 md:pt-4 pb-12 md:pb-24 bg-white">
            <div className="container-custom">
                <div className="text-center mb-6 md:mb-10">
                    <Reveal center>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-4">ECHOES OF <span className="text-primary italic">ADVENTURE</span></h2>
                    </Reveal>
                    <p className="text-slate-500 mt-4 text-lg font-medium">Straight from the hearts of those who climbed with us.</p>

                </div>


                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shrink-0 shadow-lg">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src={testimonials[index].avatar}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </AnimatePresence>
                    </div>

                    <div className="flex-grow">
                        <div className="flex gap-1 mb-6">
                            {[...Array(testimonials[index].rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mb-10"
                            >
                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic mb-8">
                                    "{testimonials[index].content}"
                                </p>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{testimonials[index].name}</h4>
                                    <p className="text-primary font-bold uppercase text-[10px] tracking-widest mt-1">{testimonials[index].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-4">
                            <button onClick={prev} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={next} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
