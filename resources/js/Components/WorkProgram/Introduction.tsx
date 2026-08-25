import { useEffect, useRef } from 'react';
import AnimatedBackground from './AnimatedBackground';
import gsap from 'gsap';

export default function WorkProgramIntroduction() {
    const sectionRef = useRef<HTMLElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector('#program-list');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.intro-text', { y: 60, opacity: 0, duration: 1.5, stagger: 0.3, ease: 'power4.out' });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#010511]" style={{ background: 'radial-gradient(circle at center, #041520 0%, #010511 65%)' }}>
            <AnimatedBackground />
            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center">
                <h2 className="font-kanit intro-text text-[#F0F2F5] font-semibold whitespace-nowrap text-[8vw] md:text-7xl lg:text-8xl leading-none">Introducing</h2>
                <h1 className="font-kanit intro-text text-[#149ED8] font-bold mb-8 whitespace-nowrap text-[10vw] md:text-8xl lg:text-9xl leading-tight">Our Work Program</h1>
                <p className="intro-text text-[#C2CAD6] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                    Discover the exciting opportunities and initiatives that define our work program, shaping the future of our community.
                </p>
                <div className="intro-text">
                    <a href="#program-list" onClick={handleScroll} className="group flex items-center justify-center gap-3 w-fit px-8 py-3 rounded-full bg-[#020813] border border-[#2a3a50] transition-all duration-300 hover:bg-[rgba(19,158,216,0.15)] hover:border-[rgba(19,158,216,0.4)] cursor-pointer" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        <span className="text-base font-medium text-[#F0F2F5] transition-colors group-hover:text-white">Explore Below</span>
                        <span className="text-[#F0F2F5] text-xl transform group-hover:translate-y-1 transition-transform">↓</span>
                    </a>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#010511] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
