import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

// TODO: receive workPrograms: PaginatedData<WorkProgram> from controller
export default function Index() {
    return (
        <AdminLayout>
            <Head title="Work Programs" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Proker</h1>
                <Link
                    href={route('admin.proker.work-programs.create')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                >
                    New Proker
                </Link>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-gray-400">
                {/* TODO: table of work programs with title, subtitle, date, logo, edit and delete actions */}
            </div>
        </AdminLayout>
    );
}
