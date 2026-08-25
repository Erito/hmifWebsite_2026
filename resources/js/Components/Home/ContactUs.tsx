import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const socialLinks = [
    { icon: '/assets/Home/contactus/email.svg', label: 'hmif@umn.ac.id', href: 'https://mail.google.com/mail/u/0/?fs=1&to=hmif@umn.ac.id&tf=cm' },
    { icon: '/assets/Home/contactus/discord.svg', label: 'Discord Informatika UMN', href: 'https://discord.gg/ywjuhAmXut' },
    { icon: '/assets/Home/contactus/line.svg', label: '@682fnddg (Line Official HMIF UMN)', href: 'https://line.me/ti/p/~@682fnddg' },
    { icon: '/assets/Home/contactus/ig.svg', label: '@hmif.umn', href: 'https://instagram.com/hmif.umn' },
];

const inputClass = 'w-full border border-white/30 rounded-full px-7 py-2 bg-transparent text-[#C2CAD6] text-xl placeholder:text-[#C2CAD6]/50 outline-none focus:border-[#149ED8]/60 transition-colors';

export default function ContactUs() {
    const { contact_success } = usePage().props as any;

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    });

    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!data.first_name.trim()) errs.first_name = 'First name is required.';
        if (!data.email.trim()) errs.email = 'Email is required.';
        if (!data.message.trim()) errs.message = 'Message is required.';
        return errs;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setClientErrors(errs);
            return;
        }
        setClientErrors({});
        post(route('contact.store'), { onSuccess: () => reset() });
    };

    return (
        <section className="relative w-full bg-[#010511] py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                <div className="flex flex-col gap-12 flex-1">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-kanit text-[clamp(72px,10vw,128px)] leading-[0.9] tracking-[-6.4px] bg-gradient-to-r from-[#149ED8] to-[#005696] bg-clip-text text-transparent">
                            Contact Us
                        </h2>
                        <p className="text-[#C2CAD6] text-xl leading-relaxed" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Got an idea? let&apos;s build it.<br />connect with us and create lasting impact.
                        </p>
                    </div>
                    <div className="flex flex-col gap-7">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                <div className="w-[42px] h-[42px] shrink-0">
                                    <img src={icon} alt="" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[#C2CAD6] text-xl tracking-[1px] underline underline-offset-2 group-hover:text-[#149ED8] transition-colors" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-[726px] rounded-2xl border-2 border-[#F0F2F5]/20 p-6 sm:p-[43px] flex flex-col gap-8 sm:gap-12" style={{ background: 'radial-gradient(ellipse at 60% 110%, rgba(60,94,119,0.20) 0%, rgba(16,27,42,0.20) 50%, rgba(1,5,17,0.20) 100%), linear-gradient(90deg, rgba(60,64,74,0.15) 0%, rgba(60,64,74,0.15) 100%)', backdropFilter: 'blur(20px)' }}>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-kanit text-[#F0F2F5] text-[40px] leading-[0.9] tracking-[-2px]">Get in Touch</h3>
                        <p className="text-[#C2CAD6] text-xl" style={{ fontFamily: 'var(--font-work-sans)' }}>Reach us anytime.</p>
                    </div>

                    {contact_success ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                            <svg className="w-12 h-12 text-[#149ED8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-[#F0F2F5] text-xl font-kanit">Message sent!</p>
                            <p className="text-[#C2CAD6] text-base" style={{ fontFamily: 'var(--font-work-sans)' }}>We'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="flex flex-col gap-5">
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="text-[#C2CAD6] text-xl font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jane"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className={inputClass}
                                        style={{ fontFamily: 'var(--font-work-sans)' }}
                                    />
                                    {(errors.first_name || clientErrors.first_name) && <p className="text-red-400 text-sm">{errors.first_name || clientErrors.first_name}</p>}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="text-[#C2CAD6] text-xl font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className={inputClass}
                                        style={{ fontFamily: 'var(--font-work-sans)' }}
                                    />
                                    {errors.last_name && <p className="text-red-400 text-sm">{errors.last_name}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#C2CAD6] text-xl font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={inputClass}
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                />
                                {(errors.email || clientErrors.email) && <p className="text-red-400 text-sm">{errors.email || clientErrors.email}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#C2CAD6] text-xl font-semibold" style={{ fontFamily: 'var(--font-work-sans)' }}>Message</label>
                                <textarea
                                    placeholder="Leave us a message..."
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full border border-white/30 rounded-[33px] px-7 py-3 bg-transparent text-[#C2CAD6] text-xl placeholder:text-[#C2CAD6]/50 outline-none focus:border-[#149ED8]/60 transition-colors resize-none"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                />
                                {(errors.message || clientErrors.message) && <p className="text-red-400 text-sm">{errors.message || clientErrors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-[60px] border border-white/30 rounded-full text-[#C2CAD6] text-xl hover:border-[#149ED8]/60 hover:text-[#149ED8] transition-colors cursor-pointer disabled:opacity-50"
                                style={{ fontFamily: 'var(--font-work-sans)', background: 'radial-gradient(ellipse at 50% 110%, rgba(60,94,119,0.20) 0%, rgba(1,5,17,0.11) 100%)' }}
                            >
                                {processing ? 'Sending…' : 'Submit'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
