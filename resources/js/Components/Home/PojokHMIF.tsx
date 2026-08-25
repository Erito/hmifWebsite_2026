import { useState } from "react";

type Product = { src: string; alt: string; name: string; tagline: string };

const PRODUCTS: Product[] = [
    {
        src: "/assets/Home/pojokHMIF/baju.svg",
        alt: "HMIF Jersey",
        name: "Nama merch",
        tagline: "limited edition",
    },
    {
        src: "/assets/Home/pojokHMIF/kertas.svg",
        alt: "HMIF Card",
        name: "Nama merch",
        tagline: "limited edition",
    },
    {
        src: "/assets/Home/pojokHMIF/jaket.svg",
        alt: "HMIF Hoodie",
        name: "Nama merch",
        tagline: "limited edition",
    },
];

type Slot = {
    tx: string;
    ty: string;
    scale: number;
    rotate: number;
    opacity: number;
    z: number;
    width: string;
};

const SLOTS: Slot[] = [
    {
        tx: "clamp(-1000px, -65vw, -620px)",
        ty: "clamp(-340px, -23vw, -210px)",
        scale: 0.55,
        rotate: 0,
        opacity: 0,
        z: 0,
        width: "clamp(150px,14vw,260px)",
    },
    {
        tx: "clamp(-720px, -48vw, -420px)",
        ty: "clamp(-260px, -17vw, -150px)",
        scale: 0.75,
        rotate: 0,
        opacity: 0.9,
        z: 1,
        width: "clamp(160px,16vw,280px)",
    },
    {
        tx: "clamp(-450px, -28vw, -260px)",
        ty: "clamp(-180px, -11vw, -90px)",
        scale: 0.9,
        rotate: 0,
        opacity: 1,
        z: 2,
        width: "clamp(190px,18vw,330px)",
    },
    {
        tx: "0px",
        ty: "0px",
        scale: 1,
        rotate: 0,
        opacity: 1,
        z: 3,
        width: "clamp(220px,26vw,400px)",
    },
    {
        tx: "clamp(380px, 28vw, 580px)",
        ty: "clamp(-260px, -17vw, -150px)",
        scale: 0.75,
        rotate: 0,
        opacity: 0.9,
        z: 1,
        width: "clamp(160px,16vw,280px)",
    },
    {
        tx: "clamp(680px, 50vw, 1000px)",
        ty: "clamp(-340px, -23vw, -210px)",
        scale: 0.55,
        rotate: 0,
        opacity: 0,
        z: 0,
        width: "clamp(150px,14vw,260px)",
    },
];

const SLOT_COUNT = SLOTS.length;
const ACTIVE_SLOT = 3;
const INSTANCES = Array.from({ length: SLOT_COUNT }, (_, i) => ({
    id: i,
    product: PRODUCTS[i % PRODUCTS.length],
}));

export default function PojokHMIFSection() {
    const [step, setStep] = useState(0);
    const go = (dir: -1 | 1) =>
        setStep((s) => (s + dir + SLOT_COUNT) % SLOT_COUNT);
    const activeProduct = INSTANCES[(ACTIVE_SLOT + step) % SLOT_COUNT].product;

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-[#010511]">
            <div
                className="absolute z-0 pointer-events-none"
                style={{
                    left: "70%",
                    top: "42%",
                    width: "44vw",
                    height: "44vw",
                    minWidth: "520px",
                    minHeight: "520px",
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle, rgba(20,158,216,0.28) 0%, transparent 65%)",
                    mixBlendMode: "color-dodge",
                    filter: "blur(60px)",
                }}
            />

            {/* ── Mobile layout ── */}
            <div className="lg:hidden relative z-20 flex flex-col min-h-screen px-6 pt-28 pb-16 gap-10">
                <div>
                    <h2 className="font-kanit font-semibold leading-[0.9] tracking-[-0.05em] text-[clamp(48px,14vw,72px)] bg-gradient-to-r from-[#149ED8] to-[#005696] bg-clip-text text-transparent">
                        PojokHMIF
                    </h2>
                    <p className="font-kanit font-normal text-[#F0F2F5] mt-3 leading-[1.05] tracking-[-0.04em] text-2xl">
                        &ldquo;Lorem ipsum dolor sit amet&rdquo;
                    </p>
                    <p
                        className="text-[#C2CAD6] mt-4 leading-relaxed text-sm"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Previous product"
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="flex-1 flex justify-center items-center h-52">
                        <img
                            src={activeProduct.src}
                            alt={activeProduct.alt}
                            className="max-h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Next product"
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 6L15 12L9 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col items-center gap-5 text-center">
                    <div>
                        <p className="font-kanit font-semibold text-[#F0F2F5] text-2xl leading-tight">
                            {activeProduct.name}
                        </p>
                        <p
                            className="italic text-[#F0F2F5] text-sm mt-1"
                            style={{ fontFamily: "var(--font-work-sans)" }}
                        >
                            {activeProduct.tagline}
                        </p>
                    </div>
                    <a
                        href="#"
                        className="inline-flex h-[52px] w-full max-w-xs items-center justify-center rounded-full border border-white/90 text-[#C2CAD6] text-base transition-colors hover:bg-white/5"
                        style={{
                            fontFamily: "var(--font-work-sans)",
                            backgroundImage:
                                "radial-gradient(ellipse at center, rgba(60,94,119,0.20) 0%, rgba(31,49,68,0.18) 40%, rgba(8,16,30,0.18) 75%, rgba(1,5,17,0.20) 100%)",
                        }}
                    >
                        View More Products
                    </a>
                </div>
            </div>

            {/* ── Desktop layout ── */}
            <div
                className="hidden lg:block absolute z-10 pointer-events-none"
                style={{ left: "70%", top: "42%" }}
                aria-hidden
            >
                {INSTANCES.map((inst) => {
                    const slotIndex =
                        (((inst.id - step) % SLOT_COUNT) + SLOT_COUNT) %
                        SLOT_COUNT;
                    const slot = SLOTS[slotIndex];
                    return (
                        <div
                            key={inst.id}
                            className="absolute top-0 left-0 transition-all duration-700 ease-out will-change-transform"
                            style={{
                                width: slot.width,
                                opacity: slot.opacity,
                                zIndex: slot.z,
                                transform: `translate(${slot.tx}, ${slot.ty}) translate(-50%, -50%) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                            }}
                        >
                            <img
                                src={inst.product.src}
                                alt=""
                                className="w-full h-auto select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                            />
                        </div>
                    );
                })}
            </div>

            <div
                className="hidden lg:block absolute z-30"
                style={{ left: "70%", top: "42%" }}
            >
                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Previous product"
                    className="absolute top-0 left-0 flex items-center justify-center w-11 h-11 text-white/80 hover:text-white transition-colors cursor-pointer"
                    style={{
                        transform:
                            "translate(calc(-50% - clamp(140px,15vw,220px)), -50%)",
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Next product"
                    className="absolute top-0 left-0 flex items-center justify-center w-11 h-11 text-white/80 hover:text-white transition-colors cursor-pointer"
                    style={{
                        transform:
                            "translate(calc(-50% + clamp(140px,15vw,220px)), -50%)",
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 6L15 12L9 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="hidden lg:flex relative z-20 w-full min-h-screen flex-row items-stretch pb-32 pointer-events-none">
                <div className="w-1/2 flex items-end pl-[clamp(32px,8vw,120px)] pr-8 pb-[15vh] pointer-events-auto">
                    <div>
                        <h2 className="font-kanit font-semibold m-0 leading-[0.9] tracking-[-0.05em] text-[clamp(56px,9vw,128px)] bg-gradient-to-r from-[#149ED8] to-[#005696] bg-clip-text text-transparent">
                            PojokHMIF
                        </h2>
                        <p className="font-kanit font-normal text-[#F0F2F5] m-0 mt-4 leading-[1.05] tracking-[-0.04em] text-[clamp(24px,4vw,56px)]">
                            &ldquo;Lorem ipsum dolor sit amet&rdquo;
                        </p>
                        <p
                            className="text-[#C2CAD6] mt-8 leading-normal text-[clamp(14px,1.05vw,20px)] max-w-xl"
                            style={{ fontFamily: "var(--font-work-sans)" }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div className="w-1/2 flex items-end justify-center px-8 pr-[clamp(32px,6vw,90px)] pb-[10vh] pointer-events-auto">
                    <div className="flex flex-col items-center gap-8 text-center w-full max-w-md">
                        <div className="flex flex-col items-center gap-3">
                            <p className="font-kanit font-semibold text-[#F0F2F5] m-0 leading-[0.9] tracking-[-0.05em] text-[clamp(28px,2.5vw,40px)]">
                                {activeProduct.name}
                            </p>
                            <p
                                className="italic text-[#F0F2F5] m-0 leading-[0.9] tracking-[-0.04em] text-[clamp(14px,1.1vw,20px)]"
                                style={{ fontFamily: "var(--font-work-sans)" }}
                            >
                                {activeProduct.tagline}
                            </p>
                        </div>
                        <a
                            href="#"
                            className="inline-flex h-[60px] w-full max-w-[21.75rem] items-center justify-center rounded-full border border-white/90 text-[#C2CAD6] text-[clamp(14px,1.1vw,20px)] transition-colors hover:bg-white/5"
                            style={{
                                fontFamily: "var(--font-work-sans)",
                                backgroundImage:
                                    "radial-gradient(ellipse at center, rgba(60,94,119,0.20) 0%, rgba(31,49,68,0.18) 40%, rgba(8,16,30,0.18) 75%, rgba(1,5,17,0.20) 100%)",
                            }}
                        >
                            View More Products
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
                <img
                    src="/assets/Home/pojokHMIF/supergraphics-pojokhmif.svg"
                    alt=""
                    className="w-full h-auto origin-bottom scale-[4] lg:scale-100"
                    aria-hidden
                />
            </div>
        </section>
    );
}
