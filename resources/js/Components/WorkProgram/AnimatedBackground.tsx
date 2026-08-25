import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#149ED8]/10 blur-[120px]" />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[-40px] md:left-0 top-1/2 -translate-y-1/2" style={{ willChange: 'transform' }}>
                <img src="/assets/WorkProgram/WorkProgramElement1.svg" alt="" className="w-[180px] md:w-[320px] h-auto" />
            </motion.div>
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-40px] md:right-0 top-[30%]" style={{ willChange: 'transform' }}>
                <img src="/assets/WorkProgram/WorkProgramElement3.svg" alt="" className="w-[180px] md:w-[320px] h-auto" />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[-140px] left-1/2 -translate-x-1/2" style={{ willChange: 'transform' }}>
                <img src="/assets/WorkProgram/WorkProgramElement2.svg" alt="" className="w-[600px] md:w-[900px] h-auto" />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,5,17,0.4)_100%)]" />
        </div>
    );
}
