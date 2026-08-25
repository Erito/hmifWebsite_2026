import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface GalleryPhoto {
    id: number;
    image_url: string;
    title: string | null;
    description: string | null;
}

interface CanvasSlot { x: number; y: number; w: number; h: number }

interface Props {
    photos: GalleryPhoto[];
}

const TILE_W = 1920;
const TILE_H = 1280;
const TILE_RANGE = [-1, 0, 1, 2];

const SLOT_POOL: CanvasSlot[] = [
    { x: 208,  y: 20,   w: 417, h: 279 },
    { x: 269,  y: 478,  w: 398, h: 265 },
    { x: 816,  y: 208,  w: 368, h: 246 },
    { x: -8,   y: 859,  w: 438, h: 292 },
    { x: 1375, y: 311,  w: 450, h: 300 },
    { x: 1391, y: 790,  w: 416, h: 277 },
    { x: 828,  y: 677,  w: 454, h: 303 },
    { x: 1127, y: 1138, w: 404, h: 270 },
    { x: 660,  y: 30,   w: 360, h: 240 },
    { x: 1100, y: 40,   w: 350, h: 233 },
    { x: 40,   y: 120,  w: 380, h: 253 },
    { x: 700,  y: 430,  w: 385, h: 257 },
    { x: 1580, y: 50,   w: 360, h: 240 },
    { x: 1600, y: 1120, w: 370, h: 247 },
    { x: 80,   y: 570,  w: 400, h: 267 },
    { x: 1220, y: 820,  w: 375, h: 250 },
    { x: 550,  y: 820,  w: 395, h: 263 },
    { x: 850,  y: 980,  w: 380, h: 253 },
    { x: 250,  y: 1070, w: 420, h: 280 },
    { x: 1550, y: 1200, w: 370, h: 247 },
];

function applyNorm(el: HTMLElement, x: number, y: number) {
    const normX = (((x % TILE_W) + TILE_W) % TILE_W) - TILE_W;
    const normY = (((y % TILE_H) + TILE_H) % TILE_H) - TILE_H;
    gsap.set(el, { x: normX, y: normY });
}

function GridIcon({ active }: { active: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            {[0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => <rect key={`${row}-${col}`} x={col * 6} y={row * 6} width="4" height="4" rx="0.8" fill={active ? '#111' : 'rgba(194,202,214,0.8)'} />))}
        </svg>
    );
}

function ExperienceIcon({ active }: { active: boolean }) {
    const c = active ? '#111' : 'rgba(194,202,214,0.8)';
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <rect x="0" y="0" width="6" height="4" rx="1" fill={c} /><rect x="8" y="2" width="8" height="4" rx="1" fill={c} />
            <rect x="2" y="7" width="7" height="4" rx="1" fill={c} /><rect x="11" y="6" width="5" height="4" rx="1" fill={c} />
            <rect x="0" y="12" width="9" height="4" rx="1" fill={c} /><rect x="11" y="12" width="5" height="4" rx="1" fill={c} />
        </svg>
    );
}

function PhotoPopup({ photos, index, onClose, onNavigate }: {
    photos: GalleryPhoto[];
    index: number;
    onClose: () => void;
    onNavigate: (dir: number) => void;
}) {
    const photo = photos[index];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010511]/85 px-8 backdrop-blur-md" onClick={onClose}>
            <div className="relative flex w-full max-w-[1400px] flex-col items-center gap-10 lg:flex-row lg:gap-16" onClick={(e) => e.stopPropagation()}>
                <div className="flex w-full justify-center lg:w-1/2">
                    <img src={photo.image_url} alt={photo.title ?? ''} className="w-full max-w-[827px] rounded-lg object-cover shadow-[0px_4px_52px_0px_rgba(2,7,19,0.64)]" style={{ aspectRatio: '827/551' }} />
                </div>
                <div className="flex w-full flex-col items-center gap-7 lg:w-1/2">
                    <button onClick={onClose} className="cursor-pointer text-2xl text-[#c2cad6] underline hover:text-white" style={{ fontFamily: 'var(--font-work-sans)' }}>Kembali</button>
                    <button onClick={() => onNavigate(-1)} aria-label="Previous" className="flex size-[42px] cursor-pointer items-center justify-center text-[#c2cad6] hover:text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-full"><polyline points="6 15 12 9 18 15" /></svg>
                    </button>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-xl font-bold uppercase tracking-[1px] text-[#c2cad6]" style={{ fontFamily: 'var(--font-work-sans)' }}>Katalog Foto-Foto</p>
                        <p className="text-4xl font-semibold tracking-[-2px] text-[#f0f2f5] lg:text-5xl font-kanit">
                            {photo.title ?? 'Untitled'}
                        </p>
                        {photo.description && (
                            <p className="text-sm text-[#c2cad6]/70 max-w-xs mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                {photo.description}
                            </p>
                        )}
                    </div>
                    <button onClick={() => onNavigate(1)} aria-label="Next" className="flex size-[42px] cursor-pointer items-center justify-center text-[#c2cad6] hover:text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-full"><polyline points="6 9 12 15 18 9" /></svg>
                    </button>
                    <p className="text-sm text-[#c2cad6]/60" style={{ fontFamily: 'var(--font-work-sans)' }}>{index + 1} / {photos.length} · Esc to close</p>
                </div>
            </div>
        </div>
    );
}

export default function Gallery({ photos }: Props) {
    const [selected, setSelected] = useState<number | null>(null);
    const [isGridView, setIsGridView] = useState(false);
    const logical = useRef({ x: 0, y: 0 });
    const canvasInnerRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number; lastX: number; lastY: number; lastT: number; moved: boolean } | null>(null);
    const vel = useRef({ x: 0, y: 0 });

    const slots = photos.map((p, i) => ({ ...SLOT_POOL[i % SLOT_POOL.length], ...p }));

    useEffect(() => { if (canvasInnerRef.current) applyNorm(canvasInnerRef.current, 0, 0); }, []);
    useEffect(() => {
        if (selected === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
            else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setSelected((s) => ((s ?? 0) + 1) % photos.length);
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setSelected((s) => ((s ?? 0) - 1 + photos.length) % photos.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected, photos.length]);

    const moveTo = (x: number, y: number) => { logical.current = { x, y }; if (canvasInnerRef.current) applyNorm(canvasInnerRef.current, x, y); };
    const onPointerDown = (e: React.PointerEvent) => { tweenRef.current?.kill(); vel.current = { x: 0, y: 0 }; dragRef.current = { startX: e.clientX, startY: e.clientY, ox: logical.current.x, oy: logical.current.y, lastX: e.clientX, lastY: e.clientY, lastT: performance.now(), moved: false }; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); };
    const onPointerMove = (e: React.PointerEvent) => { const d = dragRef.current; if (!d) return; const dx = e.clientX - d.startX; const dy = e.clientY - d.startY; if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true; const now = performance.now(); const dt = now - d.lastT; if (dt > 0 && dt < 100) vel.current = { x: (e.clientX - d.lastX) / dt, y: (e.clientY - d.lastY) / dt }; d.lastX = e.clientX; d.lastY = e.clientY; d.lastT = now; moveTo(d.ox + dx, d.oy + dy); };
    const onPointerUp = (e: React.PointerEvent) => { const d = dragRef.current; if (!d) return; try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {} if (!d.moved) { const target = document.elementFromPoint(e.clientX, e.clientY); const photoEl = (target as HTMLElement | null)?.closest<HTMLElement>('[data-photo-idx]'); if (photoEl) { const idx = Number(photoEl.dataset.photoIdx); if (!Number.isNaN(idx)) setSelected(idx); } } else { const t = { x: logical.current.x, y: logical.current.y }; tweenRef.current = gsap.to(t, { x: t.x + vel.current.x * 1000, y: t.y + vel.current.y * 1000, duration: 1.8, ease: 'power3.out', onUpdate() { moveTo(t.x, t.y); } }); } dragRef.current = null; };
    const onWheel = (e: React.WheelEvent) => { tweenRef.current?.kill(); moveTo(logical.current.x - e.deltaX, logical.current.y - e.deltaY); };

    if (photos.length === 0) {
        return (
            <AppLayout>
                <Head title="Gallery" />
                <main className="relative flex items-center justify-center bg-[#010511]" style={{ height: '100vh' }}>
                    <p className="text-[#c2cad6]/50 text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>No photos yet.</p>
                </main>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Gallery" />
            <main className="relative overflow-hidden bg-[#010511] select-none" style={{ height: '100vh' }}>
                <div className="pointer-events-none absolute left-[10%] top-[20%] size-[600px] rounded-full bg-[#149ed8] opacity-20 blur-[180px]" />
                <div className="pointer-events-none absolute right-[5%] bottom-[10%] size-[520px] rounded-full bg-[#005696] opacity-25 blur-[200px]" />

                <div className="pointer-events-none absolute inset-x-0 top-[140px] z-30 flex justify-center">
                    <div className="pointer-events-auto flex items-center overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-md" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        <button onClick={() => setIsGridView(false)} className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-all duration-200 ${!isGridView ? 'bg-white text-[#111] shadow-sm' : 'text-[#c2cad6] hover:text-white'} rounded-full`}>
                            <ExperienceIcon active={!isGridView} /> experience
                        </button>
                        <button onClick={() => setIsGridView(true)} className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-all duration-200 ${isGridView ? 'bg-white text-[#111] shadow-sm' : 'text-[#c2cad6] hover:text-white'} rounded-full`}>
                            <GridIcon active={isGridView} /> grid view
                        </button>
                    </div>
                </div>

                {/* Grid view */}
                <div className={`absolute inset-0 z-20 overflow-y-auto px-10 pt-[220px] pb-8 transition-opacity duration-500 ${isGridView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {photos.map((p, i) => (
                            <button key={p.id} onClick={() => setSelected(i)} className="group relative cursor-pointer overflow-hidden rounded-xl bg-white/5 aspect-[3/2] border border-white/10 hover:border-white/30 transition-all duration-300">
                                <img src={p.image_url} alt={p.title ?? ''} draggable={false} className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {p.title && (
                                    <span className="absolute bottom-3 left-3 right-3 text-xs text-white/80 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left truncate">
                                        {p.title}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Infinite canvas view */}
                <div className={`absolute inset-0 touch-none cursor-grab active:cursor-grabbing transition-opacity duration-500 ${isGridView ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onWheel={onWheel}>
                    <div ref={canvasInnerRef} className="absolute left-0 top-0 will-change-transform">
                        {TILE_RANGE.flatMap((ty) => TILE_RANGE.flatMap((tx) => slots.map((s, i) => (
                            <img key={`${tx}:${ty}:${i}`} src={s.image_url} alt={s.title ?? ''} draggable={false} data-photo-idx={i} className="absolute max-w-none rounded-lg object-cover shadow-[0px_3px_9.4px_0px_rgba(0,0,0,0.37)] grayscale transition-[transform,filter] duration-300 hover:grayscale-0 hover:scale-[1.03]" style={{ left: s.x + tx * TILE_W, top: s.y + ty * TILE_H, width: s.w, height: s.h }} />
                        ))))}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(1,5,17,0.75)_95%,#010511_100%)]" />
                </div>

                <div className={`pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-[#c2cad6] backdrop-blur-md transition-opacity duration-500 ${isGridView ? 'opacity-0' : 'opacity-100'}`} style={{ fontFamily: 'var(--font-work-sans)' }}>
                    Drag to explore · Click a photo to open
                </div>

                {selected !== null && (
                    <PhotoPopup
                        photos={photos}
                        index={selected}
                        onClose={() => setSelected(null)}
                        onNavigate={(dir) => setSelected((s) => ((s ?? 0) + dir + photos.length) % photos.length)}
                    />
                )}
            </main>
        </AppLayout>
    );
}
