import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { KpiMember, KpiPeriod } from '@/types';
import { FormEvent } from 'react';

interface Props {
    kpiMember: KpiMember & { periods: KpiPeriod[] };
}

interface NewPeriod {
    period_name: string;
    score: number;
}

export default function Edit({ kpiMember }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        periods: kpiMember.periods.map((p) => ({ id: p.id, score: p.score })),
        new_periods: [] as NewPeriod[],
    });

    const total =
        data.periods.reduce((sum, p) => sum + (Number(p.score) || 0), 0) +
        data.new_periods.reduce((sum, p) => sum + (Number(p.score) || 0), 0);

    const updateExisting = (i: number, score: number) => {
        const updated = [...data.periods];
        updated[i] = { ...updated[i], score };
        setData('periods', updated);
    };

    const addPeriod = () => {
        setData('new_periods', [...data.new_periods, { period_name: '', score: 0 }]);
    };

    const updateNew = (i: number, field: keyof NewPeriod, value: string | number) => {
        const updated = [...data.new_periods];
        updated[i] = { ...updated[i], [field]: value };
        setData('new_periods', updated);
    };

    const removeNew = (i: number) => {
        setData('new_periods', data.new_periods.filter((_, idx) => idx !== i));
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('admin.kpi.update', kpiMember.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit KPI" />

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Link href={route('admin.kpi.index')} className="hover:text-gray-300">KPI</Link>
                <span>›</span>
                <span className="text-gray-300">Edit</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{kpiMember.name}</h1>
            <p className="text-sm text-gray-500 mb-6">{kpiMember.division}</p>

            <form onSubmit={submit} className="space-y-4 max-w-md">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">

                    {/* Existing periods */}
                    {kpiMember.periods.map((period, i) => (
                        <div
                            key={period.id}
                            className="flex items-center gap-4 px-4 py-3 border-b border-gray-800/50"
                        >
                            <label className="flex-1 text-sm text-gray-300">{period.period_name}</label>
                            <input
                                type="number"
                                min="0"
                                max="99999"
                                value={data.periods[i].score}
                                onChange={(e) => updateExisting(i, Number(e.target.value))}
                                className="w-28 bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-right text-white text-sm focus:outline-none focus:border-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    ))}

                    {/* New periods */}
                    {data.new_periods.map((p, i) => (
                        <div
                            key={`new-${i}`}
                            className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/50 border-dashed"
                        >
                            <input
                                type="text"
                                placeholder="Periode Week 13-16"
                                value={p.period_name}
                                onChange={(e) => updateNew(i, 'period_name', e.target.value)}
                                className="flex-1 bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500 placeholder-gray-600"
                            />
                            <input
                                type="number"
                                min="0"
                                max="99999"
                                value={p.score}
                                onChange={(e) => updateNew(i, 'score', Number(e.target.value))}
                                className="w-28 bg-[#111] border border-gray-700 rounded px-3 py-1.5 text-right text-white text-sm focus:outline-none focus:border-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeNew(i)}
                                className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none px-1"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Add period button */}
                    <div className="px-4 py-2 border-b border-gray-800/50">
                        <button
                            type="button"
                            onClick={addPeriod}
                            className="text-xs text-gray-500 hover:text-amber-400 transition-colors"
                        >
                            + Add Period
                        </button>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-4 px-4 py-3 bg-[#222]">
                        <span className="flex-1 text-sm font-semibold text-gray-300">Total (Overall)</span>
                        <span className="w-28 text-right font-mono font-semibold text-amber-400">
                            {total.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>

                {errors.periods && <p className="text-xs text-red-400">{errors.periods}</p>}
                {errors.new_periods && <p className="text-xs text-red-400">{errors.new_periods}</p>}

                <div className="flex gap-3 items-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save Changes'}
                    </button>
                    <Link
                        href={route('admin.kpi.index')}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
