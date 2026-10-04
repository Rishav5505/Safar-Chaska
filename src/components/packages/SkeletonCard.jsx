// Placeholder card shown while packages load — mirrors PackageCard's proportions.
const SkeletonCard = ({ className = '' }) => (
    <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-sand-dark animate-pulse ${className}`} aria-hidden="true">
        <div className="absolute top-4 left-4 h-6 w-24 rounded-full bg-white/50" />
        <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/50" />
        <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
            <div className="h-2.5 w-24 rounded-full bg-white/60" />
            <div className="h-6 w-4/5 rounded-full bg-white/70" />
            <div className="h-6 w-3/5 rounded-full bg-white/70" />
            <div className="pt-4 mt-2 border-t border-white/50 flex items-end justify-between">
                <div className="space-y-2">
                    <div className="h-2.5 w-20 rounded-full bg-white/60" />
                    <div className="h-6 w-24 rounded-full bg-white/70" />
                </div>
                <div className="h-11 w-11 rounded-full bg-white/70" />
            </div>
        </div>
    </div>
);

export default SkeletonCard;
