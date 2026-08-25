import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'outline' | 'solid';
    className?: string;
}

export default function Button({ children, href, onClick, variant = 'outline', className = '' }: ButtonProps) {
    const base = 'inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer';
    const styles: Record<string, string> = {
        outline: 'border border-white/50 text-white hover:border-white hover:bg-white/10',
        solid: 'bg-[#149ED8] text-white hover:bg-[#0e8dc0]',
    };
    const cls = `${base} ${styles[variant]} ${className}`;
    if (href) return <Link href={href} className={cls}>{children}</Link>;
    return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}
