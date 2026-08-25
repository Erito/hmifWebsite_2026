import AdminLayout from '@/Layouts/AdminLayout';
import { CustomLink, PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Props {
    customLinks: PaginatedData<CustomLink>;
}

export default function Index({ customLinks }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this custom link?')) return;
        router.delete(route('admin.custom-links.destroy', id));
    };

    return (
        <AdminLayout>
            <Head title="Custom Links" />

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Custom Link</span>
                <span>›</span>
                <span className="text-gray-300">List</span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Custom Link</h1>
                <Link
                    href={route('admin.custom-links.create')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                >
                    New Custom Link
                </Link>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-left">
                            <th className="px-4 py-3 font-medium">Origin URL</th>
                            <th className="px-4 py-3 font-medium">Custom Slug</th>
                            <th className="px-4 py-3 font-medium">Label</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customLinks.data.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                                    No custom links yet.
                                </td>
                            </tr>
                        )}
                        {customLinks.data.map((link) => (
                            <tr key={link.id} className="border-b border-gray-800 hover:bg-white/[0.02]">
                                <td className="px-4 py-3 text-gray-300 max-w-xs truncate">{link.destination_url}</td>
                                <td className="px-4 py-3 text-gray-300 font-mono text-xs">/{link.slug}</td>
                                <td className="px-4 py-3 text-gray-400">{link.label ?? '—'}</td>
                                <td className="px-4 py-3 text-right space-x-3">
                                    <Link
                                        href={route('admin.custom-links.edit', link.id)}
                                        className="text-amber-500 hover:text-amber-400 text-xs"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(link.id)}
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
                        Showing {customLinks.from ?? 0} to {customLinks.to ?? 0} of {customLinks.total} results
                    </span>
                    <div className="flex items-center gap-1">
                        {customLinks.links.map((link, i) =>
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
