import { CategoryKey, getCategoryColor, getCategoryLabel } from './categories';

type CardOtherProps = { category?: CategoryKey; title?: string; date?: string; excerpt?: string; image?: string; onClick?: () => void; isLast?: boolean };

export default function CardOther({ category = 'BEASISWA', title = '-', date = '-', excerpt = '-', image = '/', onClick, isLast }: CardOtherProps) {
    return (
        <div onClick={onClick} className={`font-kanit h-auto flex flex-col sm:flex-row gap-3 sm:gap-4 py-3 sm:py-4 px-0 ${!isLast ? 'border-b border-slate-700/20' : ''} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} transition-opacity duration-200`}>
            <div className="flex-1 min-w-0">
                <span className="inline-block px-2.5 py-1 mb-2 text-xs font-work-sans font-bold uppercase tracking-widest text-white rounded-full" style={{ backgroundColor: getCategoryColor(category) }}>{getCategoryLabel(category)}</span>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-1 line-clamp-2">{title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-1">{date}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{excerpt}</p>
            </div>
            <div className="hidden sm:flex flex-shrink-0 w-48 h-32 rounded overflow-hidden">
                <img src={image} alt="" className="w-full h-full object-cover block" />
            </div>
        </div>
    );
}
