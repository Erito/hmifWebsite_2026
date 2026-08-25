import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '@/components/ui/Button';

const TAGLINES = ['Innovate.', 'Inspire.', 'Impact.'] as const;

// 5x-wide gradient with 15% pure-dark tails on each end. At rest (p=0%) the element
// shows the left tail (dark). The bright spot sits at the 50% mark of the 5W gradient,
// so it's 1.5 element-widths off-screen when the sweep begins — the band fades in
// gradually rather than popping in at the edge.
const SHIMMER_GRADIENT =
    'linear-gradient(110deg, #0A3F6E 0%, #0A3F6E 15%, #0F72B3 28%, #149ED8 40%, #3DBAE0 46%, #6DCFEE 50%, #3DBAE0 54%, #149ED8 60%, #0F72B3 72%, #0A3F6E 85%, #0A3F6E 100%)';

export default function AboutSection() {
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const els = textRefs.current.filter((el): el is HTMLParagraphElement => el !== null);
        if (els.length === 0) return;

        // Shimmer sweep — all 3 words move together (no stagger) so it reads as
        // one slow reflection passing across the whole text block.
        const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
        shimmerTl.fromTo(els,
            { backgroundPosition: '100% center' },
            { backgroundPosition: '0% center', duration: 2.8, ease: 'power1.inOut' }
        );

        // Subtle glow pulse — barely-there ambient halo, not a neon blast.
        const glowTl = gsap.timeline({ repeat: -1, yoyo: true });
        glowTl.to(els, {
            filter: 'drop-shadow(0 0 10px rgba(20,158,216,0.45))',
            duration: 3.2,
            ease: 'sine.inOut',
        });

        return () => {
            shimmerTl.kill();
            glowTl.kill();
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#010511] py-20 lg:py-0">
            <div
                className="absolute z-0 pointer-events-none"
                style={{
                    top: '50%', left: '25%', width: '50vw', height: '50vw',
                    minWidth: '600px', minHeight: '600px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(20,158,216,0.3) 0%, transparent 65%)',
                    mixBlendMode: 'color-dodge',
                    filter: 'blur(50px)',
                }}
            />

            <div className="absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[50%] z-0 pointer-events-none opacity-70 lg:opacity-100">
                <img src="/assets/Home/supergraphics3.svg" alt="" className="w-full h-full object-cover object-center lg:object-right" />
            </div>

            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full lg:w-auto pl-[clamp(32px,8vw,120px)] flex flex-col">
                    {TAGLINES.map((word, i) => (
                        <p
                            key={word}
                            ref={el => { textRefs.current[i] = el; }}
                            className="font-kanit font-semibold m-0 select-none"
                            style={{
                                fontSize: 'clamp(80px, 15vw, 200px)',
                                lineHeight: 0.9,
                                letterSpacing: '-0.04em',
                                marginBottom: i < TAGLINES.length - 1 ? '-0.069em' : 0,
                                color: 'transparent',
                                backgroundImage: SHIMMER_GRADIENT,
                                backgroundSize: '500% 100%',
                                backgroundPosition: '0% center',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                            }}
                        >
                            {word}
                        </p>
                    ))}
                </div>

                <div className="w-full lg:max-w-xl text-left lg:text-right px-8 mt-16 lg:mt-0 lg:mr-24" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    <p className="text-white/70 text-[clamp(15px,0.95vw,16px)] leading-[1.85] mb-8">
                        As part of our mission, HMIF adopts a tagline that reflects the values and objectives behind its establishment:{' '}
                        <strong className="text-white font-semibold">Innovate, Inspire, Impact.</strong>{' '}
                        These three words represent HMIF&apos;s commitment
                    </p>
                    <div className="flex justify-start lg:justify-end">
                        <Button href="/aboutUs">Get to know us</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
