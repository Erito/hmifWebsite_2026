import { motion } from 'framer-motion';
import ProgramCard from './ProgramCard';
import proker from '@/data/proker';

export default function ProgramLists() {
    return (
        <section id="program-list" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-kanit)' }}>Work Programs</h2>
                <div className="mx-auto h-0.5 w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #139ED8, transparent)' }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {proker.map((program, i) => <ProgramCard key={program.id} program={program} index={i} />)}
            </div>
        </section>
    );
}
