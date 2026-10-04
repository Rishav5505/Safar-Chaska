import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

// Editable list of short text rows. Enter in a row inserts a new row below it and focuses it.
const ListEditor = ({ label, items, onChange, placeholder, addLabel = 'Add item', id }) => {
    const inputs = useRef([]);
    const focusIndex = useRef(null);

    useEffect(() => {
        if (focusIndex.current !== null) {
            inputs.current[focusIndex.current]?.focus();
            focusIndex.current = null;
        }
    }, [items.length]);

    const update = (i, value) => onChange(items.map((it, idx) => (idx === i ? value : it)));
    const insertAfter = (i) => {
        const next = [...items];
        next.splice(i + 1, 0, '');
        focusIndex.current = i + 1;
        onChange(next);
    };
    const remove = (i) => {
        const next = items.filter((_, idx) => idx !== i);
        focusIndex.current = Math.max(0, i - 1);
        onChange(next);
    };
    const move = (i, dir) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = [...items];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
        requestAnimationFrame(() => inputs.current[j]?.focus());
    };

    const iconBtn = 'w-9 h-9 shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all';

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 id={id} className="font-bold text-slate-900">{label}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {items.filter((s) => s.trim()).length} items
                </span>
            </div>
            <p className="text-xs text-slate-400">Press Enter to add the next line.</p>
            <ul className="space-y-2" aria-labelledby={id}>
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                        <span className="w-6 text-center text-xs font-bold text-slate-300 shrink-0">{i + 1}</span>
                        <input
                            ref={(el) => { inputs.current[i] = el; }}
                            value={item}
                            aria-label={`${label} ${i + 1}`}
                            onChange={(e) => update(i, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') { e.preventDefault(); insertAfter(i); }
                                else if (e.key === 'Backspace' && item === '' && items.length > 1) { e.preventDefault(); remove(i); }
                            }}
                            className="flex-1 min-w-0 bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 focus:outline-none focus:border-primary focus:bg-white font-medium text-sm transition-all"
                            placeholder={placeholder}
                        />
                        <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={`${iconBtn} hidden sm:flex`} aria-label={`Move ${label} ${i + 1} up`}>
                            <ChevronUp className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className={`${iconBtn} hidden sm:flex`} aria-label={`Move ${label} ${i + 1} down`}>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => remove(i)} className={`${iconBtn} text-rose-400 hover:text-rose-600 hover:bg-rose-50`} aria-label={`Remove ${label} ${i + 1}`}>
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() => { focusIndex.current = items.length; onChange([...items, '']); }}
                className="text-sm font-bold text-primary hover:underline flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
                <Plus className="w-4 h-4" /> {addLabel}
            </button>
        </div>
    );
};

export default ListEditor;
