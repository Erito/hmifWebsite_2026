import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeroAbout from '@/Components/AboutUs/HeroAbout';
import VisionMission from '@/Components/AboutUs/VisionMission';
import Division from '@/Components/AboutUs/Division';
import { KpiData } from '@/types';

interface Props {
    kpiData: KpiData;
}

export default function AboutUs({ kpiData }: Props) {
    return (
        <AppLayout>
            <Head title="About Us" />
            <main className="relative min-h-screen bg-[#030812] flex flex-col items-center justify-start overflow-x-clip font-sans">
                <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none h-screen">
                    <img src="/assets/AboutUs/Top/Ellipse 1.png" alt="" className="w-full h-full object-cover md:object-contain opacity-70 mix-blend-screen" />
                </div>
                <HeroAbout />
                <VisionMission />
                <Division kpiData={kpiData} />
            </main>
        </AppLayout>
    );
}
