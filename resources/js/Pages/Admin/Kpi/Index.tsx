import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { KpiMember } from '@/types';

interface Props {
    kpiMembers: KpiMember[];
}

export default function Index({ kpiMembers }: Props) {
    const grouped = kpiMembers.reduce<Record<string, KpiMember[]>>((acc, m) => {
        if (!acc[m.division]) acc[m.division] = [];
        acc[m.division].push(m);
        return acc;
    }, {});

    return (
        <AdminLayout>
            <Head title="KPI Members" />
            <h1 className="text-2xl font-bold text-white mb-6">KPI Members</h1>

            <div className="space-y-6">
                {Object.entries(grouped).map(([division, members]) => (
                    <div key={division} className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-800 bg-[#222]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{division}</p>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium">Name</th>
                                    <th className="text-right px-4 py-2 text-gray-500 font-medium">Overall</th>
                                    <th className="w-20 px-4 py-2" />
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((m) => (
                                    <tr key={m.id} className="border-b border-gray-800/50 last:border-0 hover:bg-white/[0.02]">
                                        <td className="px-4 py-3 text-white">{m.name}</td>
                                        <td className="px-4 py-3 text-right font-mono text-amber-400">
                                            {m.overall.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                href={route('admin.kpi.edit', m.id)}
                                                className="text-xs text-gray-400 hover:text-white transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
