import React from 'react';

const Separator = ({ variant = 'wave', color = 'fill-white', flip = false, height = "h-12 md:h-24" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
            {variant === 'wave' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            )}
            {variant === 'mountains' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z"></path>
                </svg>
            )}
            {variant === 'curve' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-1.14,1200,0V0H0Z"></path>
                </svg>
            )}
            {variant === 'slant' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M1200 120L0 120 1200 0z"></path>
                </svg>
            )}
            {variant === 'soft' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M0,0 C300,60 900,60 1200,0 V120 H0 Z" transform="rotate(180 600 60)"></path>
                </svg>
            )}
            {variant === 'horizon' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M0,0 L0,20 C150,80 350,10 500,40 C650,70 850,20 1000,50 C1100,70 1200,20 1200,20 L1200,0 Z" transform="rotate(180 600 60)"></path>
                </svg>
            )}
            {variant === 'peaks' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full ${height} ${color}`}>
                    <path d="M0 0 L0 100 L200 40 L400 80 L600 20 L800 90 L1000 30 L1200 100 L1200 0 Z" transform="rotate(180 600 60)"></path>
                </svg>
            )}
        </div>
    );
};

export default Separator;
