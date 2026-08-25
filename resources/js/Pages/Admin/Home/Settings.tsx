import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    heroImage: string | null;
    sections: {
        about: boolean;
        pojok_hmif: boolean;
        proker: boolean;
        contact: boolean;
    };
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0 cursor-pointer">
            <span className="text-sm text-gray-300">{label}</span>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? 'bg-amber-500' : 'bg-gray-700'}`}
            >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </label>
    );
}

export default function Settings({ heroImage, sections }: Props) {
    const heroForm = useForm<{ image: File | null }>({ image: null });
    const sectionForm = useForm({ ...sections });

    const submitHero: FormEventHandler = (e) => {
        e.preventDefault();
        heroForm.post(route('admin.home.hero.update'), { forceFormData: true });
    };

    const submitSections: FormEventHandler = (e) => {
        e.preventDefault();
        sectionForm.patch(route('admin.home.settings.update'));
    };

    return (
        <AdminLayout>
            <Head title="Home Settings" />
            <h1 className="text-2xl font-bold text-white mb-6">Home Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero Image */}
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                    <h2 className="text-sm font-semibold text-gray-300 mb-4">Hero Image</h2>

                    {heroImage ? (
                        <img src={heroImage} alt="Current hero" className="w-full h-40 object-cover object-top rounded mb-4 grayscale" />
                    ) : (
                        <div className="w-full h-40 bg-gray-800 rounded mb-4 flex items-center justify-center text-xs text-gray-600">
                            Using default image
                        </div>
                    )}

                    <form onSubmit={submitHero} className="flex items-center gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => heroForm.setData('image', e.target.files?.[0] ?? null)}
                            className="text-sm text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-700 file:text-white file:text-xs file:cursor-pointer"
                        />
                        <button
                            type="submit"
                            disabled={heroForm.processing || !heroForm.data.image}
                            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium rounded transition-colors whitespace-nowrap"
                        >
                            {heroForm.processing ? 'Uploading…' : 'Upload'}
                        </button>
                    </form>
                    {heroForm.errors.image && (
                        <p className="mt-2 text-xs text-red-400">{heroForm.errors.image}</p>
                    )}
                </div>

                {/* Section Visibility */}
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                    <h2 className="text-sm font-semibold text-gray-300 mb-4">Section Visibility</h2>
                    <form onSubmit={submitSections}>
                        <Toggle label="About" checked={sectionForm.data.about} onChange={(v) => sectionForm.setData('about', v)} />
                        <Toggle label="Pojok HMIF" checked={sectionForm.data.pojok_hmif} onChange={(v) => sectionForm.setData('pojok_hmif', v)} />
                        <Toggle label="Proker" checked={sectionForm.data.proker} onChange={(v) => sectionForm.setData('proker', v)} />
                        <Toggle label="Contact Us" checked={sectionForm.data.contact} onChange={(v) => sectionForm.setData('contact', v)} />

                        <button
                            type="submit"
                            disabled={sectionForm.processing}
                            className="mt-5 px-5 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium rounded transition-colors"
                        >
                            {sectionForm.processing ? 'Saving…' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
