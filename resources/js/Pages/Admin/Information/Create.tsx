import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Props {
    categories: string[];
}

export default function Create({ categories }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        category: string;
        title: string;
        published_at: string;
        image: File | null;
        image_alt: string;
        excerpt: string;
        content: string;
        is_published: boolean;
    }>({
        category: categories[0] ?? 'INFORMATION',
        title: '',
        published_at: new Date().toISOString().slice(0, 10),
        image: null,
        image_alt: '',
        excerpt: '',
        content: '',
        is_published: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.information.store'), { forceFormData: true });
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    return (
        <AdminLayout>
            <Head title="New Article" />

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Link href={route('admin.information.index')} className="hover:text-gray-300">
                    Information
                </Link>
                <span>›</span>
                <span className="text-gray-300">New</span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">New Article</h1>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 max-w-3xl">
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Published Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
                            />
                            {errors.published_at && <p className="mt-1 text-xs text-red-400">{errors.published_at}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Informatika UMN Resmi Sandang Status Akreditasi Unggul"
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            className="text-sm text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-amber-500 file:text-white file:text-xs file:cursor-pointer"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-3 w-64 aspect-video object-cover rounded border border-gray-800"
                            />
                        )}
                        {errors.image && <p className="mt-1 text-xs text-red-400">{errors.image}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Image Alt Text</label>
                        <input
                            type="text"
                            value={data.image_alt}
                            onChange={(e) => setData('image_alt', e.target.value)}
                            placeholder="Short description of the image"
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        />
                        {errors.image_alt && <p className="mt-1 text-xs text-red-400">{errors.image_alt}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Excerpt <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                            placeholder="Short summary shown on the listing card"
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500 resize-none"
                        />
                        {errors.excerpt && <p className="mt-1 text-xs text-red-400">{errors.excerpt}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={12}
                            placeholder="Full article body. Separate paragraphs with a blank line."
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500 resize-y"
                        />
                        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="is_published"
                            type="checkbox"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="w-4 h-4 bg-[#111] border border-gray-700 rounded text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="is_published" className="text-sm text-gray-400">
                            Publish immediately
                        </label>
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
                            href={route('admin.information.index')}
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
