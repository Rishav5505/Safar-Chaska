// Shared helpers for the booking flow

export const EASE = [0.22, 1, 0.36, 1];

export const WHATSAPP_NUMBER = '918171379469';

// Local yyyy-mm-dd (not UTC) so "today" matches the user's calendar
export const todayISO = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const formatDate = (iso, opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return isNaN(date) ? '' : date.toLocaleDateString('en-IN', opts);
};

// Accepts 9876543210, +91 98765 43210, 091-9876543210 etc.
export const normalizeIndianPhone = (value = '') => {
    let digits = value.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
    else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
    return digits;
};

export const isValidIndianPhone = (value) => /^[6-9]\d{9}$/.test(normalizeIndianPhone(value));

export const isValidEmail = (value = '') => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const clampGuests = (n) => Math.min(20, Math.max(1, parseInt(n, 10) || 1));

// Price maths shared by the summary card, review step and success screen
export const getTripTotals = (pkg, guests) => {
    const price = Number(pkg?.price) || 0;
    const original = Number(pkg?.originalPrice) || 0;
    const subtotal = price * guests;
    const savings = original > price ? (original - price) * guests : 0;
    return { price, subtotal, savings, total: subtotal };
};

// Shared text-input styling with error state
export const inputClass = (error) =>
    `w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-slate-400 transition duration-300 ease-premium focus:outline-none focus:ring-4 ${error
        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
        : 'border-ink/10 hover:border-ink/25 focus:border-primary focus:ring-primary/10'
    }`;
