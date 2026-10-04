export const MIN_GUESTS = 1;
export const MAX_GUESTS = 20;
export const WHATSAPP_NUMBER = '918171379469';

export const whatsappLink = (title) =>
    title
        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Safar Chaska! I'm interested in the "${title}" trip. Could you share available dates and details?`)}`
        : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Safar Chaska! I'd love some help planning a Himalayan trip.")}`;

// Local yyyy-mm-dd (not UTC) so the date picker's min is correct in IST evenings.
export const todayISO = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Leading number of "4D/3N" / "4 Days / 3 Nights" -> 4
export const durationDays = (duration) => {
    const n = parseInt(String(duration ?? '').trim(), 10);
    return Number.isFinite(n) ? n : null;
};
