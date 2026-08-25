import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { GalleryImage } from '@/types';

interface Props {
    images: GalleryImage[];
}

function UploadForm() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        image: File | null;
        title: string;
        description: string;
    }>({ image: null, title: '', description: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'), { forceFormData: true, onSuccess: () => reset() });
    };

    return (
        <form onSubmit={submit} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5 mb-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300">Upload New Photo</h2>

            <div className="flex flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Image <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                        className="text-sm text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-amber-500 file:text-white file:text-xs file:cursor-pointer"
                    />
                    {errors.image && <p className="mt-1 text-xs text-red-400">{errors.image}</p>}
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="e.g. Perkenalan Prodi Informatika"
                        className="bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500 w-64"
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs text-gray-400 mb-1">Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Short caption shown in the photo popup…"
                    rows={2}
                    className="w-full max-w-xl bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500 resize-none"
                />
                {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>

            <button
                type="submit"
                disabled={processing || !data.image}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-medium rounded transition-colors"
            >
                {processing ? 'Uploading…' : 'Upload'}
            </button>
        </form>
    );
}

function EditModal({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        image: File | null;
    }>({ title: image.title ?? '', description: image.description ?? '', image: null });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.gallery.update', image.id), { forceFormData: true, onSuccess: onClose });
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-semibold text-white mb-4">Edit Photo</h2>

                <div className="mb-4">
                    <img src={image.image_url} alt={image.title ?? ''} className="w-full aspect-video object-cover rounded-lg" />
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Replace Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                            className="text-sm text-gray-300 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-white file:text-xs file:cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500 resize-none"
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
                    </div>

                    <div className="flex gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-medium rounded transition-colors"
                        >
                            {processing ? 'Saving…' : 'Save'}
                        </button>
                        <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Index({ images }: Props) {
    const [editing, setEditing] = useState<GalleryImage | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Delete this image?')) return;
        router.delete(route('admin.gallery.destroy', id));
    };

    return (
        <AdminLayout>
            <Head title="Gallery" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Gallery</h1>
                <span className="text-sm text-gray-500">{images.length} photo{images.length !== 1 ? 's' : ''}</span>
            </div>

            <UploadForm />

            {images.length === 0 ? (
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-10 text-center text-gray-500">
                    No photos yet. Upload one above.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {images.map((img) => (
                        <div key={img.id} className="group relative bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
                            <img
                                src={img.image_url}
                                alt={img.title ?? ''}
                                className="w-full aspect-square object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => setEditing(img)}
                                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-medium rounded transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            {img.title && (
                                <div className="px-2 py-1.5 text-xs text-gray-400 truncate border-t border-gray-800">
                                    {img.title}
                                </div>
                            )}
                            {img.description && (
                                <div className="px-2 pb-1.5 text-xs text-gray-600 truncate">{img.description}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {editing && <EditModal image={editing} onClose={() => setEditing(null)} />}
        </AdminLayout>
    );
}
