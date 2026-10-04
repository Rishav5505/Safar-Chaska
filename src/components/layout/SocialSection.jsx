import React from 'react';
import { Instagram, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const feed = [
    { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop", alt: "Trekkers on a Himalayan ridge", likes: '1.2k', comments: 48 },
    { img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=600&auto=format&fit=crop", alt: "River rafting through rapids", likes: '986', comments: 31 },
    { img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop", alt: "Campfire under the stars", likes: '1.6k', comments: 72 },
    { img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=600&auto=format&fit=crop", alt: "Friends travelling together", likes: '842', comments: 26 },
];

const SocialSection = () => {
    return (
        <section className="py-16 md:py-28 bg-ink overflow-hidden">
            {/* Local keyframes so the marquee can pause on hover via CSS */}
            <style>{`
                @keyframes sc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .sc-marquee { animation: sc-marquee 40s linear infinite; }
                .sc-marquee-wrap:hover .sc-marquee, .sc-marquee-wrap:focus-within .sc-marquee { animation-play-state: paused; }
            `}</style>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-12 md:mb-16">
                    <SectionHeader
                        dark
                        className="!mb-0"
                        eyebrow="Join Our Community"
                        title={<>Live the <em>story.</em></>}
                        subtitle="Real moments from real trips — tag us to be featured."
                    />

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group shrink-0 inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-white transition-all duration-500 ease-premium hover:border-secondary hover:bg-secondary hover:text-ink hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                        <Instagram className="w-5 h-5" />
                        <span className="font-serif text-lg">@SafarChaska</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                </div>
            </div>

            <div className="sc-marquee-wrap relative">
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-ink to-transparent z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-ink to-transparent z-10" />

                <div className="sc-marquee flex w-max">
                    {[...feed, ...feed, ...feed, ...feed].map((post, i) => (
                        <a
                            key={i}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-hidden={i >= feed.length ? 'true' : undefined}
                            tabIndex={i >= feed.length ? -1 : undefined}
                            aria-label={i < feed.length ? `${post.alt} — view on Instagram` : undefined}
                            className="group relative flex-shrink-0 w-60 h-72 md:w-72 md:h-96 mr-4 md:mr-5 rounded-3xl overflow-hidden bg-white/5"
                        >
                            <img src={post.img} loading="lazy" alt={post.alt} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-0 bottom-0 p-5 flex items-center gap-5 text-white text-sm translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-premium">
                                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 fill-white" /> {post.likes}</span>
                                <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> {post.comments}</span>
                            </div>
                            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-secondary/50 transition-all duration-500" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialSection;
