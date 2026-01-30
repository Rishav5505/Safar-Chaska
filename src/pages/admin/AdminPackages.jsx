import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, MapPin, IndianRupee, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data } = await API.get('/packages');
            setPackages(data);
        } catch (error) {
            console.error("Error fetching packages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await API.delete(`/packages/${id}`);
                setPackages(packages.filter(p => p._id !== id));
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Packages</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or remove travel experiences.</p>
                </div>
                <Link to="/admin/packages/add">
                    <Button className="flex items-center gap-2 rounded-xl py-4">
                        <Plus className="w-5 h-5" /> Add New Package
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search packages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">Package</th>
                                <th className="px-8 py-6">Location</th>
                                <th className="px-8 py-6">Price</th>
                                <th className="px-8 py-6">Duration</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        Loading packages...
                                    </td>
                                </tr>
                            ) : filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        No packages found.
                                    </td>
                                </tr>
                            ) : filteredPackages.map((pkg) => (
                                <tr key={pkg._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                                <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-tight">{pkg.title}</p>
                                                <p className="text-xs font-medium text-slate-400 mt-1">{pkg.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-slate-300" /> {pkg.location}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-900">
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="w-4 h-4 text-slate-300" /> {pkg.price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-300" /> {pkg.duration}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pkg._id)}
                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPackages;
