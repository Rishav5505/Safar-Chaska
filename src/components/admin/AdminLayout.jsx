import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Calendar, LogOut, Settings, Package as PackageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Manage Packages', icon: Map, path: '/admin/packages' },
        { name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/admin/login');
        }
    }, [user, navigate]);

    if (!user || !user.isAdmin) {
        return null;
    }

    // Animation Variants
    const menuContainerVariants = {
        open: {
            clipPath: `circle(150% at calc(100% - 40px) 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        },
        closed: {
            clipPath: `circle(30px at calc(100% - 40px) 40px)`,
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    const linkVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        closed: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 overflow-hidden relative">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-80 bg-white border-r border-slate-100 flex-col fixed h-screen z-10 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
                <div className="p-10">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 bg-slate-900 rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-slate-900/10">
                            <PackageIcon className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter">Safar<span className="text-secondary">Pro</span></h1>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold group relative ${isActive
                                        ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]'
                                        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -left-2 w-1 h-8 bg-primary rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-10">
                    <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 text-rose-500 font-black hover:bg-rose-50 rounded-2xl w-full transition-all">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Unique Mobile Navigation Interface */}
            <div className="lg:hidden">
                {/* Minimal Header */}
                <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-50 flex items-center justify-between px-6 z-[60]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                            <PackageIcon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-black text-lg tracking-tighter">Safar<span className="text-secondary">Admin</span></span>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="w-12 h-12 flex flex-col items-center justify-center gap-1 relative overflow-hidden group active:scale-90 transition-transform"
                    >
                        <motion.div
                            animate={isMenuOpen ? { rotate: 45, y: 4, width: "24px" } : { rotate: 0, y: 0, width: "20px" }}
                            className="h-1 bg-slate-900 rounded-full transition-all"
                        />
                        <motion.div
                            animate={isMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, width: "24px" }}
                            className="h-1 bg-slate-900 rounded-full"
                        />
                        <motion.div
                            animate={isMenuOpen ? { rotate: -45, y: -4, width: "24px" } : { rotate: 0, y: 0, width: "16px" }}
                            className="h-1 bg-slate-900 rounded-full transition-all"
                        />
                    </button>
                </header>

                {/* New Compact Sequenced Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={toggleMenu}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[65]"
                            />
                            <motion.div
                                initial={{ clipPath: 'circle(0% at 85% 40px)' }}
                                animate={{ clipPath: 'circle(150% at 85% 40px)' }}
                                exit={{ clipPath: 'circle(0% at 85% 40px)' }}
                                transition={{ type: "spring", stiffness: 35, damping: 15 }}
                                className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-slate-900 z-[70] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/5"
                            >
                                <div className="p-8 pt-12 flex-1 overflow-y-auto">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-8">Navigation Menu</p>

                                    <nav className="space-y-2">
                                        {menuItems.map((item, idx) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: idx * 0.05 + 0.2 }}
                                            >
                                                <NavLink
                                                    to={item.path}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-5 px-6 py-5 rounded-2xl transition-all ${isActive
                                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                                        }`
                                                    }
                                                >
                                                    <div className={`p-2 rounded-xl ${location.pathname === item.path ? 'bg-white/20' : 'bg-white/5'}`}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-lg font-bold tracking-tight">{item.name}</span>
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="p-8 bg-black/20 border-t border-white/5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-white border border-white/10">
                                                {user.name?.[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-white text-sm truncate">{user.name}</p>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest truncate">Administrator</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-xl flex items-center justify-center active:scale-95 transition-all hover:bg-rose-500 hover:text-white"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Content Area */}
            <main className="flex-1 lg:ml-80 bg-white min-h-screen">
                <div className="p-6 md:p-12 pt-28 lg:pt-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
