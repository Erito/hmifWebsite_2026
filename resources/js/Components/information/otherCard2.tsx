import { CategoryKey, getCategoryColor, getCategoryLabel } from './categories';

type Card2Props = { category?: CategoryKey; title?: string; date?: string; image?: string; imageAlt?: string; onReadMore?: () => void };

function Card2({ category = 'BEASISWA', title = 'Lorem ipsum', date = '-', image = '/headNews.webp', imageAlt = '', onReadMore }: Card2Props) {
    return (
        <div className="font-kanit flex flex-col rounded-2xl overflow-hidden border border-cyan-400/40 bg-slate-900/70 hover:shadow-lg transition-shadow duration-300 relative">
            <div className="pointer-events-none absolute inset-0 rounded-2xl p-px bg-gradient-to-b from-white/30 to-[#005696]/80 z-0" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
            <div className="w-full h-48 relative overflow-hidden z-10">
                <img src={image} alt={imageAlt} className="w-full h-full object-cover block" />
            </div>
            <div className="p-4 md:p-5 lg:p-6 flex flex-col gap-3 flex-1 z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-work-sans font-bold uppercase tracking-widest text-white w-fit" style={{ backgroundColor: getCategoryColor(category) }}>{getCategoryLabel(category)}</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 line-clamp-3 leading-tight tracking-tight">{title}</h3>
                <p className="text-xs sm:text-sm text-slate-500">{date}</p>
                <button onClick={onReadMore} className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-100/35 text-slate-100 hover:bg-slate-800/50 transition-colors duration-200 w-fit mt-auto">
                    Read More <span className="text-xs">{'>'}</span>
                </button>
            </div>
        </div>
    );
}

export default function Card2Grid({ cards }: { cards: Card2Props[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {cards.map((card, i) => <Card2 key={i} {...card} />)}
        </div>
    );
}
