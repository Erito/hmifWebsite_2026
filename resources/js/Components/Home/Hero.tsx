import { useEffect, useRef } from 'react';

export default function HeroSection({ heroImage }: { heroImage?: string | null }) {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const els = [headingRef.current, subtitleRef.current, descRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(32px)';
            setTimeout(() => {
                if (!el) return;
                el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + i * 150);
        });
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-end overflow-hidden pb-24 lg:pb-32">
            <div className="absolute inset-0 z-0">
                <img src={heroImage ?? '/assets/Home/HeroIMG.png'} alt="HMIF UMN Members" className="w-full h-full object-cover object-top grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-[#010511]" />
            </div>

            <div className="hidden lg:block absolute bottom-32 right-0 z-10 pointer-events-none w-[clamp(300px,42vw,810px)]">
                <img src="/assets/Home/supergraphics1.svg" alt="" aria-hidden className="w-full h-auto" />
            </div>
            <div className="hidden lg:block absolute bottom-32 left-0 z-10 pointer-events-none w-[clamp(40px,5.5vw,106px)]">
                <img src="/assets/Home/supergraphics2.svg" alt="" aria-hidden className="w-full h-auto" />
            </div>

            <div className="relative z-20 pl-[clamp(32px,8vw,110px)] w-full pb-0 translate-y-12 lg:translate-y-20">
                <h1 ref={headingRef} className="font-kanit text-white font-normal leading-[0.85] tracking-tighter m-0 mb-2 md:-mb-4 text-[clamp(56px,12vw,232px)]">
                    We are
                </h1>
                <p ref={subtitleRef} className="font-kanit font-bold leading-[0.85] tracking-tighter m-0 mb-6 text-[clamp(56px,12vw,232px)] bg-gradient-to-r from-[#149ED8] to-[#005696] bg-clip-text text-transparent w-full">
                    HMIF UMN
                </p>
                <p ref={descRef} className="text-white/80 text-[clamp(16px,1.1vw,20px)] leading-[1.8] max-w-2xl m-0" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    HMIF UMN is the official Informatics student organization at UMN, empowering students in technology and innovation.
                </p>
            </div>
        </section>
    );
}
