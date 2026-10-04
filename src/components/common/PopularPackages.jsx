import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import PackageCard from './PackageCard';
import Button from './Button';
import API from '../../utils/api';

const PopularPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await API.get('/packages');
                if (data && data.length > 0) {
                    // Show featured packages first, or just the first 4
                    const sortedData = data
                        .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
                        .slice(0, 4)
                        .map(pkg => ({
                            ...pkg,
                            rating: pkg.rating || 4.9,
                            tag: pkg.tag || (pkg.isFeatured ? "Featured" : "Trending")
                        }));

                    setPackages(sortedData);
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-24 bg-sand">
            <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    if (packages.length === 0) return null;

    return (
        <section className="py-16 md:py-28 bg-sand text-ink">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <SectionHeader
                        className="!mb-0"
                        eyebrow="Curated Journeys"
                        title={<>Popular <em>escapes</em></>}
                        subtitle="Handpicked journeys for every kind of traveler."
                    />
                    <Link to="/packages" className="shrink-0">
                        <Button variant="outline" className="rounded-full px-8 py-3 text-sm">View All Packages <ArrowUpRight className="w-4 h-4" /></Button>
                    </Link>
                </div>

                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {packages.map((pkg, i) => <PackageCard key={pkg._id} pkg={pkg} index={i} />)}
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;
