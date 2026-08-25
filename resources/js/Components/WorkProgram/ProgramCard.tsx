import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProgramCardData, ProgramCardProps } from "@/types/workProgram";

export default function ProgramCard({ program, index }: ProgramCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const images: string[] = (program as ProgramCardData).images ?? [];

    useEffect(() => {
        if (isModalOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";
            document.body.style.width = "100%";
            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.overflow = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (!isModalOpen || images.length <= 1) return;
        const t = setInterval(
            () => setActiveSlide((p) => (p + 1) % images.length),
            4000,
        );
        return () => clearInterval(t);
    }, [isModalOpen, images.length]);

    const openModal = () => {
        setActiveSlide(0);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const prev = useCallback(
        () => setActiveSlide((p) => (p - 1 + images.length) % images.length),
        [images.length],
    );
    const next = useCallback(
        () => setActiveSlide((p) => (p + 1) % images.length),
        [images.length],
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover="hovered"
                className="group relative rounded-2xl cursor-pointer select-none h-full"
            >
                <motion.div
                    variants={{ hovered: { opacity: 1, scale: 1.04 } }}
                    initial={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="hidden md:block absolute -inset-0.5 rounded-2xl z-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 0%, rgba(19,158,216,0.35) 0%, transparent 70%)",
                        filter: "blur(6px)",
                    }}
                />

                <motion.div
                    variants={{
                        hovered: {
                            y: -4,
                            boxShadow:
                                "0 0 32px 2px rgba(19,158,216,0.15), 0 8px 40px rgba(0,0,0,0.8)",
                        },
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10 rounded-2xl overflow-hidden flex flex-col h-full"
                    style={{
                        background:
                            "linear-gradient(165deg, #0a0e14 0%, #05080d 50%, #01040a 100%)",
                        border: "1px solid rgba(19,158,216,0.2)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Desktop */}
                    <div className="hidden md:flex flex-col h-full">
                        <div className="relative flex items-center justify-center pt-8 px-6 pb-4">
                            <div className="relative w-full h-32 flex items-center justify-center">
                                <img
                                    src={program.logo}
                                    alt={program.title + " logo"}
                                    className="w-full h-full object-contain"
                                    style={{ background: "transparent" }}
                                />
                            </div>
                        </div>
                        <div className="mx-6 h-px bg-[rgba(19,158,216,0.1)]" />
                        <div className="p-6 flex flex-col gap-3 flex-1">
                            <span
                                className="text-white text-[10px] tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-work-sans)" }}
                            >
                                {program.date}
                            </span>
                            <h3
                                className="text-white text-xl font-bold leading-tight"
                                style={{ fontFamily: "var(--font-kanit)" }}
                            >
                                {program.title}
                            </h3>
                            <p
                                className="text-[#A3AFC2] text-sm leading-relaxed line-clamp-2"
                                style={{ fontFamily: "var(--font-work-sans)" }}
                            >
                                {program.subtitle}
                            </p>
                            <motion.button
                                variants={{
                                    hovered: {
                                        borderColor: "rgba(19,158,216,0.7)",
                                    },
                                }}
                                onClick={openModal}
                                className="mt-auto w-fit px-5 py-2 rounded-full text-xs text-[#A3AFC2] border border-[#2a3a50] transition-colors duration-300 hover:text-white hover:bg-[rgba(19,158,216,0.1)] cursor-pointer"
                                style={{ fontFamily: "var(--font-work-sans)" }}
                            >
                                Click for details
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex md:hidden flex-col relative p-5 pb-6 min-h-[11.25rem]">
                        <span
                            className="text-white text-[10px] tracking-widest uppercase mb-2"
                            style={{ fontFamily: "var(--font-work-sans)" }}
                        >
                            {program.date}
                        </span>
                        <h3
                            className="text-white text-lg font-bold leading-tight mb-2 pr-20"
                            style={{ fontFamily: "var(--font-kanit)" }}
                        >
                            {program.title}
                        </h3>
                        <p
                            className="text-[#A3AFC2] text-sm leading-relaxed line-clamp-3 pr-20"
                            style={{ fontFamily: "var(--font-work-sans)" }}
                        >
                            {program.subtitle}
                        </p>
                        <button
                            onClick={openModal}
                            className="mt-4 w-fit px-5 py-1.5 rounded-full text-xs text-[#A3AFC2] border border-[#2a3a50] hover:text-white hover:bg-[rgba(19,158,216,0.1)] transition-colors duration-300 cursor-pointer"
                            style={{ fontFamily: "var(--font-work-sans)" }}
                        >
                            Click for details
                        </button>
                        {program.logo && (
                            <div className="absolute bottom-4 right-4 w-16 h-16">
                                <img
                                    src={program.logo}
                                    alt={program.title + " logo"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
                                onClick={closeModal}
                            />
                            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pt-24 md:p-8 md:pt-32 pointer-events-none">
                                <motion.div
                                    key="modal"
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    className="relative w-full max-w-5xl pointer-events-auto rounded-2xl overflow-hidden flex flex-col md:flex-row bg-[#05080d]"
                                    style={{
                                        maxHeight: "85%",
                                        border: "1px solid rgba(19,158,216,0.3)",
                                        boxShadow:
                                            "0 24px 80px rgba(0,0,0,0.9)",
                                    }}
                                >
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white border border-white/20 hover:bg-[rgba(19,158,216,0.4)] transition-all cursor-pointer"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 12 12"
                                        >
                                            <path
                                                d="M1 1l10 10M11 1L1 11"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>

                                    {images.length > 0 && (
                                        <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto overflow-hidden bg-black shrink-0 flex-none">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeSlide}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0"
                                                >
                                                    <img
                                                        src={
                                                            images[activeSlide]
                                                        }
                                                        alt="Program"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                            {images.length > 1 && (
                                                <div className="absolute inset-0 flex items-center justify-between px-4">
                                                    <button
                                                        onClick={prev}
                                                        className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 transition-colors cursor-pointer"
                                                    >
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 10 10"
                                                            fill="none"
                                                            className="rotate-180"
                                                        >
                                                            <path
                                                                d="M3.5 1.5L7 5l-3.5 3.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={next}
                                                        className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 transition-colors cursor-pointer"
                                                    >
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 10 10"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M3.5 1.5L7 5l-3.5 3.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex-1 min-h-0 flex flex-col p-6 md:p-10 overflow-y-auto custom-scrollbar bg-gradient-to-br from-[#0a0e14] to-[#01040a]">
                                        <span
                                            className="w-fit px-3 py-1 rounded-full text-[10px] border border-[rgba(19,158,216,0.4)] text-[#139ED8] uppercase tracking-widest mb-4 shrink-0"
                                            style={{
                                                fontFamily:
                                                    "var(--font-work-sans)",
                                            }}
                                        >
                                            {program.date}
                                        </span>
                                        <h2
                                            className="text-white text-2xl md:text-3xl font-bold mb-4 shrink-0 pr-8"
                                            style={{
                                                fontFamily: "var(--font-kanit)",
                                            }}
                                        >
                                            {program.title}
                                        </h2>
                                        <div className="h-px w-full bg-[rgba(19,158,216,0.1)] mb-5 shrink-0" />
                                        <p
                                            className="text-[#9FB4C8] text-sm md:text-base leading-relaxed"
                                            style={{
                                                fontFamily:
                                                    "var(--font-work-sans)",
                                            }}
                                        >
                                            {program.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </>
    );
}
