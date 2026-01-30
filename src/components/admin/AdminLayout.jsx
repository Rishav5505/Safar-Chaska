import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, Calendar, LogOut, Settings, Package as PackageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

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

    if (!user || !user.isAdmin) {
        navigate('/admin/login');
        return null;
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-80 bg-slate-900 text-white p-8 flex flex-col fixed h-screen overflow-y-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <PackageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Admin<span className="text-secondary">Panel</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-semibold ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="pt-8 mt-8 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-rose-400 font-semibold hover:bg-rose-400/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-12">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Welcome back, {user.name}
                        </h2>
                        <p className="text-slate-500 mt-1">Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-xs font-medium text-slate-400">{user.email}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                            {user.name[0]}
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
