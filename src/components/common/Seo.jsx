import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://safarchaska.com';
const SITE_NAME = 'Safar Chaska';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200';

const setMeta = (attr, key, value) => {
    if (!value) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', value);
};

const setCanonical = (href) => {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

const absolute = (url) => (!url ? DEFAULT_IMAGE : url.startsWith('http') ? url : `${SITE_URL}${url}`);

// Per-page <title>, description, canonical, Open Graph / Twitter tags and optional JSON-LD.
// Updates the tags that already exist in index.html so crawlers without JS still get sane defaults.
const Seo = ({ title, description, image, type = 'website', jsonLd, noindex = false }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Himalayan Travel & Adventures`;
        const url = `${SITE_URL}${pathname}`;
        const img = absolute(image);

        document.title = fullTitle;
        setMeta('name', 'description', description);
        setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
        setCanonical(url);

        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', url);
        setMeta('property', 'og:image', img);
        setMeta('property', 'og:type', type);
        setMeta('property', 'twitter:title', fullTitle);
        setMeta('property', 'twitter:description', description);
        setMeta('property', 'twitter:image', img);
        setMeta('property', 'twitter:url', url);
    }, [title, description, image, type, noindex, pathname]);

    // Compare by content so a fresh object each render doesn't re-insert the script
    const ld = jsonLd ? JSON.stringify(jsonLd) : null;
    useEffect(() => {
        if (!ld) return;
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.seo = 'page';
        script.textContent = ld;
        document.head.appendChild(script);
        return () => script.remove();
    }, [ld]);

    return null;
};

export default Seo;
