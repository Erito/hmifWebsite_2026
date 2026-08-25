import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SupergraphicDesktop from "@/Components/Error/SupergraphicDesktop";
import SupergraphicMobile from "@/Components/Error/SupergraphicMobile";

interface Props {
    status: number;
}

const messages: Record<number, { description: string }> = {
    403: { description: "You don't have permission to access this page.\nContact the administrator if you believe this is a mistake." },
    404: { description: "The page you're looking for doesn't exist...\nTo return to the main page, click the button below!" },
    500: { description: "Something went wrong on our end.\nPlease try again later." },
    503: { description: "We're temporarily down for maintenance.\nPlease check back soon." },
};

const BUTTON_STYLE = {
    background: "radial-gradient(ellipse at center, rgba(60,94,119,0.2) 0%, rgba(1,5,17,0.2) 100%)",
};

function SplitChars({ text }: { text: string }) {
    return (
        <>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="char"
                    aria-hidden="true"
                    style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
                >
                    {char === " " ? " " : char}
                </span>
            ))}
        </>
    );
}

export default function Error({ status }: Props) {
    const { description } = messages[status] ?? {
        description: "An unexpected error occurred.\nPlease try again later.",
    };

    const rootRef = useRef<HTMLDivElement>(null);
    const headingText = `Error ${status}`;
    const descLines = description.split("\n");

    useEffect(() => {
        let removeListeners: (() => void) | null = null;

        const ctx = gsap.context(() => {
            /* ── Initial states ── */
            gsap.set(".anim-glow",     { opacity: 0, scale: 0.55 });
            gsap.set(".anim-logo",     { opacity: 0, y: 32, filter: "blur(12px)" });
            gsap.set(".char",          { opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)", transformOrigin: "50% 100%" });
            gsap.set(".anim-desc-line",{ opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" });
            gsap.set(".anim-btn",      { opacity: 0, y: 16, scale: 0.88 });
            gsap.set(".sg-desktop",    { opacity: 0, x: 48 });
            gsap.set(".sg-mobile",     { opacity: 0, y: 48 });

            /* ── Prep supergraphic paths for stroke-draw entrance ── */
            const allPaths = gsap.utils.toArray<SVGPathElement>(".sg-path");
            const drawablePaths: SVGPathElement[] = [];
            allPaths.forEach(path => {
                try {
                    const len = path.getTotalLength();
                    if (len > 0) {
                        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
                        drawablePaths.push(path);
                    }
                } catch (_) { /* element inside display:none — skip */ }
            });

            /* ── Entrance timeline ── */
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl
                // Glow blooms up first — sets the mood
                .to(".anim-glow",      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 0)

                // Logo drifts in with blur lift
                .to(".anim-logo",      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.15)

                // Heading chars cascade with 3-D perspective flip
                .to(".char", {
                    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
                    duration: 0.75,
                    stagger: { each: 0.042, ease: "power1.inOut" },
                    ease: "back.out(1.4)",
                }, 0.3)

                // Description lines reveal upward behind a clip mask
                .to(".anim-desc-line", {
                    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
                    duration: 0.65, stagger: 0.14, ease: "power2.out",
                }, 0.95)

                // Button springs in
                .to(".anim-btn",       { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(2.2)" }, 1.2)

                // Supergraphic container slides in
                .to(".sg-desktop",     { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" }, 0.18)
                .to(".sg-mobile",      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.35)

                // Individual paths draw in — strokes trace from random positions across the grid
                .to(drawablePaths, {
                    strokeDashoffset: 0,
                    duration: 0.9,
                    stagger: { each: 0.016, from: "random", ease: "power1.inOut" },
                    ease: "power2.inOut",
                }, 0.22)

                // After draw: activate proximity repulsion + glow
                .call(() => {
                    type PathInfo = { el: SVGPathElement; cx: number; cy: number; color: string };

                    const infos: PathInfo[] = [];
                    const displaced = new Set<SVGPathElement>();

                    drawablePaths.forEach(path => {
                        try {
                            const r = path.getBoundingClientRect();
                            if (r.width === 0 && r.height === 0) return;
                            const color = path.getAttribute("stroke") ?? "#ffffff";
                            infos.push({
                                el: path,
                                cx: r.left + r.width  / 2,
                                cy: r.top  + r.height / 2,
                                color,
                            });
                            // CSS owns the filter — GSAP never touches it, zero conflict
                            path.style.transition = "none";
                            path.style.filter = "";
                        } catch (_) {}
                    });

                    const RADIUS   = 160; // px — repulsion field size
                    const MAX_PUSH = 52;  // px — max displacement at center

                    const buildGlow = (t: number, color: string) => {
                        const g = (t * 8).toFixed(1);
                        return `drop-shadow(0 0 ${g}px ${color})`;
                    };

                    const springBack = (el: SVGPathElement, color: string) => {
                        gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
                        // CSS transition handles glow fade — GSAP never involved, no conflict
                        el.style.transition = "filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
                        el.style.filter = buildGlow(0, color);
                    };

                    const onMove = (e: MouseEvent) => {
                        infos.forEach(({ el, cx, cy, color }) => {
                            const dx   = e.clientX - cx;
                            const dy   = e.clientY - cy;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < RADIUS && dist > 0) {
                                const t     = 1 - dist / RADIUS; // 0→1 as cursor closes in
                                const force = t * MAX_PUSH;

                                // Position: short tween so push feels physical not teleport-y
                                gsap.to(el, {
                                    x: -(dx / dist) * force,
                                    y: -(dy / dist) * force,
                                    duration: 0.08,
                                    ease: "power2.out",
                                    overwrite: "auto",
                                });

                                // Glow: kill CSS transition so filter jumps instantly, no trail
                                el.style.transition = "none";
                                el.style.filter = buildGlow(t, color);

                                displaced.add(el);
                            } else if (displaced.has(el)) {
                                springBack(el, color);
                                displaced.delete(el);
                            }
                        });
                    };

                    const onLeave = () => {
                        displaced.forEach(el => {
                            const info = infos.find(i => i.el === el);
                            if (info) springBack(info.el, info.color);
                        });
                        displaced.clear();
                    };

                    window.addEventListener("mousemove", onMove);
                    window.addEventListener("mouseleave", onLeave);
                    removeListeners = () => {
                        window.removeEventListener("mousemove", onMove);
                        window.removeEventListener("mouseleave", onLeave);
                    };
                }, [], "+=0.2");

            /* ── Ambient: glow breathes ── */
            gsap.to(".anim-glow", {
                scale: 1.12, opacity: 0.85,
                duration: 3.8, ease: "sine.inOut",
                repeat: -1, yoyo: true, delay: 2.4,
            });

        }, rootRef);

        return () => {
            ctx.revert();
            removeListeners?.();
        };
    }, []);

    /* ── Magnetic button handlers ── */
    const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        gsap.to(e.currentTarget, {
            x: (e.clientX - r.left - r.width  / 2) * 0.38,
            y: (e.clientY - r.top  - r.height / 2) * 0.38,
            duration: 0.35, ease: "power2.out",
        });
    };
    const onBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.4)" });
    };

    return (
        <>
            <Head title={`Error ${status}`} />

            <div ref={rootRef} className="relative min-h-screen overflow-hidden bg-slate-950">

                {/* Glow */}
                <div
                    aria-hidden="true"
                    className="anim-glow pointer-events-none absolute"
                    style={{ left: "-100px", top: "-100px", width: "800px", height: "800px" }}
                >
                    <img src="/assets/Error/ellipse.svg" alt="" className="w-full h-full" />
                </div>

                {/* Desktop supergraphic — right */}
                <div
                    aria-hidden="true"
                    className="sg-desktop pointer-events-none hidden lg:flex absolute inset-y-0 right-0 items-center justify-end"
                    style={{ width: "45%" }}
                >
                    <SupergraphicDesktop />
                </div>

                {/* Mobile supergraphic — bottom */}
                <div
                    aria-hidden="true"
                    className="sg-mobile pointer-events-none lg:hidden absolute bottom-0 left-0 right-0"
                >
                    <SupergraphicMobile />
                </div>

                {/* ══ Mobile layout ══ */}
                <div className="lg:hidden flex flex-col items-center pt-[224px] pb-[42vh] px-[35px] relative z-10">

                    <div className="anim-logo flex items-center gap-3 mb-[56px]">
                        <img src="/assets/LogoHMIF.svg" alt="HMIF UMN logo" width={44} height={45} />
                        <span className="font-kanit text-[#f0f2f5] leading-none">
                            <span className="block font-bold text-[2rem] tracking-[-0.05em]">HMIF</span>
                            <span className="block font-medium text-2xl tracking-[-0.05em]">UMN</span>
                        </span>
                    </div>

                    <h1
                        className="font-kanit font-semibold text-[#f5fbfd] text-[56px] leading-[0.9] tracking-[-0.05em] text-center w-full mb-3"
                        style={{ perspective: "800px" }}
                        aria-label={headingText}
                    >
                        <SplitChars text={headingText} />
                    </h1>

                    <p className="font-sans text-[#c2cad6] text-base leading-[1.5] text-center w-full mb-[56px]">
                        {descLines.map((line, i) => (
                            <span key={i} className="anim-desc-line block">{line}</span>
                        ))}
                    </p>

                    <Link
                        href="/"
                        className="anim-btn inline-flex items-center justify-center h-[55px] w-[265px] rounded-full border border-white/70 text-[#c2cad6] font-sans text-base hover:bg-white/10 transition-colors duration-200"
                        style={BUTTON_STYLE}
                        onMouseMove={onBtnMove}
                        onMouseLeave={onBtnLeave}
                    >
                        Back to Home
                    </Link>
                </div>

                {/* ══ Desktop layout ══ */}
                <div
                    className="hidden lg:flex items-center min-h-screen relative z-10 w-full px-6"
                    style={{ paddingLeft: "clamp(24px, calc(8.33vw + 102px), 260px)" }}
                >
                    <div>
                        <div className="anim-logo flex items-center gap-3 mb-10">
                            <img src="/assets/LogoHMIF.svg" alt="HMIF UMN logo" width={44} height={45} />
                            <span className="font-kanit text-[#f0f2f5] leading-none">
                                <span className="block font-bold text-[2rem] tracking-[-0.05em]">HMIF</span>
                                <span className="block font-medium text-2xl tracking-[-0.05em]">UMN</span>
                            </span>
                        </div>

                        <h1
                            className="font-kanit font-semibold text-[#f5fbfd] leading-[0.9]"
                            style={{
                                fontSize: "clamp(56px, 8.88vw, 128px)",
                                letterSpacing: "-0.05em",
                                maxWidth: "691px",
                                perspective: "800px",
                            }}
                            aria-label={headingText}
                        >
                            <SplitChars text={headingText} />
                        </h1>

                        <p
                            className="font-sans text-[#c2cad6] leading-[1.5] mt-5 mb-[60px]"
                            style={{ fontSize: "clamp(16px, 1.4vw, 20px)", maxWidth: "691px" }}
                        >
                            {descLines.map((line, i) => (
                                <span key={i} className="anim-desc-line block">{line}</span>
                            ))}
                        </p>

                        <Link
                            href="/"
                            className="anim-btn inline-flex items-center justify-center h-[60px] px-16 rounded-full border border-white/70 text-[#c2cad6] font-sans text-2xl hover:bg-white/10 transition-colors duration-200"
                            style={BUTTON_STYLE}
                            onMouseMove={onBtnMove}
                            onMouseLeave={onBtnLeave}
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}
