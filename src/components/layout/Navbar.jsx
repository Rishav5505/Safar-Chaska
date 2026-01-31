import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, User, ChevronRight, Compass, Map, Info, Phone } from 'lucide-react';
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
        { name: 'Home', path: '/', icon: Compass, desc: 'Where the journey begins' },
        { name: 'Packages', path: '/packages', icon: Map, desc: 'Explore mountain trails' },
        { name: 'About', path: '/about', icon: Info, desc: 'Our story & mission' },
        { name: 'Contact', path: '/contact', icon: Phone, desc: 'Get in touch with us' },
    ];

    const menuVariants = {
        closed: {
            clipPath: "circle(0% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            clipPath: "circle(150% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 30, filter: 'blur(10px)' },
        open: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <header className="fixed top-0 w-full z-[100]">
            {/* Announcement Bar */}
            <AnimatePresence>
                {!scrolled && !isOpen && (
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
            <nav className={`transition-all duration-500 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5 md:py-8'}`}>
                <div className="container-custom flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 relative z-[110]">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            <img
                                src="/logo.jpg"
                                alt="Safar Chaska Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className={`text-lg md:text-xl font-bold tracking-tight ${scrolled || isOpen ? 'text-slate-900' : 'text-white'}`}>
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

                    {/* Mobile Menu Button - Premium Hamburger */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className={`lg:hidden w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all relative z-[110] ${scrolled || isOpen ? 'bg-slate-900 text-white shadow-xl' : 'bg-white/10 text-white backdrop-blur-md border border-white/10'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 7, backgroundColor: '#fff' } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-current rounded-full"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                            className="w-6 h-0.5 bg-current rounded-full"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -7, backgroundColor: '#fff' } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-current rounded-full"
                        />
                    </motion.button>
                </div>

                {/* Ultra-Premium Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-0 lg:hidden bg-white z-[105] flex flex-col overflow-hidden"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
                                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
                                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full pt-32 p-8 overflow-y-auto">
                                <motion.p
                                    variants={itemVariants}
                                    className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-12 border-l-2 border-primary pl-4"
                                >
                                    Experience The Himalayas
                                </motion.p>

                                <div className="space-y-8">
                                    {navLinks.map((link) => (
                                        <motion.div key={link.name} variants={itemVariants}>
                                            <Link
                                                to={link.path}
                                                className="group block"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-5">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${location.pathname === link.path ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-primary'}`}>
                                                            <link.icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className={`text-2xl font-bold tracking-tight transition-colors ${location.pathname === link.path ? 'text-slate-900' : 'text-slate-600 group-hover:text-primary'}`}>
                                                                {link.name}
                                                            </h3>
                                                            <p className="text-[10px] font-medium text-slate-400 mt-0.5">{link.desc}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${location.pathname === link.path ? 'text-primary' : 'text-slate-200 group-hover:text-primary'}`} />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={itemVariants} className="mt-auto pt-12 pb-6 space-y-8">
                                    <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Adventure Awaits</p>
                                            <h4 className="text-lg font-bold mb-4">Ready to start your journey?</h4>
                                            <Link to="/booking">
                                                <Button className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-primary hover:bg-white hover:text-primary transition-all shadow-xl">
                                                    Plan My Trip Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-2">
                                        <Link
                                            to="/admin/login"
                                            className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest hover:text-primary transition-colors"
                                        >
                                            <User className="w-3.5 h-3.5" /> Portal
                                        </Link>
                                        <div className="flex gap-4">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                            ))}
                                        </div>
                                        <span className="text-slate-300 font-bold text-[9px] uppercase tracking-widest italic">Est. 2024</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
