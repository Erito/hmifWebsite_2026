import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

// TODO: receive value: string from controller (site_content key: 'proker_wordingan')
export default function Wordingan() {
    return (
        <AdminLayout>
            <Head title="Proker - Wordingan" />
            <h1 className="text-2xl font-bold text-white mb-6">Proker — Wordingan</h1>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-gray-400">
                {/* TODO: textarea form to edit wordingan text, submit to admin.proker.wordingan.update */}
            </div>
        </AdminLayout>
    );
}
