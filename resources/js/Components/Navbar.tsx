import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutUs" },
    { label: "Work Program", href: "/workProgram" },
    { label: "Gallery", href: "/gallery" },
    { label: "Information", href: "/information" },
    { label: "IF's Website", href: "/error" },
];

export default function Navbar() {
    const { url } = usePage();
    const [navbarOpen, setNavbarOpen] = useState(false);

    useEffect(() => {
        setNavbarOpen(false);
    }, [url]);

    return (
        <header className="fixed top-10 inset-x-0 z-50 flex justify-center px-4 md:px-8">
            <nav
                className="relative flex w-full max-w-[87.5rem] items-center justify-between rounded-[2rem] bg-[#0B1524]/80 px-10 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150"
                aria-label="Primary"
            >
                <div
                    className="pointer-events-none absolute inset-0 rounded-[2rem] p-px bg-gradient-to-b from-white/30 to-[#005696]/80"
                    style={{
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />

                <Link
                    href="/"
                    className="relative flex items-center gap-3 text-white"
                >
                    <img
                        src="/assets/LogoHMIF.svg"
                        alt="HMIF UMN logo"
                        width={36}
                        height={36}
                    />
                    <span className="font-kanit text-lg tracking-wide">
                        <span className="font-bold">HMIF</span>
                        <span className="ml-1 font-light text-white/80">
                            UMN
                        </span>
                    </span>
                </Link>

                <button
                    aria-label={navbarOpen ? "Close menu" : "Open menu"}
                    onClick={() => setNavbarOpen((s) => !s)}
                    className="relative z-10 ml-4 p-2 text-white md:hidden cursor-pointer"
                >
                    {navbarOpen ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M6 6L18 18M6 18L18 6"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M3 6h18M3 12h18M3 18h18"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </button>

                <ul className="relative hidden items-center gap-10 md:flex">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? url === "/"
                                : url.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`text-sm transition-colors hover:text-white ${isActive ? "text-white" : "text-white/70"}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {navbarOpen && (
                    <div className="absolute left-0 top-[calc(100%+16px)] w-full rounded-3xl bg-[#0B1524]/95 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 md:hidden">
                        <div
                            className="pointer-events-none absolute inset-0 rounded-3xl p-px bg-gradient-to-b from-white/30 to-[#005696]/80"
                            style={{
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                            }}
                        />
                        <ul className="flex flex-col gap-6 relative z-10">
                            {navItems.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? url === "/"
                                        : url.startsWith(item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`block text-base transition-colors hover:text-white ${isActive ? "text-white font-bold" : "text-white/70"}`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
