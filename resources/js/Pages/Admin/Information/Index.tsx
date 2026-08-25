import AdminLayout from '@/Layouts/AdminLayout';
import { Article, PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Props {
    articles: PaginatedData<Article>;
}

export default function Index({ articles }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this article?')) return;
        router.delete(route('admin.information.destroy', id));
    };

    return (
        <AdminLayout>
            <Head title="Information" />

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Information</span>
                <span>›</span>
                <span className="text-gray-300">List</span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Information</h1>
                <Link
                    href={route('admin.information.create')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                >
                    New Article
                </Link>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-left">
                            <th className="px-4 py-3 font-medium w-20">Image</th>
                            <th className="px-4 py-3 font-medium">Title</th>
                            <th className="px-4 py-3 font-medium">Category</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                    No articles yet.
                                </td>
                            </tr>
                        )}
                        {articles.data.map((article) => (
                            <tr key={article.id} className="border-b border-gray-800 hover:bg-white/[0.02]">
                                <td className="px-4 py-3">
                                    <img
                                        src={article.image_url}
                                        alt={article.image_alt ?? ''}
                                        className="w-14 h-10 object-cover rounded border border-gray-800"
                                    />
                                </td>
                                <td className="px-4 py-3 text-gray-300 max-w-md truncate">{article.title}</td>
                                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{article.category}</td>
                                <td className="px-4 py-3 text-gray-400">{article.date}</td>
                                <td className="px-4 py-3">
                                    {article.is_published ? (
                                        <span className="px-2 py-0.5 rounded text-xs bg-green-900/40 text-green-400 border border-green-800">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-500 border border-gray-700">
                                            Draft
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right space-x-3">
                                    <Link
                                        href={route('admin.information.edit', article.id)}
                                        className="text-amber-500 hover:text-amber-400 text-xs"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="text-red-500 hover:text-red-400 text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
                    <span>
                        Showing {articles.from ?? 0} to {articles.to ?? 0} of {articles.total} results
                    </span>
                    <div className="flex items-center gap-1">
                        {articles.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`w-7 h-7 flex items-center justify-center rounded text-xs transition-colors ${
                                        link.active
                                            ? 'bg-amber-500 text-white'
                                            : 'text-gray-400 hover:bg-white/5'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="w-7 h-7 flex items-center justify-center rounded text-xs text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
