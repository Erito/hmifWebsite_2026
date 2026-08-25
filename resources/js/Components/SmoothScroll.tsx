import gsap from 'gsap';
import Lenis from 'lenis';
import { ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const isGallery = url === '/gallery';

    useEffect(() => {
        if (isGallery) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        const lenisRaf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenisRaf);
            lenis.destroy();
        };
    }, [isGallery]);

    return <>{children}</>;
}
