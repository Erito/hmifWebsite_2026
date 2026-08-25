import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import HeroSection from "@/Components/Home/Hero";
import AboutSection from "@/Components/Home/About";
import PojokHMIFSection from "@/Components/Home/PojokHMIF";
import ProkerSection from "@/Components/Home/Proker";
import ContactUs from "@/Components/Home/ContactUs";

interface Props {
    heroImage?: string | null;
    sections?: {
        about: boolean;
        pojok_hmif: boolean;
        proker: boolean;
        contact: boolean;
    };
}

const DEFAULT_SECTIONS = {
    about: true,
    pojok_hmif: true,
    proker: true,
    contact: true,
};

export default function Home({ heroImage, sections }: Props) {
    const s = sections ?? DEFAULT_SECTIONS;

    return (
        <AppLayout>
            <Head title="Home" />
            <HeroSection heroImage={heroImage} />
            {s.about && <AboutSection />}
            {s.pojok_hmif && <PojokHMIFSection />}
            {s.proker && <ProkerSection />}
            {s.contact && <ContactUs />}
        </AppLayout>
    );
}
