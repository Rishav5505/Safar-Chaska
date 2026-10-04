import { useCallback, useEffect, useState } from 'react';

const KEY = 'sc_wishlist';
const EVENT = 'sc-wishlist-change';

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
};

// Saved package ids, kept in sync across every component (and tabs) that uses the hook.
const useWishlist = () => {
    const [ids, setIds] = useState(read);

    useEffect(() => {
        const sync = () => setIds(read());
        window.addEventListener(EVENT, sync);
        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener(EVENT, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    const toggle = useCallback((id) => {
        const current = read();
        const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
        try {
            localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
            // Storage unavailable (private mode) — keep in-memory only
        }
        setIds(next);
        window.dispatchEvent(new Event(EVENT));
    }, []);

    return { ids, has: (id) => ids.includes(id), toggle, count: ids.length };
};

export default useWishlist;
