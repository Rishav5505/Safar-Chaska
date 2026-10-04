export const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

// Percentage saved when an originalPrice is set above the price, else 0
export const discountPercent = (price, originalPrice) =>
    originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200';

// Swap in a known-good image if a remote URL 404s
export const onImageError = (e) => {
    if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
};
