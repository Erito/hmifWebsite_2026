import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import ProgramCard from '@/components/WorkProgram/ProgramCard';
import proker from '@/data/proker';

const FEATURED_IDS = [4, 1, 3];
const featured = FEATURED_IDS.map((id) => proker.find((p) => p.id === id)!);

export default function ProkerSection() {
    return (
        <section className="relative w-full min-h-screen bg-[#010511] flex flex-col justify-center overflow-hidden py-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16 px-4">
                <p className="text-[#139ED8] text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    Our Events for UMN Informatics Students
                </p>
                <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-kanit)', background: 'linear-gradient(90deg, #139ED8 0%, #5CC8F0 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    Our Work Programs
                </h2>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 sm:pt-8">
                    {featured.map((program, i) => (
                        <div key={program.id} className={i === 1 ? 'sm:-translate-y-8' : ''}>
                            <ProgramCard program={program} index={i} />
                        </div>
                    ))}
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-center mt-14">
                <Link href="/workProgram" className="px-8 py-3 rounded-full border border-[rgba(19,158,216,0.45)] text-[#A3AFC2] text-sm hover:text-white hover:bg-[rgba(19,158,216,0.1)] hover:border-[rgba(19,158,216,0.8)] transition-all duration-300" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    View More Details
                </Link>
            </motion.div>
        </section>
    );
}
