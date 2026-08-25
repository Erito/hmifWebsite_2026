import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

interface DivisionMember {
    id: number;
    name: string;
    division: string;
    role_title: string;
    image_path: string | null;
}

interface Props {
    member: DivisionMember;
    divisions: string[];
}

export default function Edit({ member, divisions }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: member.name,
        division: member.division,
        role_title: member.role_title,
        image: null as File | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.about-us.division-members.update', member.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${member.name}`} />
            <h1 className="text-2xl font-bold text-white mb-6">Edit Member</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.name && <InputError message={errors.name} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel htmlFor="division" value="Divisi" />
                        <select
                            id="division"
                            value={data.division}
                            onChange={(e) => setData('division', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-[#222] border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
                        >
                            {divisions.map((div) => (
                                <option key={div} value={div}>{div}</option>
                            ))}
                        </select>
                        {errors.division && <InputError message={errors.division} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel htmlFor="role_title" value="Posisi" />
                        <TextInput
                            id="role_title"
                            value={data.role_title}
                            onChange={(e) => setData('role_title', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.role_title && <InputError message={errors.role_title} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel htmlFor="image" value="Foto" />
                        {member.image_path && (
                            <div className="mt-2 mb-4">
                                <img
                                    src={`/storage/${member.image_path}`}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                            </div>
                        )}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-amber-500 file:text-white hover:file:bg-amber-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah foto</p>
                        {errors.image && <InputError message={errors.image} className="mt-2" />}
                    </div>

                    <div className="flex gap-3">
                        <PrimaryButton disabled={processing} type="submit">
                            {processing ? 'Menyimpan...' : 'Perbarui Member'}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
