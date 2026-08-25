import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function AspirationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    });

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!data.first_name.trim()) errs.first_name = 'First name is required.';
        if (!data.email.trim()) errs.email = 'Email is required.';
        if (!data.message.trim()) errs.message = 'Message is required.';
        return errs;
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setClientErrors(errs);
            return;
        }
        setClientErrors({});
        post(route('aspirationForm.store'), { onSuccess: () => { reset(); setSubmitted(true); } });
    };

    const handleBack = () => router.visit('/');

    const inputStyle = { background: 'rgba(10, 20, 40, 0.4)', border: '1.5px solid rgba(0, 180, 255, 0.35)', backdropFilter: 'blur(12px)' };
    const inputClass = 'w-full rounded-full px-5 py-3 text-white text-base placeholder-[#7a9fc0] outline-none transition-all duration-300';
    const mainStyle = { background: 'linear-gradient(135deg, #0a1f3a 0%, #125ab882 51%, #051428 100%)' };

    const socialLinks = [
        { href: 'mailto:hmif@umn.ac.id', label: 'Email', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> },
        { href: 'https://discord.gg/ywjuhAmXut', label: 'Discord', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.136 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg> },
        { href: 'https://line.me/ti/p/~@682fnddg', label: 'Line', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg> },
        { href: 'https://instagram.com/hmif.umn', label: 'Instagram', icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
    ];

    const iconBoxStyle = { background: 'rgba(0, 0, 0, 0.3)', border: '1.5px solid rgba(0, 180, 255, 0.4)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' };

    if (submitted) {
        return (
            <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center" style={mainStyle}>
                <Head title="Thank You" />
                <img src="/assets/Aspiration/Mask group.svg" alt="" className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" />
                <img src="/assets/Aspiration/Mask group (1).svg" alt="" className="absolute -left-15 -top-60 opacity-50 lg:opacity-100" />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 530px 450px at 50% 45%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.61) 100%)`,
                    }}
                />
                <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-8 lg:mb-12"><img src="/assets/Aspiration/Full.svg" alt="HMIF UMN Logo" width={140} height={120} /></div>
                    <h1 className="font-kanit text-5xl lg:text-8xl font-bold text-white leading-tight tracking-tight">Thank You For</h1>
                    <h1 className="font-kanit text-6xl lg:text-9xl font-bold text-white leading-tight tracking-tight mb-6 max-w-4xl -mt-4">Sharing With Us</h1>
                    <p className="text-[#7ba5c7] text-base lg:text-xl leading-relaxed max-w-sm lg:max-w-xl text-center mb-12 lg:mb-40" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        Your aspiration has been successfully submitted. We truly appreciate your input!
                    </p>
                    <button onClick={handleBack} className="px-10 lg:px-[68px] py-2 rounded-full text-white text-sm lg:text-base transition-all duration-300 hover:opacity-90" style={{ border: '1.5px solid rgba(0, 180, 255, 0.5)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 20px rgba(0, 180, 255, 0.15)' }}>
                        Back to Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center" style={mainStyle}>
            <Head title="Aspiration Form" />
            <img src="/assets/Aspiration/Mask group.svg" alt="" className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                background: `radial-gradient(ellipse 520px 365px at 25% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.65) 100%)`,
                }}
            />
            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 py-10 lg:py-16 flex flex-col lg:flex-row lg:items-start lg:gap-24">
                <div className="flex-1 mb-10 lg:mb-0">
                    <div className="mb-12 lg:mb-38"><img src="/assets/Aspiration/Full.svg" alt="HMIF UMN Logo" width={140} height={120} /></div>
                    <div className="mb-16 lg:mt-12">
                        <h1 className="font-kanit text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-5">Give Your<br /><span className="font-kanit font-bold lg:text-8xl">Aspiration!</span></h1>
                        <p className="text-[#7ba5c7] text-base leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>Share your ideas, hopes, and aspirations with us through this page.
                        Your voice can inspire change and help create a better experience
                        for everyone.</p>
                    </div>
                    <div className="flex gap-3">
                        {socialLinks.map((s) => (
                            <a key={s.label} href={s.href} aria-label={s.label} className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110" style={iconBoxStyle}>{s.icon}</a>
                        ))}
                    </div>
                </div>

                <div className="relative w-full max-w-3xl xl:w-[720px] rounded-3xl p-10 lg:p-[72px]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)' }}>
                    <div className="pointer-events-none absolute inset-0 rounded-3xl p-px" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(0,110,255,0.57) 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                    <div className="relative z-10 mb-9">
                        <h2 className="text-white font-bold text-3xl lg:text-4xl mb-3">Please fill in the form below.</h2>
                        <p className="text-[#7ba5c7] text-base" style={{ fontFamily: 'var(--font-work-sans)' }}>Your voice matters for us.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <div className="flex-1">
                                <label className="block text-white text-base font-semibold mb-3">First Name</label>
                                <input type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} placeholder="Jane" className={inputClass} style={inputStyle} />
                                {(errors.first_name || clientErrors.first_name) && <p className="mt-1 text-xs text-red-400">{errors.first_name || clientErrors.first_name}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-white text-base font-semibold mb-3">Last Name</label>
                                <input type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} placeholder="Doe" className={inputClass} style={inputStyle} />
                                {errors.last_name && <p className="mt-1 text-xs text-red-400">{errors.last_name}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-white text-base font-semibold mb-3">Email</label>
                            <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="your@email.com" className={inputClass} style={inputStyle} />
                            {(errors.email || clientErrors.email) && <p className="mt-1 text-xs text-red-400">{errors.email || clientErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-white text-base font-semibold mb-3">Message</label>
                            <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Leave us a message..." rows={5} className="w-full rounded-2xl px-5 py-3 text-white text-base placeholder-[#7a9fc0] outline-none transition-all duration-300 resize-none" style={inputStyle} />
                            {(errors.message || clientErrors.message) && <p className="mt-1 text-xs text-red-400">{errors.message || clientErrors.message}</p>}
                        </div>
                        <div className="pt-4">
                            <button type="submit" disabled={processing} className="px-8 py-3 rounded-full text-white text-base font-semibold transition-all duration-300 hover:scale-[1.03] disabled:opacity-50" style={{ background: 'rgba(0, 180, 255, 0.15)', border: '1.5px solid rgba(0, 180, 255, 0.5)', backdropFilter: 'blur(10px)' }}>
                                {processing ? 'Sending...' : 'Send Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
