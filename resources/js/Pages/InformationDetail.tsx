import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import CardOther from "@/Components/information/otherCard";
import {
    CategoryKey,
    getCategoryColor,
    getCategoryLabel,
} from "@/Components/information/categories";

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

interface Props {
    id: number;
}

export default function InformationDetail({ id }: Props) {
    const [article, setArticle] = useState<Article | null>(null);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchArticleData();
    }, [id]);

    const fetchArticleData = async () => {
        try {
            const [articleRes, allRes] = await Promise.all([
                fetch(`/api/information/articles/${id}`),
                fetch("/api/information/articles"),
            ]);

            if (!articleRes.ok) {
                setError("Article not found");
                setLoading(false);
                return;
            }

            const articleData = await articleRes.json();
            const allData = await allRes.json();

            setArticle(articleData.data);
            setAllArticles(allData.data as Article[]);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error fetching article",
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <Head title="Loading" />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                    <p className="text-gray-400">Loading article...</p>
                </div>
            </AppLayout>
        );
    }

    if (error || !article) {
        return (
            <AppLayout>
                <Head title="Not Found" />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                    <p className="text-red-400">
                        {error || "Article not found"}
                    </p>
                </div>
            </AppLayout>
        );
    }

    const getOtherArticles = (articleId: number) =>
        allArticles.filter((a) => a.id !== articleId);

    const others = getOtherArticles(id).slice(0, 3);

    return (
        <AppLayout>
            <Head title={article.title} />
            <section className="min-h-screen bg-slate-950 flex flex-col items-center px-4 md:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
                <div className="w-full max-w-[87.5rem]">
                    <div className="font-kanit grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                        <div className="flex flex-col rounded-2xl overflow-hidden border border-cyan-400/40 bg-slate-900/70">
                            <div className="p-4 md:p-5 lg:p-6">
                                <button
                                    onClick={() => router.visit("/information")}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-100/35 text-slate-100 hover:bg-slate-800/50 transition-colors duration-200 mb-4"
                                >
                                    <span className="text-xs">←</span> Back
                                </button>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span
                                        className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white"
                                        style={{
                                            backgroundColor: getCategoryColor(
                                                article.category,
                                            ),
                                        }}
                                    >
                                        {getCategoryLabel(article.category)}
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-100 mb-3 leading-tight tracking-tight">
                                    {article.title}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                                    {article.date}
                                </p>
                                <div className="rounded-lg overflow-hidden mb-6 md:mb-8">
                                    <img
                                        src={article.image_url}
                                        alt={article.image_alt}
                                        className="w-full h-auto object-cover block"
                                    />
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    {article.content
                                        .split("\n\n")
                                        .map((paragraph, i) => (
                                            <p
                                                key={i}
                                                className="text-sm sm:text-base text-slate-300 mb-4 leading-relaxed text-justify whitespace-pre-wrap"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="border border-cyan-400/40 bg-slate-900/70 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col">
                            <h2 className="text-lg sm:text-xl font-black text-slate-100 mb-4">
                                Other News
                            </h2>
                            {others.map((a, i) => (
                                <CardOther
                                    key={a.id}
                                    category={a.category}
                                    title={a.title}
                                    date={a.date}
                                    excerpt={a.excerpt}
                                    image={a.image_url}
                                    onClick={() =>
                                        router.visit(
                                            `/information/detail/${a.id}`,
                                        )
                                    }
                                    isLast={i === others.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
