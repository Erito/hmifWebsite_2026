import { CategoryKey, getCategoryColor, getCategoryLabel } from './categories';

type CardInformationProps = {
    category?: CategoryKey | CategoryKey[];
    title?: string;
    date?: string;
    image?: string;
    imageAlt?: string;
    onReadMore?: () => void;
};

export default function CardInformation({ category = 'BEASISWA', title = 'Lorem ipsum', date = '20 Maret 2025', image = '/headNews.webp', imageAlt = 'Featured image', onReadMore }: CardInformationProps) {
    const categoryList = Array.isArray(category) ? category : [category];
    return (
        <div className="font-kanit h-[25rem] lg:h-[36rem] flex flex-col rounded-2xl overflow-hidden border border-cyan-400/40 bg-slate-900/70 hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 md:p-5 lg:p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {categoryList.map((cat, i) => (
                        <span key={i} className="inline-block px-3 py-1 rounded-full text-xs font-work-sans font-bold uppercase tracking-widest text-white" style={{ backgroundColor: getCategoryColor(cat) }}>{getCategoryLabel(cat)}</span>
                    ))}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-100 mb-2 md:mb-3 line-clamp-3 leading-tight tracking-tight">{title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 md:mb-5">{date}</p>
                <button onClick={onReadMore} className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-100/35 text-slate-100 hover:bg-slate-800/50 transition-colors duration-200">
                    Read More <span className="text-xs">{'>'}</span>
                </button>
            </div>
            <div className="flex-1 relative overflow-hidden">
                <img src={image} alt={imageAlt} className="w-full h-full object-cover block" />
            </div>
        </div>
    );
}
