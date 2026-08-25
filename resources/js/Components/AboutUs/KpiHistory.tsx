"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { getTitleColor } from '@/Components/AboutUs/datas/division';
import { KpiData } from '@/types';

interface KpiHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeDivision: any;
    kpiData: KpiData;
}

const calcAvgKpi = (memberData: KpiData[string] | undefined): number => {
    if (!memberData?.history) return 0;
    const values = Object.values(memberData.history);
    if (values.length === 0) return 0;
    return Math.floor(values.reduce((sum, v) => sum + v, 0) / values.length);
};

export default function KpiHistoryModal({ isOpen, onClose, activeDivision, kpiData }: KpiHistoryModalProps) {
    if (!isOpen || !activeDivision) return null;

    const themeColor = getTitleColor(activeDivision.singkatan);

    const top3Overall = [...activeDivision.members]
        .map((m: any) => ({
            ...m,
            overallScore: calcAvgKpi(kpiData[m.name]),
        }))
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 3)
        .map((m, idx) => ({ ...m, rank: idx + 1 }));

    const podiumMembers = [];
    if (top3Overall.length === 3) {
        podiumMembers.push(top3Overall[1], top3Overall[0], top3Overall[2]);
    } else {
        podiumMembers.push(...top3Overall);
    }

    const generateRealHistory = () => {
        const periods = ["Periode Week 9-12", "Periode Week 5-8", "Periode Week 1-4"];

        return periods.map((periodName) => {
            const membersWithScore = activeDivision.members.map((m: any) => {
                const memberData = kpiData[m.name];
                const score = memberData?.history?.[periodName] ?? 0;
                return { ...m, avg: score };
            });
            const sortedMembers = membersWithScore
                .sort((a: any, b: any) => b.avg - a.avg)
                .map((m: any, idx: number) => ({ ...m, rank: idx + 1 }));

            return { period: periodName, members: sortedMembers };
        });
    };

    const historyData = generateRealHistory();

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 lg:p-10">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#02050A]/80 backdrop-blur-sm cursor-pointer"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-7xl h-[95vh] md:h-[85vh] bg-[#070D18] border border-[#1A2333] shadow-[0_0_20px_rgba(0,168,232,0.1)] rounded-2xl flex flex-col md:flex-row overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {activeDivision.image && (
                            <img
                                src={activeDivision.image}
                                alt={`${activeDivision.name} Background`}
                                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/30 via-[#070D18]/95 to-[#03060C]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03060C] via-transparent to-transparent" />

                        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] opacity-40">
                            <img
                                src="/assets/AboutUs/historyKpi/BackgroundLeft.svg"
                                alt="Background Motif"
                                className="absolute inset-0 w-full h-full object-cover md:object-contain object-left"
                            />
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-white transition-colors z-50 bg-[#070D18]/50 md:bg-transparent rounded-full p-1 md:p-0 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* ── LEFT PANEL ── */}
                    <div className="relative z-10 w-full md:w-[45%] flex flex-col shrink-0 p-5 md:p-8 lg:p-10">
                        <div className="border-b border-[#1A2333] pb-3 md:pb-5 shrink-0">
                            <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-['Kanit'] font-semibold text-white leading-tight tracking-tight">
                                Key Performance Indicator <span className="text-[#00A8E8]">History</span>
                            </h2>
                            <p className="text-slate-400 font-['Kanit'] font-semibold mt-1 md:mt-2 tracking-[0.2em] uppercase text-[10px] md:text-sm">
                                {activeDivision.name}
                            </p>
                        </div>

                        <div className="mt-4 md:mt-6 flex flex-col md:grow min-h-0 md:min-h-80">
                            <h3 className="text-white font-['Kanit'] font-semibold text-sm md:text-base mb-3 lg:mb-6 shrink-0">
                                Top 3 Rankings: Week 1 – 12
                            </h3>

                            <div className="flex items-end justify-center gap-2 lg:gap-4 w-full h-56 md:h-auto md:grow pb-2 md:pb-8">
                                {podiumMembers.map((member) => {
                                    const heightClass =
                                        member.rank === 1 ? "h-full" :
                                        member.rank === 2 ? "h-[85%]" : "h-[75%]";

                                    return (
                                        <div
                                            key={member.name}
                                            className={`relative flex flex-col justify-end w-[32%] max-w-[180px] rounded-2xl overflow-hidden border border-[#1A2333] bg-[#0B1524] ${heightClass} shadow-lg transition-transform hover:-translate-y-1`}
                                        >
                                            <div className="absolute inset-0 z-0">
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-800" />
                                                )}
                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full h-[60%] z-10 bg-gradient-to-t from-[#02050A] via-[#070D18]/80 to-transparent" />

                                            <div className="relative z-20 flex flex-col items-center text-center p-2 lg:p-3 mt-auto pb-3 md:pb-5">
                                                <h4 className="text-white font-semibold font-['Kanit'] text-[11px] md:text-sm lg:text-base leading-tight mb-2 line-clamp-2">
                                                    {member.name}
                                                </h4>
                                                <div className="flex flex-col items-center">
                                                    <p className="text-slate-500 font-['Work_Sans'] text-[8px] uppercase font-semibold mb-0.5">AVG KPI</p>
                                                    <p className="text-white font-semibold font-['Kanit'] text-lg md:text-2xl leading-none">
                                                        {member.overallScore}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT PANEL ── */}
                    <div className="relative z-10 w-full md:w-[55%] flex flex-col grow overflow-hidden pt-4 md:pt-16 lg:pt-20 pb-6 md:pb-10 pr-4 md:pr-10 pl-4 md:pl-2">
                        <div className="w-full h-full border border-[#1A2333] rounded-2xl p-4 md:p-6 bg-[#0B1524]/30 flex flex-col overflow-hidden backdrop-blur-sm shadow-xl">
                            <div
                                className="grow overflow-y-auto custom-scrollbar pr-2 md:pr-4 space-y-6 md:space-y-8 overscroll-contain pb-6 md:pb-0"
                                data-lenis-prevent="true"
                                onWheel={(e) => e.stopPropagation()}
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                {historyData.map((data, index) => (
                                    <div key={index} className="flex flex-col">
                                        
                                        <div className="flex items-center gap-3 md:gap-4 mb-4 sticky top-0 bg-[#070D18]/95 backdrop-blur-md z-30 py-2 -mx-2 px-2">
                                            <div className="border border-[#1A2333] px-4 md:px-5 py-1.5 md:py-2 bg-[#0B1524]">
                                                <h3 className="text-white font-semibold font-['Kanit'] text-xs md:text-sm whitespace-nowrap">
                                                    {data.period}
                                                </h3>
                                            </div>
                                            <div className="grow h-px bg-[#1A2333]"></div>
                                        </div>

                                        <div className="flex flex-col gap-2 md:gap-3">
                                            {data.members.map((member: any) => (
                                                <div
                                                    key={member.name}
                                                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-[#1A2333] bg-[#0D182A]/50 hover:bg-[#0D182A]/90 transition-colors"
                                                >
                                                    <div className="w-6 md:w-8 flex justify-center shrink-0">
                                                        <span className="text-white font-semibold font-['Kanit'] text-lg md:text-xl italic">
                                                            #{member.rank}
                                                        </span>
                                                    </div>

                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-md overflow-hidden relative bg-slate-800 shrink-0">
                                                        {member.image && (
                                                            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                                                        )}
                                                    </div>

                                                    <div className="grow min-w-0">
                                                        <h4 className="text-white font-semibold font-['Kanit'] text-sm md:text-base truncate">{member.name}</h4>
                                                        <p className="text-slate-400 font-['Work_Sans'] text-[9px] md:text-[10px] uppercase tracking-wider truncate">{member.position || 'Koordinator'}</p>
                                                    </div>

                                                    <div className="text-right shrink-0">
                                                        <p className="text-white font-semibold font-['Kanit'] text-base md:text-xl leading-none">{member.avg}</p>
                                                        <p className="text-slate-500 font-['Work_Sans'] text-[8px] md:text-[9px] uppercase font-semibold mt-1">AVG KPI</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
