import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = "shine inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-wide transition-all duration-500 ease-premium focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

    const variants = {
        primary: "bg-primary text-white shadow-[0_10px_30px_-10px_rgba(15,118,110,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(15,118,110,0.7)] hover:bg-[#0d6961]",
        secondary: "bg-secondary text-ink shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)] hover:bg-secondary-light",
        outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white bg-transparent",
        ghost: "text-slate-600 hover:text-primary hover:bg-slate-50",
        white: "bg-white text-ink hover:bg-sand shadow-premium",
        glass: "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white hover:text-ink"
    };

    const sizes = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

