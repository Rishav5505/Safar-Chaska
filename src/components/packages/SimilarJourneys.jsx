import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import API from '../../utils/api';
import PackageCard from '../common/PackageCard';
import SectionHeader from '../common/SectionHeader';
import SkeletonCard from './SkeletonCard';

// Same category first, topped up with featured trips, then anything else.
const pickSimilar = (all, currentId, category) => {
    const others = all.filter((p) => p && p._id && p._id !== currentId);
    const picked = category ? others.filter((p) => p.category === category).slice(0, 4) : [];
    for (const p of [...others.filter((o) => o.isFeatured), ...others]) {
        if (picked.length >= 4) break;
        if (!picked.includes(p)) picked.push(p);
    }
    return picked;
};

const cardWidth = 'shrink-0 w-[78%] sm:w-[45%] md:w-auto snap-start';

const SimilarJourneys = ({ currentId, category }) => {
    const [state, setState] = useState({ loading: true, items: [] });

    useEffect(() => {
        let alive = true;
        API.get('/packages')
            .then(({ data }) => {
                if (alive) setState({ loading: false, items: pickSimilar(Array.isArray(data) ? data : [], currentId, category) });
            })
            .catch(() => {
                if (alive) setState({ loading: false, items: [] });
            });
        return () => { alive = false; };
    }, [currentId, category]);

    if (!state.loading && state.items.length === 0) return null;

    return (
        <section className="bg-sand py-16 md:py-28 border-t border-ink/5" aria-label="Similar journeys">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-6">
                    <SectionHeader eyebrow="Keep exploring" title={<>Similar <em>journeys</em></>} className="!mb-6 md:!mb-12" />
                    <Link
                        to="/packages"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary transition-colors mb-8 md:mb-14 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                        View all journeys
                        <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="-mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-2">
                    {state.loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} className={cardWidth} />)
                        : state.items.map((pkg, i) => <PackageCard key={pkg._id} pkg={pkg} index={i} className={cardWidth} />)}
                </div>
            </div>
        </section>
    );
};

export default SimilarJourneys;
