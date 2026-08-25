import { Link } from '@inertiajs/react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/aboutUs' },
    { label: 'Work Program', href: '/workProgram' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Information', href: '/information' },
    { label: "IF's Website", href: 'https://if.umn.ac.id', external: true },
];

function Logos() {
    return (
        <div className="flex items-center gap-5 shrink-0">
            <img src="/assets/Home/logo-hmif.svg" alt="Logo HMIF" className="h-16 w-auto lg:h-28 object-contain" />
            <div className="w-px h-12 lg:h-24 bg-white/25 rounded-full" />
            <img src="/assets/Home/logo-umn1.svg" alt="Logo UMN" className="h-16 w-auto lg:h-28 object-contain" />
        </div>
    );
}

function AddressCredits() {
    return (
        <div>
            <p className="text-[0.75rem] text-[#8baabb] leading-[1.65] mb-3 max-w-[17.5rem]">
                Jl. Boulevard, Gading Serpong, Kel. Curug Sangereng,<br />
                Kec. Kelapa Dua, Kab. Tangerang, Prop. Banten,<br />
                Indonesia
            </p>
            <div className="text-[0.7rem] text-[#8baabb] leading-[1.8]">
                <p>Made with <span className="text-[#e05555]">❤</span> by <span className="text-[#cce3f0] font-medium">Gen XVI</span></p>
                <p>Developed by R&amp;D Team, Designed by Creative Team</p>
                <p>© 2026 HMIF UMN</p>
            </div>
        </div>
    );
}

function Nav({ align }: { align: 'left' | 'right' }) {
    return (
        <nav className={`shrink-0 ${align === 'right' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#4fa3d1] mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                    <li key={link.label}>
                        {link.external ? (
                            <a href={link.href} target="_blank" rel="noopener noreferrer"
                                className="text-[0.82rem] text-[#cce3f0] hover:text-white transition-colors duration-200">
                                {link.label}
                            </a>
                        ) : (
                            <Link href={link.href}
                                className="text-[0.82rem] text-[#cce3f0] hover:text-white transition-colors duration-200">
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#010511] px-6 py-10 sm:px-10 lg:px-[242px] lg:py-12">
            <img src="/assets/Home/footerL.svg" alt="" className="absolute left-0 top-0 h-full w-auto pointer-events-none select-none opacity-25 lg:opacity-100" aria-hidden />
            <img src="/assets/Home/footerR.svg" alt="" className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none opacity-25 lg:opacity-100" aria-hidden />

            {/* Mobile */}
            <div className="relative z-10 lg:hidden flex flex-col gap-8">
                <div className="flex items-center gap-5">
                    <Logos />
                    <div>
                        <h2 className="font-semibold text-[0.95rem] text-white tracking-[0.01em] mb-0.5 leading-snug">Himpunan Mahasiswa Informatika</h2>
                        <p className="text-[0.75rem] font-medium text-[#4fa3d1] tracking-[0.02em]">Universitas Multimedia Nusantara</p>
                    </div>
                </div>
                <div className="flex justify-between items-start gap-4">
                    <AddressCredits />
                    <Nav align="right" />
                </div>
            </div>

            {/* Desktop */}
            <div className="relative z-10 hidden lg:flex items-center justify-between gap-10">
                <Logos />
                <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-[1.05rem] text-white tracking-[0.01em] mb-0.5">Himpunan Mahasiswa Informatika</h2>
                    <p className="text-[0.8rem] font-medium text-[#4fa3d1] tracking-[0.02em] mb-3">Universitas Multimedia Nusantara</p>
                    <AddressCredits />
                </div>
                <Nav align="right" />
            </div>
        </footer>
    );
}
