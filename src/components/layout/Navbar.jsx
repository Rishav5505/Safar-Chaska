import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="fixed top-0 w-full z-50">
            {/* Announcement Bar - Hidden on Scroll */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-primary py-2 relative overflow-hidden"
                    >
                        <div className="container-custom relative z-10 flex items-center justify-center gap-3 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
                            <Sparkles className="w-3 h-3 text-secondary" />
                            <span>Flat 20% Off on Group Bookings for March</span>
                            <Link to="/booking" className="inline-flex items-center gap-1 hover:underline">
                                Book Now <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navbar */}
            <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="container-custom flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md">
                            <img
                                src="/logo.jpg"
                                alt="Safar Chaska Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                            Safar<span className="text-secondary">Chaska.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${scrolled ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10'} ${location.pathname === link.path ? (scrolled ? 'text-primary bg-primary/5' : 'text-white bg-white/20') : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-px h-6 bg-slate-200/20 mx-4 hidden xl:block" />

                        <Link to="/booking">
                            <Button size="sm" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 rounded-xl transition-all ${scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 p-6 flex flex-col space-y-2"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-bold py-3 px-6 rounded-xl transition-all ${location.pathname === link.path ? 'bg-primary text-white' : 'text-slate-800 hover:bg-slate-50'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-2 border-t border-slate-100">
                                <Link to="/booking">
                                    <Button className="w-full py-4 rounded-xl font-bold">Book The Adventure</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
