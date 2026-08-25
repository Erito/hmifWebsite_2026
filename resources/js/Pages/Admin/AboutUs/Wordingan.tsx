import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

interface Props {
    content: string;
}

export default function Wordingan({ content }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        content: content || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.about-us.wordingan.update'));
    };

    return (
        <AdminLayout>
            <Head title="About Us - Wordingan" />
            <h1 className="text-2xl font-bold text-white mb-6">About Us — Wordingan</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                    <label className="block text-sm font-medium text-gray-400 mb-3">
                        Deskripsi About Us
                    </label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full h-64 px-4 py-3 bg-[#222] border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        placeholder="Masukkan deskripsi about us..."
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
                    
                    <div className="mt-6">
                        <PrimaryButton disabled={processing} type="submit">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
