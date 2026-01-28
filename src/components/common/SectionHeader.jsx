import Reveal from './Reveal';

const SectionHeader = ({ title, subtitle, center = false }) => {
    return (
        <div className={`mb-12 ${center ? 'text-center' : ''}`}>
            <Reveal center={center} width="100%">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                    {title}
                </h2>
            </Reveal>

            {subtitle && (
                <div className={`h-1.5 w-24 bg-secondary rounded-full ${center ? 'mx-auto' : ''} mb-8 shadow-xl shadow-secondary/20`}></div>
            )}

            {subtitle && (
                <Reveal center={center} width="100%">
                    <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        {subtitle}
                    </p>
                </Reveal>
            )}
        </div>
    );
};

export default SectionHeader;
