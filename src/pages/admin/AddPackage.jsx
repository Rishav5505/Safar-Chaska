import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MapPin, IndianRupee, Clock, Camera, Plus, Trash2, ArrowLeft, Loader2, ChevronUp, ChevronDown,
    LayoutGrid, Tag, FileText, ListChecks, Route as RouteIcon, AlertCircle, CheckCircle2, Eye, Star
} from 'lucide-react';
import API from '../../utils/api';
import Button from '../../components/common/Button';
import ListEditor from '../../components/admin/ListEditor';
import PackageCardPreview, { SafeImage } from '../../components/admin/PackageCardPreview';
import { discountPercent, formatINR } from '../../utils/format';

const CATEGORIES = ['Adventure', 'Honeymoon', 'Culture', 'Wellness', 'Spiritual', 'Beach'];
const CUSTOM = '__custom__';
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging'];

const EMPTY = {
    title: '', location: '', category: 'Adventure', customCategory: '', duration: '', difficulty: 'Easy', tag: '', isFeatured: false,
    price: '', originalPrice: '', rating: '', reviewCount: '',
    image: '', images: [],
    description: '', bestSeason: '', groupSize: '', altitude: '',
    highlights: [''], inclusions: [''], exclusions: [''],
    itinerary: [{ title: '', activity: '' }],
};

const inputCls = (err) =>
    `w-full bg-slate-50 border rounded-xl py-3.5 px-4 focus:outline-none focus:bg-white focus:ring-4 transition-all font-medium ${err ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-100 focus:border-primary focus:ring-primary/10'}`;

const Field = ({ id, label, error, hint, required, children, className = '' }) => (
    <div className={className}>
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">
            {label} {required && <span className="text-rose-400" aria-hidden="true">*</span>}
        </label>
        {children}
        {error ? (
            <p id={`${id}-error`} className="mt-1.5 ml-1 text-xs font-bold text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
        ) : hint ? (
            <p className="mt-1.5 ml-1 text-xs text-slate-400">{hint}</p>
        ) : null}
    </div>
);

const Section = ({ icon: Icon, title, subtitle, children }) => (
    <section className="bg-white p-5 sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
        <div>
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-3 text-slate-900">
                <Icon className="w-5 h-5 text-primary" /> {title}
            </h2>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {children}
    </section>
);

// Convert an API package into editable form state
const toForm = (p) => {
    const isKnown = CATEGORIES.includes(p.category);
    const list = (arr) => (Array.isArray(arr) && arr.length ? arr.map(String) : ['']);
    const str = (v) => (v === undefined || v === null ? '' : String(v));
    return {
        ...EMPTY,
        title: str(p.title), location: str(p.location), duration: str(p.duration),
        category: isKnown || !p.category ? (p.category || 'Adventure') : CUSTOM,
        customCategory: isKnown ? '' : str(p.category),
        difficulty: DIFFICULTIES.includes(p.difficulty) ? p.difficulty : 'Easy',
        tag: str(p.tag), isFeatured: !!p.isFeatured,
        price: str(p.price), originalPrice: str(p.originalPrice), rating: str(p.rating), reviewCount: str(p.reviewCount),
        image: str(p.image), images: Array.isArray(p.images) ? p.images.filter(Boolean) : [],
        description: str(p.description), bestSeason: str(p.bestSeason), groupSize: str(p.groupSize), altitude: str(p.altitude),
        highlights: list(p.highlights), inclusions: list(p.inclusions), exclusions: list(p.exclusions),
        itinerary: Array.isArray(p.itinerary) && p.itinerary.length
            ? [...p.itinerary].sort((a, b) => (a.day || 0) - (b.day || 0)).map((d) => ({ title: str(d.title), activity: str(d.activity) }))
            : [{ title: '', activity: '' }],
    };
};

const isUrl = (s) => /^https?:\/\/\S+$/i.test(s.trim());

const validate = (f) => {
    const e = {};
    if (!f.title.trim()) e.title = 'Please give the package a name.';
    if (!f.location.trim()) e.location = 'Where is this trip? e.g. Chakrata, Uttarakhand';
    if (f.category === CUSTOM && !f.customCategory.trim()) e.customCategory = 'Type the new category name.';
    if (!f.duration.trim()) e.duration = 'Add a duration, e.g. 4D/3N.';
    if (f.price === '' || Number.isNaN(Number(f.price))) e.price = 'Enter the price in rupees.';
    else if (Number(f.price) <= 0) e.price = 'Price must be more than 0.';
    if (f.originalPrice !== '' && (Number.isNaN(Number(f.originalPrice)) || Number(f.originalPrice) < 0)) e.originalPrice = 'Enter a valid amount or leave empty.';
    if (f.rating !== '' && (Number.isNaN(Number(f.rating)) || Number(f.rating) < 0 || Number(f.rating) > 5)) e.rating = 'Rating must be between 0 and 5.';
    if (f.reviewCount !== '' && (!Number.isInteger(Number(f.reviewCount)) || Number(f.reviewCount) < 0)) e.reviewCount = 'Use a whole number (0 or more).';
    if (!f.image.trim()) e.image = 'A cover photo link is required.';
    else if (!isUrl(f.image)) e.image = 'This should be a web link starting with http:// or https://';
    if (!f.description.trim()) e.description = 'Write a short description for customers.';
    return e;
};

// Build API payload: numbers as numbers, empty optionals omitted on create (cleared on edit so the server forgets them)
const toPayload = (f, isEdit) => {
    const clean = (arr) => arr.map((s) => s.trim()).filter(Boolean);
    const p = {
        title: f.title.trim(),
        description: f.description.trim(),
        location: f.location.trim(),
        price: Number(f.price),
        duration: f.duration.trim(),
        image: f.image.trim(),
        category: f.category === CUSTOM ? f.customCategory.trim() : f.category,
        difficulty: f.difficulty,
        isFeatured: f.isFeatured,
    };
    ['tag', 'bestSeason', 'groupSize', 'altitude'].forEach((k) => {
        const v = f[k].trim();
        if (v) p[k] = v;
        else if (isEdit) p[k] = '';
    });
    if (f.originalPrice !== '') p.originalPrice = Number(f.originalPrice);
    else if (isEdit) p.originalPrice = null;
    if (f.rating !== '') p.rating = Number(f.rating);
    if (f.reviewCount !== '') p.reviewCount = Number(f.reviewCount);
    ['images', 'highlights', 'inclusions', 'exclusions'].forEach((k) => {
        const v = clean(f[k]);
        if (v.length || isEdit) p[k] = v;
    });
    const itinerary = f.itinerary
        .filter((d) => d.title.trim() || d.activity.trim())
        .map((d, i) => ({ day: i + 1, title: d.title.trim(), activity: d.activity.trim() }));
    if (itinerary.length || isEdit) p.itinerary = itinerary;
    return p;
};

const FIELD_ORDER = ['title', 'location', 'customCategory', 'duration', 'price', 'originalPrice', 'rating', 'reviewCount', 'image', 'description'];

const AddPackage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(isEdit);
    const [loadError, setLoadError] = useState('');
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
    const [newImage, setNewImage] = useState('');
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (!isEdit) return undefined;
        let cancelled = false;
        (async () => {
            setLoading(true);
            setLoadError('');
            try {
                const { data } = await API.get(`/packages/${id}`);
                if (!cancelled) setForm(toForm(data || {}));
            } catch (err) {
                if (!cancelled) {
                    setLoadError(err.response?.status === 404
                        ? 'This package no longer exists. It may have been deleted.'
                        : 'Could not load this package. Check your internet connection and try again.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [id, isEdit, reloadKey]);

    const set = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    };
    const onInput = (e) => {
        const { name, value, type, checked } = e.target;
        set(name, type === 'checkbox' ? checked : value);
    };

    const off = discountPercent(Number(form.price) || 0, Number(form.originalPrice) || 0);
    const previewPkg = useMemo(() => ({
        ...form,
        category: form.category === CUSTOM ? form.customCategory : form.category,
    }), [form]);

    // Itinerary helpers
    const setDay = (i, key, value) => set('itinerary', form.itinerary.map((d, idx) => (idx === i ? { ...d, [key]: value } : d)));
    const addDay = () => set('itinerary', [...form.itinerary, { title: '', activity: '' }]);
    const removeDay = (i) => set('itinerary', form.itinerary.length > 1 ? form.itinerary.filter((_, idx) => idx !== i) : [{ title: '', activity: '' }]);
    const moveDay = (i, dir) => {
        const j = i + dir;
        if (j < 0 || j >= form.itinerary.length) return;
        const next = [...form.itinerary];
        [next[i], next[j]] = [next[j], next[i]];
        set('itinerary', next);
    };

    const addImage = () => {
        const url = newImage.trim();
        if (!url) return;
        if (!isUrl(url)) { setErrors((p) => ({ ...p, newImage: 'Paste a link starting with http:// or https://' })); return; }
        if (form.images.includes(url)) { setErrors((p) => ({ ...p, newImage: 'This photo is already in the list.' })); return; }
        set('images', [...form.images, url]);
        setNewImage('');
        setErrors((p) => { const n = { ...p }; delete n.newImage; return n; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        const errs = validate(form);
        setErrors(errs);
        const firstKey = FIELD_ORDER.find((k) => errs[k]);
        if (firstKey) {
            setStatus({ type: 'error', text: 'Please fix the highlighted fields.' });
            const el = document.getElementById(firstKey);
            el?.focus();
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSaving(true);
        try {
            const payload = toPayload(form, isEdit);
            if (isEdit) await API.put(`/packages/${id}`, payload);
            else await API.post('/packages', payload);
            const text = isEdit ? 'Changes saved.' : 'Package published.';
            setStatus({ type: 'success', text });
            setTimeout(() => navigate('/admin/packages', { state: { flash: `"${payload.title}" — ${text}` } }), 700);
        } catch (err) {
            const msg = err.response?.data?.message;
            const code = err.response?.status;
            setStatus({
                type: 'error',
                text: code === 401 || code === 403
                    ? 'Your login has expired. Please sign in again and retry.'
                    : msg ? `Could not save: ${msg}` : 'Could not save. Check your internet connection and try again.',
            });
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl space-y-6 animate-pulse" aria-busy="true" aria-label="Loading package">
                <div className="h-6 w-40 bg-slate-100 rounded-lg" />
                <div className="h-10 w-72 bg-slate-100 rounded-xl" />
                {[0, 1, 2].map((i) => <div key={i} className="h-64 bg-slate-50 rounded-[2.5rem] border border-slate-100" />)}
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="max-w-xl mx-auto text-center py-20">
                <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                <h1 className="text-2xl font-black text-slate-900">Package unavailable</h1>
                <p className="text-slate-500 mt-2">{loadError}</p>
                <div className="flex justify-center gap-3 mt-8">
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages')} className="rounded-xl">Back to packages</Button>
                    <Button size="sm" onClick={() => setReloadKey((k) => k + 1)} className="rounded-xl">Try again</Button>
                </div>
            </div>
        );
    }

    const err = (k) => errors[k];
    const aria = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {});

    return (
        <div className="max-w-6xl">
            <button
                type="button"
                onClick={() => navigate('/admin/packages')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-6 md:mb-8 font-bold transition-all rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Packages
            </button>

            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{isEdit ? 'Edit package' : 'Create New Package'}</h1>
                <p className="text-slate-500 mt-2">
                    {isEdit ? 'Update the details below. Changes go live as soon as you save.' : 'Fill in the details to launch a new mountain experience. Fields marked * are required.'}
                </p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
                <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-10 min-w-0 pb-36 sm:pb-24">
                    {/* Basics */}
                    <Section icon={LayoutGrid} title="Basics" subtitle="The essentials customers see first.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field id="title" label="Package title" required error={err('title')} className="md:col-span-2">
                                <input id="title" name="title" value={form.title} onChange={onInput} className={inputCls(err('title'))} placeholder="e.g. Kedarkantha Winter Trek" {...aria('title')} />
                            </Field>
                            <Field id="location" label="Location" required error={err('location')}>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="location" name="location" value={form.location} onChange={onInput} className={`${inputCls(err('location'))} pl-12`} placeholder="Chakrata, Uttarakhand" {...aria('location')} />
                                </div>
                            </Field>
                            <Field id="duration" label="Duration" required error={err('duration')} hint="e.g. 4D/3N">
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="duration" name="duration" value={form.duration} onChange={onInput} className={`${inputCls(err('duration'))} pl-12`} placeholder="4D/3N" {...aria('duration')} />
                                </div>
                            </Field>
                            <Field id="category" label="Category" required>
                                <select id="category" name="category" value={form.category} onChange={onInput} className={inputCls(false)}>
                                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    <option value={CUSTOM}>Other (type your own)…</option>
                                </select>
                            </Field>
                            {form.category === CUSTOM && (
                                <Field id="customCategory" label="New category name" required error={err('customCategory')}>
                                    <input id="customCategory" name="customCategory" value={form.customCategory} onChange={onInput} className={inputCls(err('customCategory'))} placeholder="e.g. Trekking" {...aria('customCategory')} />
                                </Field>
                            )}
                            <Field id="difficulty" label="Difficulty">
                                <select id="difficulty" name="difficulty" value={form.difficulty} onChange={onInput} className={inputCls(false)}>
                                    {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                                </select>
                            </Field>
                            <Field id="tag" label="Badge / tag" hint="Optional small label on the card, e.g. Bestseller, New, Limited seats">
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="tag" name="tag" value={form.tag} onChange={onInput} className={`${inputCls(false)} pl-12`} placeholder="Bestseller" />
                                </div>
                            </Field>
                        </div>

                        <label htmlFor="isFeatured" className="flex items-center justify-between gap-4 p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
                            <span>
                                <span className="block font-bold text-slate-800">Featured package</span>
                                <span className="block text-xs text-slate-400 mt-0.5">Featured trips are shown first on the home page.</span>
                            </span>
                            <span className="relative inline-flex shrink-0">
                                <input id="isFeatured" name="isFeatured" type="checkbox" role="switch" checked={form.isFeatured} onChange={onInput} className="peer sr-only" />
                                <span className="w-12 h-7 rounded-full bg-slate-200 peer-checked:bg-primary transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-primary/25" />
                                <span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                            </span>
                        </label>
                    </Section>

                    {/* Pricing */}
                    <Section icon={IndianRupee} title="Pricing & rating" subtitle="Set an 'original price' higher than the price to show a discount.">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Field id="price" label="Price per person (₹)" required error={err('price')}>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="price" name="price" type="number" inputMode="numeric" min="0" value={form.price} onChange={onInput} className={`${inputCls(err('price'))} pl-12`} placeholder="4999" {...aria('price')} />
                                </div>
                            </Field>
                            <Field
                                id="originalPrice" label="Original price (₹)" error={err('originalPrice')}
                                hint={form.originalPrice !== '' && !off ? 'Must be higher than the price to show a discount.' : 'Optional — shown crossed out.'}
                            >
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="originalPrice" name="originalPrice" type="number" inputMode="numeric" min="0" value={form.originalPrice} onChange={onInput} className={`${inputCls(err('originalPrice'))} pl-12`} placeholder="6999" {...aria('originalPrice')} />
                                </div>
                            </Field>
                            <Field id="rating" label="Rating (0 – 5)" error={err('rating')}>
                                <div className="relative">
                                    <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                    <input id="rating" name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={onInput} className={`${inputCls(err('rating'))} pl-12`} placeholder="4.8" {...aria('rating')} />
                                </div>
                            </Field>
                            <Field id="reviewCount" label="Number of reviews" error={err('reviewCount')}>
                                <input id="reviewCount" name="reviewCount" type="number" min="0" step="1" value={form.reviewCount} onChange={onInput} className={inputCls(err('reviewCount'))} placeholder="120" {...aria('reviewCount')} />
                            </Field>
                        </div>
                        <div aria-live="polite" className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Customers see</span>
                            <span className="text-xl font-black text-slate-900">{formatINR(Number(form.price) || 0)}</span>
                            {off > 0 && (
                                <>
                                    <span className="text-sm text-slate-400 line-through">{formatINR(Number(form.originalPrice))}</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-black">{off}% off</span>
                                </>
                            )}
                        </div>
                    </Section>

                    {/* Media */}
                    <Section icon={Camera} title="Photos" subtitle="Paste image links (e.g. from Unsplash or your Google Photos share link).">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-start">
                            <Field id="image" label="Cover photo link" required error={err('image')}>
                                <input id="image" name="image" type="url" value={form.image} onChange={onInput} className={inputCls(err('image'))} placeholder="https://images.unsplash.com/..." {...aria('image')} />
                            </Field>
                            <SafeImage key={form.image} src={form.image.trim()} alt="Cover preview" showBrokenNote className="aspect-[4/3] w-full rounded-2xl border border-slate-100" />
                        </div>

                        <div>
                            <label htmlFor="newImage" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">More photos (gallery)</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    id="newImage" type="url" value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                                    className={`${inputCls(err('newImage'))} flex-1`} placeholder="Paste a photo link and press Enter"
                                    {...aria('newImage')}
                                />
                                <Button type="button" variant="outline" size="sm" onClick={addImage} className="rounded-xl shrink-0">
                                    <Plus className="w-4 h-4" /> Add photo
                                </Button>
                            </div>
                            {err('newImage') && <p id="newImage-error" className="mt-1.5 ml-1 text-xs font-bold text-rose-500">{err('newImage')}</p>}
                            {form.images.length > 0 ? (
                                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                                    {form.images.map((url, i) => (
                                        <li key={url} className="relative group">
                                            <SafeImage src={url} alt={`Gallery photo ${i + 1}`} className="aspect-square w-full rounded-xl border border-slate-100" />
                                            <button
                                                type="button"
                                                onClick={() => set('images', form.images.filter((u) => u !== url))}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 text-rose-500 flex items-center justify-center shadow hover:bg-rose-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 transition-all"
                                                aria-label={`Remove gallery photo ${i + 1}`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-slate-400 mt-3">No extra photos yet. They appear in the gallery on the trip page.</p>
                            )}
                        </div>
                    </Section>

                    {/* Details */}
                    <Section icon={FileText} title="Details">
                        <Field id="description" label="Description" required error={err('description')} hint={`${form.description.length} characters`}>
                            <textarea id="description" name="description" value={form.description} onChange={onInput} className={`${inputCls(err('description'))} min-h-[150px]`} placeholder="Tell the story of this adventure..." {...aria('description')} />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Field id="bestSeason" label="Best season">
                                <input id="bestSeason" name="bestSeason" value={form.bestSeason} onChange={onInput} className={inputCls(false)} placeholder="Oct – Mar" />
                            </Field>
                            <Field id="groupSize" label="Group size">
                                <input id="groupSize" name="groupSize" value={form.groupSize} onChange={onInput} className={inputCls(false)} placeholder="2 – 12 people" />
                            </Field>
                            <Field id="altitude" label="Max altitude">
                                <input id="altitude" name="altitude" value={form.altitude} onChange={onInput} className={inputCls(false)} placeholder="2,118 m" />
                            </Field>
                        </div>
                    </Section>

                    {/* Lists */}
                    <Section icon={ListChecks} title="Highlights, inclusions & exclusions">
                        <ListEditor id="list-highlights" label="Highlights" items={form.highlights} onChange={(v) => set('highlights', v)} placeholder="e.g. Sunrise at Tiger Falls" addLabel="Add highlight" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2 border-t border-slate-50">
                            <ListEditor id="list-inclusions" label="What's included" items={form.inclusions} onChange={(v) => set('inclusions', v)} placeholder="e.g. All meals" />
                            <ListEditor id="list-exclusions" label="Not included" items={form.exclusions} onChange={(v) => set('exclusions', v)} placeholder="e.g. Personal expenses" />
                        </div>
                    </Section>

                    {/* Itinerary */}
                    <Section icon={RouteIcon} title="Day-by-day itinerary" subtitle="Days are numbered automatically. Empty days are skipped when saving.">
                        <ol className="space-y-4">
                            {form.itinerary.map((d, i) => (
                                <li key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-black uppercase tracking-widest">Day {i + 1}</span>
                                        <div className="flex items-center gap-1">
                                            <button type="button" onClick={() => moveDay(i, -1)} disabled={i === 0} aria-label={`Move day ${i + 1} up`} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => moveDay(i, 1)} disabled={i === form.itinerary.length - 1} aria-label={`Move day ${i + 1} down`} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => removeDay(i)} aria-label={`Remove day ${i + 1}`} className="w-9 h-9 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <label htmlFor={`day-${i}-title`} className="sr-only">Day {i + 1} title</label>
                                    <input id={`day-${i}-title`} value={d.title} onChange={(e) => setDay(i, 'title', e.target.value)} className={`${inputCls(false)} bg-white mb-3`} placeholder="Title, e.g. Arrival & riverside camp" />
                                    <label htmlFor={`day-${i}-activity`} className="sr-only">Day {i + 1} activities</label>
                                    <textarea id={`day-${i}-activity`} value={d.activity} onChange={(e) => setDay(i, 'activity', e.target.value)} className={`${inputCls(false)} bg-white min-h-[90px]`} placeholder="What happens on this day?" />
                                </li>
                            ))}
                        </ol>
                        <Button type="button" variant="outline" size="sm" onClick={addDay} className="rounded-xl">
                            <Plus className="w-4 h-4" /> Add day {form.itinerary.length + 1}
                        </Button>
                    </Section>

                    {/* Sticky save bar */}
                    <div className="fixed bottom-0 inset-x-0 lg:left-80 z-40 p-3 md:px-12 md:pb-6 pointer-events-none">
                        <div className="pointer-events-auto max-w-6xl bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] rounded-2xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                            <div aria-live="polite" className="flex-1 min-w-0 text-sm font-bold">
                                {status?.type === 'success' && <span className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-4 h-4 shrink-0" /> {status.text}</span>}
                                {status?.type === 'error' && <span className="flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4 shrink-0" /> {status.text}</span>}
                                {!status && <span className="text-slate-400 font-medium hidden sm:inline">{isEdit ? 'Editing live package' : 'New package — not published yet'}</span>}
                            </div>
                            <div className="flex gap-2 sm:gap-3">
                                <Button variant="outline" size="sm" type="button" onClick={() => navigate('/admin/packages')} disabled={saving} className="flex-1 sm:flex-none rounded-xl">Cancel</Button>
                                <Button type="submit" size="sm" disabled={saving} className="flex-1 sm:flex-none rounded-xl px-8">
                                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Publish package'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Live preview (desktop) */}
                <aside className="hidden xl:block" aria-label="Card preview">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Live card preview
                    </p>
                    <PackageCardPreview pkg={previewPkg} />
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">This is roughly how the trip appears on the website. It updates as you type.</p>
                    {form.isFeatured && (
                        <p className="mt-2 text-xs font-bold text-primary">★ Shown in featured trips</p>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default AddPackage;
