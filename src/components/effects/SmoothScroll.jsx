import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Buttery inertial scrolling for the public site (Lenis). Native scroll stays on touch devices,
// for reduced-motion users and inside the admin panel.
const SmoothScroll = () => {
    const { pathname } = useLocation();
    const enabled = !pathname.startsWith('/admin');

    useEffect(() => {
        if (!enabled) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            autoRaf: true,
            // Let inner scroll areas (package picker, modals, menus) scroll natively
            allowNestedScroll: true,
        });
        window.__lenis = lenis;

        // Modals and the mobile menu lock the page with body overflow:hidden — pause Lenis while they do.
        const observer = new MutationObserver(() => {
            if (document.body.style.overflow === 'hidden') lenis.stop();
            else lenis.start();
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

        return () => {
            observer.disconnect();
            lenis.destroy();
            delete window.__lenis;
        };
    }, [enabled]);

    // Jump to top on navigation without a smooth glide from the previous page's position
    useEffect(() => {
        window.__lenis?.scrollTo(0, { immediate: true });
    }, [pathname]);

    return null;
};

export default SmoothScroll;
