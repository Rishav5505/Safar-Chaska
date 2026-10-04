// Minimal in-memory rate limiter for public form endpoints (no extra dependency).
// Good enough for a single Render instance; swap for Redis if you scale out.
const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 10 } = {}) => {
    const hits = new Map();

    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key);
    }, windowMs).unref();

    return (req, res, next) => {
        if (req.method !== 'POST') return next();
        const key = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
        const now = Date.now();
        const entry = hits.get(key);

        if (!entry || entry.reset < now) {
            hits.set(key, { count: 1, reset: now + windowMs });
            return next();
        }
        if (++entry.count > max) {
            return res.status(429).json({ message: 'Too many requests. Please try again in a few minutes.' });
        }
        next();
    };
};

module.exports = rateLimit;
