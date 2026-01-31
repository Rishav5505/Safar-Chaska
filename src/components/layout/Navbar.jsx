import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight, User, ChevronRight } from 'lucide-react';
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

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

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
        <header className="fixed top-0 w-full z-[100]">
            {/* Announcement Bar */}
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
            <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5 md:py-8'}`}>
                <div className="container-custom flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 relative z-[110]">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            <img
                                src="/logo.jpg"
                                alt="Safar Chaska Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className={`text-lg md:text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                            Safar<span className="text-secondary">Chaska.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-white/80 hover:text-white'} ${location.pathname === link.path ? (scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/20 text-white') : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-slate-200/20 mx-4" />
                        <Link to="/booking" className="ml-2">
                            <Button size="sm" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 rounded-xl transition-all relative z-[110] ${scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white backdrop-blur-md border border-white/10'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop Blur Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
                            />

                            {/* Drawer Slide-in from Right */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-[300px] bg-white z-[105] shadow-2xl flex flex-col pt-24 p-8"
                            >
                                <div className="space-y-3 mt-10">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 px-4">Navigation</p>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`flex items-center justify-between py-4 px-6 rounded-2xl text-base font-semibold transition-all ${location.pathname === link.path ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {link.name}
                                            <ChevronRight className={`w-4 h-4 ${location.pathname === link.path ? 'opacity-100' : 'opacity-20'}`} />
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto pb-6 space-y-6">
                                    <div className="pt-6 border-t border-slate-50">
                                        <Link to="/booking">
                                            <Button className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                                                Book The Adventure
                                            </Button>
                                        </Link>
                                    </div>
                                    <Link
                                        to="/admin/login"
                                        className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        <User className="w-3.5 h-3.5" /> Admin Login
                                    </Link>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
