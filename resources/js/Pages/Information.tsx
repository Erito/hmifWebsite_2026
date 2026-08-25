import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InformationContent from '@/components/information/InformationContent';

export default function Information() {
    return (
        <AppLayout>
            <Head title="Information" />
            <section className="min-h-screen bg-slate-950 flex flex-col items-center px-4 md:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
                <div className="w-full max-w-[87.5rem]">
                    <InformationContent />
                </div>
            </section>
        </AppLayout>
    );
}
