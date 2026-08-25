import AdminLayout from '@/Layouts/AdminLayout';
import { PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Submission {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    read_at: string | null;
    created_at: string;
}

interface Props {
    submissions: PaginatedData<Submission>;
    unreadCount: number;
}

function SubmissionRow({ sub }: { sub: Submission }) {
    const [expanded, setExpanded] = useState(false);
    const isRead = sub.read_at !== null;

    const handleExpand = () => {
        setExpanded((v) => !v);
        if (!isRead) {
            router.patch(route('admin.aspiration-submissions.read', sub.id), {}, { preserveScroll: true });
        }
    };

    const handleDelete = () => {
        if (!confirm('Delete this submission?')) return;
        router.delete(route('admin.aspiration-submissions.destroy', sub.id), { preserveScroll: true });
    };

    return (
        <>
            <tr
                className={`border-b border-gray-800 cursor-pointer hover:bg-white/[0.02] transition-colors ${!isRead ? 'bg-amber-500/5' : ''}`}
                onClick={handleExpand}
            >
                <td className="px-4 py-3 w-2">
                    {!isRead && <span className="block w-2 h-2 rounded-full bg-amber-500" />}
                </td>
                <td className="px-4 py-3 text-sm text-gray-200 font-medium">
                    {sub.first_name} {sub.last_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{sub.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                    {sub.message}
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-right">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                        className="text-xs text-red-500 hover:text-red-400"
                    >
                        Delete
                    </button>
                </td>
            </tr>
            {expanded && (
                <tr className="border-b border-gray-800 bg-[#111]">
                    <td colSpan={6} className="px-6 py-4">
                        <p className="text-xs text-gray-500 mb-1">{sub.email}</p>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{sub.message}</p>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function Index({ submissions, unreadCount }: Props) {
    return (
        <AdminLayout>
            <Head title="Aspiration Submissions" />

            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-white">Aspiration Submissions</h1>
                {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        {unreadCount} new
                    </span>
                )}
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-left">
                            <th className="px-4 py-3 w-2" />
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Message</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                    No submissions yet.
                                </td>
                            </tr>
                        )}
                        {submissions.data.map((sub) => (
                            <SubmissionRow key={sub.id} sub={sub} />
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
                    <span>
                        Showing {submissions.from ?? 0} to {submissions.to ?? 0} of {submissions.total} results
                    </span>
                    <div className="flex items-center gap-1">
                        {submissions.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`w-7 h-7 flex items-center justify-center rounded text-xs transition-colors ${link.active ? 'bg-amber-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span key={i} className="w-7 h-7 flex items-center justify-center text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: link.label }} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
