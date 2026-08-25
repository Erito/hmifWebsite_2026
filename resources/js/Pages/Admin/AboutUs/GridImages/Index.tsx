import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

interface AboutImage {
    id: number;
    image_path: string;
    alt_text: string | null;
    order: number;
}

interface Props {
    images: AboutImage[];
}

export default function Index({ images }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null as File | null,
        alt_text: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.about-us.grid-images.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = route('admin.about-us.grid-images.destroy', id);
            form.innerHTML = '<input type="hidden" name="_method" value="DELETE"><input type="hidden" name="_token" value="' + (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content + '">';
            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <AdminLayout>
            <Head title="Grid Image" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Grid Image</h1>
            </div>

            {/* Upload Form */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">Tambah Gambar Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="image" value="Gambar" />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-500 file:text-white hover:file:bg-amber-600"
                            required
                        />
                        {errors.image && <InputError message={errors.image} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel htmlFor="alt_text" value="Alt Text (Opsional)" />
                        <input
                            id="alt_text"
                            type="text"
                            value={data.alt_text}
                            onChange={(e) => setData('alt_text', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-[#222] border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                            placeholder="Deskripsi gambar"
                        />
                        {errors.alt_text && <InputError message={errors.alt_text} className="mt-2" />}
                    </div>

                    <PrimaryButton disabled={processing || !data.image} type="submit">
                        {processing ? 'Mengupload...' : 'Upload Gambar'}
                    </PrimaryButton>
                </form>
            </div>

            {/* Images Grid */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Daftar Gambar</h2>
                {images.length === 0 ? (
                    <p className="text-gray-500">Belum ada gambar yang diunggah</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="relative group">
                                <img
                                    src={`/storage/${img.image_path}`}
                                    alt={img.alt_text || 'About image'}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleDelete(img.id)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                                    >
                                        Hapus
                                    </button>
                                </div>
                                {img.alt_text && (
                                    <p className="text-xs text-gray-500 mt-1 truncate">{img.alt_text}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
