import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, IndianRupee, Clock, Camera, Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AddPackage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        duration: '',
        image: '',
        category: 'Trekking',
        isFeatured: false,
        inclusions: [''],
        exclusions: [''],
        itinerary: [{ day: 1, title: '', activity: '' }]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Array field handlers
    const handleArrayChange = (index, field, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayField = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayField = (index, field) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    // Itinerary handlers
    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const addItineraryDay = () => {
        setFormData(prev => ({
            ...prev,
            itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', activity: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/packages', formData);
            alert('Package added successfully!');
            navigate('/admin/packages');
        } catch (error) {
            console.error(error);
            alert('Failed to add package');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <button
                onClick={() => navigate('/admin/packages')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 font-bold transition-all"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Packages
            </button>

            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Package</h1>
                <p className="text-slate-500 mt-2">Fill in the details to launch a new mountain experience.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-slate-900">
                        <Plus className="w-5 h-5 text-primary" /> Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Package Title</label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-medium"
                                placeholder="e.g. Kedarkantha Winter Trek" required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    type="text" name="location" value={formData.location} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="Uttarakhand, India" required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Category</label>
                            <select
                                name="category" value={formData.category} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-medium appearance-none"
                            >
                                <option>Trekking</option>
                                <option>Camping</option>
                                <option>Village Tour</option>
                                <option>Photography</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Price (₹)</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    type="number" name="price" value={formData.price} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="4999" required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Duration</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    type="text" name="duration" value={formData.duration} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="4 Days / 3 Nights" required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Description</label>
                        <textarea
                            name="description" value={formData.description} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-medium min-h-[150px]"
                            placeholder="Tell the story of this adventure..." required
                        />
                    </div>
                </div>

                {/* Media */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-slate-900">
                        <Camera className="w-5 h-5 text-primary" /> Media & Images
                    </h3>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Main Cover Image URL</label>
                        <input
                            type="text" name="image" value={formData.image} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all font-medium"
                            placeholder="https://images.unsplash.com/..." required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
                            className="w-6 h-6 accent-primary rounded-lg" id="featured"
                        />
                        <label htmlFor="featured" className="font-bold text-slate-700">Display as Featured Package</label>
                    </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900">Inclusions</h3>
                        {formData.inclusions.map((inc, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={inc} onChange={(e) => handleArrayChange(i, 'inclusions', e.target.value)}
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-primary font-medium text-sm"
                                    placeholder="e.g. All Meals included"
                                />
                                <button type="button" onClick={() => removeArrayField(i, 'inclusions')} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayField('inclusions')} className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900">Exclusions</h3>
                        {formData.exclusions.map((exc, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={exc} onChange={(e) => handleArrayChange(i, 'exclusions', e.target.value)}
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-primary font-medium text-sm"
                                    placeholder="e.g. Personal Expenses"
                                />
                                <button type="button" onClick={() => removeArrayField(i, 'exclusions')} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayField('exclusions')} className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-10">
                    <Button variant="outline" type="button" onClick={() => navigate('/admin/packages')} className="px-10 rounded-xl py-4">Cancel</Button>
                    <Button type="submit" disabled={loading} className="px-12 rounded-xl py-4 flex items-center gap-2">
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        Publish Experience
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPackage;
