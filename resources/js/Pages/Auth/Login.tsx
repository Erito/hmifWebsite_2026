import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <main
            className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #0a1f3a 0%, #125ab882 51%, #051428 100%)',
            }}
        >
            <Head title="Log in" />

            {/* Bottom right decoration */}
            <div className="absolute right-0 bottom-0 pointer-events-none overflow-hidden hidden lg:block opacity-100">
                <img
                    src="/assets/Aspiration/Mask group.svg"
                    alt="Mask decoration"
                    width={400}
                    height={400}
                    className="w-auto h-auto object-contain"
                />
            </div>

            {/* Left side decoration */}
            <div className="absolute -left-15 -top-50 opacity-50 lg:opacity-100 scale-75 lg:scale-100">
                <img
                    src="/assets/Aspiration/Mask group (1).svg"
                    alt="Mask decoration"
                    width={200}
                    height={200}
                    className="w-auto h-auto object-contain"
                />
            </div>

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 520px 365px at 25% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.65) 100%)`,
                }}
            />

            <div className="relative z-10 w-full mx-auto px-6 py-10 lg:py-16 flex items-center justify-center min-h-screen">
                {/* Login form card */}
                <div
                    className="relative w-full max-w-2xl rounded-3xl p-10 lg:p-18"
                    style={{
                        background: 'rgba(15, 23, 42, 0)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 0 60px rgba(0, 180, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Gradient border effect */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(0, 110, 255, 0.57) 100%)',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}
                    />

                    <div className="relative z-10 mb-9">
                        <h2 className="text-white font-bold text-3xl lg:text-4xl mb-3">
                            Login to Your Account
                        </h2>
                        <p className="text-[#7ba5c7] text-base">Enter your credentials to continue.</p>
                    </div>

                    {status && (
                        <div className="relative z-10 mb-4 text-sm font-medium text-green-400">{status}</div>
                    )}

                    <form onSubmit={submit} className="relative z-10 space-y-6">
                        {/* Email */}
                        <div className="relative z-10">
                            <label className="block text-white text-base font-semibold mb-3">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your@email.com"
                                autoComplete="username"
                                autoFocus
                                className="w-full rounded-full px-5 py-3 text-white text-base placeholder-[#7a9fc0] outline-none transition-all duration-300 focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
                                style={{
                                    background: 'rgba(10, 20, 40, 0.4)',
                                    border: '1.5px solid rgba(0, 180, 255, 0.35)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                }}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div className="relative z-10">
                            <label className="block text-white text-base font-semibold mb-3">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="w-full rounded-full px-5 py-3 pr-12 text-white text-base placeholder-[#7a9fc0] outline-none transition-all duration-300 focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
                                    style={{
                                        background: 'rgba(10, 20, 40, 0.4)',
                                        border: '1.5px solid rgba(0, 180, 255, 0.35)',
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7ba5c7] hover:text-white transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="relative z-10 flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', (e.target.checked || false) as false)}
                                    className="w-4 h-4 rounded cursor-pointer accent-cyan-400"
                                    style={{
                                        background: 'rgba(10, 20, 40, 0.4)',
                                        border: '1.5px solid rgba(0, 180, 255, 0.35)',
                                    }}
                                />
                                <span className="text-[#7ba5c7] text-sm">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <div className="relative z-10 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-8 py-3 rounded-full text-white text-base font-semibold transition-all duration-300 hover:opacity-100 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: 'rgba(0, 180, 255, 0.15)',
                                    border: '1.5px solid rgba(0, 180, 255, 0.5)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 20px rgba(0, 180, 255, 0.15)',
                                }}
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
