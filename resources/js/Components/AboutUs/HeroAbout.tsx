"use client";
import { motion, Variants } from 'framer-motion';

export default function HeroAbout() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        },
    };

    return (
        <section className="relative w-full h-screen min-h-[43.75rem] flex items-center justify-center overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-5 z-0 pointer-events-none"
            >
                <source src="/assets/AboutUs/Top/BackgroundVid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            

            <motion.div 
                className="relative z-10 flex flex-col mt-16 items-center justify-center px-8 text-center w-full max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 variants={itemVariants} className="text-xs md:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-4 md:mb-6">
                    An UMN&apos;s Informatics Student Association
                </motion.h2>
            
                <motion.h1 variants={itemVariants} className="text-[2.5rem] leading-[1.1] md:text-[5rem] md:leading-[1.05] font-bold text-white mb-6 md:mb-8 tracking-tight">
                    {/* FIKS: Menggunakan bg-gradient-to-r agar terbaca di Tailwind v3 */}
                    By <span className="bg-gradient-to-r from-[#00A8E8] to-[#006796] bg-clip-text text-transparent">IF Students,</span><br />
                    For <span className="bg-gradient-to-r from-[#00A8E8] to-[#006796] bg-clip-text text-transparent">IF Students.</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-[#C2CAD6] font-['Work_Sans'] text-base md:text-[20px] font-normal leading-normal max-w-[90%] md:max-w-[50rem] mb-16 md:mb-24">
                    HMIF UMN serves as a platform for UMN Informatics students to learn, create, and grow together for the advancement of technology and society. HMIF envisions developing the potential and strengthening the solidarity among UMN Informatics students.
                </motion.p>

                <motion.p variants={itemVariants} className="text-xs md:text-sm text-slate-400/80 italic px-4">
                    &ldquo;Originally founded as HIMTI in 2010, HMIF has since grown to empower over 1,000<br className="hidden md:block" /> Informatics Students and Alumni from UMN&rdquo;
                </motion.p>
            </motion.div>
        </section>
    );
}
