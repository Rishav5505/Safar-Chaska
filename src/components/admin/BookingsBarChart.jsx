import React, { useMemo, useState } from 'react';

const DAY = 24 * 60 * 60 * 1000;
const dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

// Single-series bar chart of bookings created per day over the last `days` days. Plain divs, no deps.
const BookingsBarChart = ({ bookings, days = 30 }) => {
    const [hover, setHover] = useState(null);

    const series = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const buckets = Array.from({ length: days }, (_, i) => {
            const date = new Date(today.getTime() - (days - 1 - i) * DAY);
            return { date, key: dayKey(date), count: 0 };
        });
        const index = Object.fromEntries(buckets.map((b, i) => [b.key, i]));
        bookings.forEach((b) => {
            if (!b.createdAt) return;
            const d = new Date(b.createdAt);
            if (Number.isNaN(d.getTime())) return;
            const i = index[dayKey(d)];
            if (i !== undefined) buckets[i].count += 1;
        });
        return buckets;
    }, [bookings, days]);

    const total = series.reduce((s, b) => s + b.count, 0);
    const max = Math.max(1, ...series.map((b) => b.count));
    const fmt = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const active = hover !== null ? series[hover] : null;

    return (
        <div>
            <div className="flex items-baseline justify-between gap-3 mb-4">
                <p className="text-3xl font-black text-slate-900">{total}<span className="text-sm font-bold text-slate-400 ml-2">bookings</span></p>
                <p className="text-xs font-bold text-slate-500 h-4" aria-live="polite">
                    {active ? `${fmt(active.date)}: ${active.count} booking${active.count === 1 ? '' : 's'}` : total ? `Busiest day: ${max}` : 'No bookings in this period'}
                </p>
            </div>
            <div className="relative h-36 md:h-44" role="img" aria-label={`Bar chart: ${total} bookings in the last ${days} days`}>
                {/* recessive gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
                    <div className="border-t border-dashed border-slate-100" />
                    <div className="border-t border-dashed border-slate-100" />
                    <div className="border-t border-slate-200" />
                </div>
                <div className="absolute inset-0 flex items-end gap-[2px]" onMouseLeave={() => setHover(null)}>
                    {series.map((b, i) => (
                        <div
                            key={b.key}
                            className="flex-1 h-full flex items-end cursor-default"
                            onMouseEnter={() => setHover(i)}
                            onTouchStart={() => setHover(i)}
                            title={`${fmt(b.date)}: ${b.count}`}
                        >
                            <div
                                className={`w-full rounded-t-[4px] transition-all duration-300 ${b.count === 0 ? 'bg-slate-100' : hover === i ? 'bg-slate-900' : 'bg-primary'}`}
                                style={{ height: b.count === 0 ? '2px' : `${(b.count / max) * 100}%` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider" aria-hidden="true">
                <span>{fmt(series[0].date)}</span>
                <span>{fmt(series[Math.floor(days / 2)].date)}</span>
                <span>Today</span>
            </div>
            <table className="sr-only">
                <caption>Bookings per day, last {days} days</caption>
                <tbody>
                    {series.filter((b) => b.count > 0).map((b) => (
                        <tr key={b.key}><th scope="row">{fmt(b.date)}</th><td>{b.count}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsBarChart;
