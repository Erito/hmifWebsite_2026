import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import WorkProgramIntroduction from '@/components/WorkProgram/Introduction';
import ProgramLists from '@/components/WorkProgram/ProgramList';

export default function WorkProgram() {
    return (
        <AppLayout>
            <Head title="Work Program" />
            <main className="relative min-h-screen bg-[#010511] flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#149ED8]/30">
                <WorkProgramIntroduction />
                <div className="w-full relative z-10">
                    <ProgramLists />
                </div>
            </main>
        </AppLayout>
    );
}
