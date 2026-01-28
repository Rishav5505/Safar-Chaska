import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.05] active:scale-[0.95] hover:shadow-2xl";

    const variants = {
        primary: "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark border border-white/10",
        secondary: "bg-secondary text-white shadow-lg shadow-secondary/30 hover:bg-secondary-dark border border-white/10",
        outline: "border-2 border-primary text-primary hover:bg-primary/5 bg-transparent",
        ghost: "text-slate-600 hover:text-primary hover:bg-slate-50",
        white: "bg-white text-slate-900 hover:bg-slate-50 shadow-xl shadow-black/5"
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

