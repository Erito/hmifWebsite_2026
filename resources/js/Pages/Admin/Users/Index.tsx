import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

// TODO: receive users: PaginatedData<User> from controller
export default function Index() {
    return (
        <AdminLayout>
            <Head title="Users" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Users</h1>
                <Link
                    href={route('admin.users.create')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
                >
                    New User
                </Link>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-gray-400">
                {/* TODO: table of users with name, email, role, edit and delete actions */}
            </div>
        </AdminLayout>
    );
}
