import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    unread_contact: number;
    unread_aspiration: number;
    gallery_photos: number;
    kpi_members: number;
    custom_links: number;
}

interface RecentItem {
    id: number;
    name: string;
    message: string;
    read_at: string | null;
    created_at: string;
    type: 'contact' | 'aspiration';
}

interface Props {
    stats: Stats;
    recent: RecentItem[];
}

function StatCard({ label, value, href, badge }: { label: string; value: number; href: string; badge?: number }) {
    return (
        <Link href={href} className="group bg-[#1a1a1a] border border-gray-800 rounded-lg p-5 flex flex-col gap-3 hover:border-amber-500/40 transition-colors">
            <div className="flex items-start justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                {badge != null && badge > 0 && (
                    <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full leading-none">
                        {badge} new
                    </span>
                )}
            </div>
            <span className="text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">{value}</span>
        </Link>
    );
}

export default function Dashboard({ stats, recent }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <StatCard
                    label="Contact"
                    value={stats.unread_contact}
                    href={route('admin.contact-submissions.index')}
                    badge={stats.unread_contact}
                />
                <StatCard
                    label="Aspiration"
                    value={stats.unread_aspiration}
                    href={route('admin.aspiration-submissions.index')}
                    badge={stats.unread_aspiration}
                />
                <StatCard
                    label="Gallery Photos"
                    value={stats.gallery_photos}
                    href={route('admin.gallery.index')}
                />
                <StatCard
                    label="KPI Members"
                    value={stats.kpi_members}
                    href={route('admin.kpi.index')}
                />
                <StatCard
                    label="Custom Links"
                    value={stats.custom_links}
                    href={route('admin.custom-links.index')}
                />
            </div>

            {/* Recent submissions */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-300">Recent Submissions</h2>
                    <div className="flex gap-3 text-xs">
                        <Link href={route('admin.contact-submissions.index')} className="text-gray-500 hover:text-amber-400 transition-colors">Contact →</Link>
                        <Link href={route('admin.aspiration-submissions.index')} className="text-gray-500 hover:text-amber-400 transition-colors">Aspiration →</Link>
                    </div>
                </div>

                {recent.length === 0 ? (
                    <p className="px-5 py-10 text-center text-gray-600 text-sm">No submissions yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-800">
                        {recent.map((item) => (
                            <li key={`${item.type}-${item.id}`} className="px-5 py-4 flex items-start gap-4">
                                <div className="mt-1 shrink-0">
                                    {!item.read_at && <span className="block w-2 h-2 rounded-full bg-amber-500" />}
                                    {item.read_at && <span className="block w-2 h-2 rounded-full bg-gray-700" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm font-medium text-gray-200 truncate">{item.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.type === 'contact' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{item.message}</p>
                                </div>
                                <span className="text-xs text-gray-600 whitespace-nowrap shrink-0">
                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminLayout>
    );
}
