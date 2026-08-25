import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface DivisionMember {
    id: number;
    name: string;
    division: string;
    role_title: string;
    image_path: string | null;
}

interface Props {
    grouped: Record<string, DivisionMember[]>;
}

export default function Index({ grouped }: Props) {
    return (
        <AdminLayout>
            <Head title="Divisi" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Divisi</h1>
                <Link
                    href={route('admin.about-us.division-members.create')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                >
                    Add Member
                </Link>
            </div>

            <div className="space-y-6">
                {Object.entries(grouped).map(([division, members]) => (
                    <div key={division} className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-800 bg-[#222]">
                            <p className="text-sm font-semibold text-gray-300">{division}</p>
                        </div>
                        <div className="divide-y divide-gray-800">
                            {members.map((member) => (
                                <div key={member.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                                    {member.image_path && (
                                        <img
                                            src={`/storage/${member.image_path}`}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{member.name}</p>
                                        <p className="text-gray-500 text-sm">{member.role_title}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.about-us.division-members.edit', member.id)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('admin.about-us.division-members.destroy', member.id)}
                                            method="delete"
                                            as="button"
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                            onSuccess={() => window.location.reload()}
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
