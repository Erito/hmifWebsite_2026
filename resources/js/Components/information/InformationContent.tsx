import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SectionHeader from './header';
import CardInformation from './cardInformation';
import CardOther from './otherCard';
import Card2Grid from './otherCard2';
import { CategoryKey } from './categories';

interface Article {
    id: number;
    category: CategoryKey;
    title: string;
    date: string;
    image_url: string;
    image_alt: string;
    excerpt: string;
    content: string;
}

const GRID_PAGE_SIZE = 4;

export default function InformationContent() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gridCount, setGridCount] = useState(GRID_PAGE_SIZE);

    useEffect(() => {
        fetch('/api/information/articles')
            .then((r) => { if (!r.ok) throw new Error('Failed to fetch articles'); return r.json(); })
            .then((result) => setArticles(result.data as Article[]))
            .catch((err) => setError(err instanceof Error ? err.message : 'Error fetching articles'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="font-work-sans font-bold py-8 sm:py-12 lg:py-10 mx-4">
                <SectionHeader />
                <div className="flex items-center justify-center py-12">
                    <p className="text-white">Loading articles...</p>
                </div>
            </section>
        );
    }

    if (error || articles.length === 0) {
        return (
            <section className="font-work-sans font-bold py-8 sm:py-12 lg:py-10 mx-4">
                <SectionHeader />
                <div className="flex items-center justify-center py-12">
                    <p className="text-white">{error ?? 'No articles available.'}</p>
                </div>
            </section>
        );
    }

    const featured = articles[0];
    const sidebarArticles = articles.slice(1, 4);
    const gridArticles = articles.slice(4, 4 + gridCount);
    const hasMore = 4 + gridCount < articles.length;

    return (
        <section className="font-work-sans font-bold py-8 sm:py-12 lg:py-10 mx-4">
            <SectionHeader />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <CardInformation
                    category={featured.category}
                    title={featured.title}
                    date={featured.date}
                    image={featured.image_url}
                    imageAlt={featured.image_alt}
                    onReadMore={() => router.visit(`/information/detail/${featured.id}`)}
                />
                <div className="lg:h-[36rem] border border-cyan-400/40 bg-slate-900/70 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col h-auto hover:shadow-lg transition-shadow duration-300">
                    {sidebarArticles.map((article, index) => (
                        <CardOther
                            key={article.id}
                            category={article.category}
                            title={article.title}
                            date={article.date}
                            excerpt={article.excerpt}
                            image={article.image_url}
                            onClick={() => router.visit(`/information/detail/${article.id}`)}
                            isLast={index === sidebarArticles.length - 1}
                        />
                    ))}
                </div>
            </div>

            {gridArticles.length > 0 && (
                <div className="mt-12 lg:mt-16">
                    <Card2Grid
                        cards={gridArticles.map((card) => ({
                            category: card.category,
                            title: card.title,
                            date: card.date,
                            image: card.image_url,
                            imageAlt: card.image_alt,
                            onReadMore: () => router.visit(`/information/detail/${card.id}`),
                        }))}
                    />
                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => setGridCount((prev) => prev + GRID_PAGE_SIZE)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full border border-slate-100/35 text-white hover:bg-slate-800/50 transition-colors duration-200"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
