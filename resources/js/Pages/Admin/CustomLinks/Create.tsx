import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        slug: '',
        destination_url: '',
        label: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.custom-links.store'));
    };

    return (
        <AdminLayout>
            <Head title="New Custom Link" />

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Link href={route('admin.custom-links.index')} className="hover:text-gray-300">
                    Custom Link
                </Link>
                <span>›</span>
                <span className="text-gray-300">New</span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">New Custom Link</h1>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 max-w-xl">
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Destination URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            value={data.destination_url}
                            onChange={(e) => setData('destination_url', e.target.value)}
                            placeholder="https://example.com/your-link"
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        />
                        {errors.destination_url && (
                            <p className="mt-1 text-xs text-red-400">{errors.destination_url}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Custom Slug <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 font-mono">hmif.umn.ac.id/</span>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="formsComvis"
                                className="flex-1 bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500 font-mono"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-600">Letters, numbers, hyphens, underscores only.</p>
                        {errors.slug && (
                            <p className="mt-1 text-xs text-red-400">{errors.slug}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Label</label>
                        <input
                            type="text"
                            value={data.label}
                            onChange={(e) => setData('label', e.target.value)}
                            placeholder="e.g. Forms Comvis"
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        />
                        {errors.label && (
                            <p className="mt-1 text-xs text-red-400">{errors.label}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium rounded transition-colors"
                        >
                            {processing ? 'Saving…' : 'Save'}
                        </button>
                        <Link
                            href={route('admin.custom-links.index')}
                            className="text-sm text-gray-500 hover:text-gray-300"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
