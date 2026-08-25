import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { PageProps } from '@/types';

interface NavItem {
    label: string;
    href: string;
    match: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const adminNav: NavSection[] = [
    {
        title: '',
        items: [
            { label: 'Custom Link', href: route('admin.custom-links.index'), match: 'admin.custom-links.*' },
            { label: 'Gallery',     href: route('admin.gallery.index'),        match: 'admin.gallery.*' },
            { label: 'Information', href: route('admin.information.index'),    match: 'admin.information.*' },
        ],
    },
    {
        title: 'About Us',
        items: [
            { label: 'Wordingan',  href: route('admin.about-us.wordingan.edit'),          match: 'admin.about-us.wordingan.*' },
            { label: 'Divisi',     href: route('admin.about-us.division-members.index'),  match: 'admin.about-us.division-members.*' },
            { label: 'Grid Image', href: route('admin.about-us.grid-images.index'), match: 'admin.about-us.grid-images.*' },
        ],
    },
    {
        title: 'Home',
        items: [
            { label: 'Settings',    href: route('admin.home.settings.edit'),              match: 'admin.home.*' },
            { label: 'Contact',     href: route('admin.contact-submissions.index'),       match: 'admin.contact-submissions.*' },
            { label: 'Aspiration',  href: route('admin.aspiration-submissions.index'),    match: 'admin.aspiration-submissions.*' },
        ],
    },
    {
        title: 'Proker',
        items: [
            { label: 'Proker',    href: route('admin.proker.work-programs.index'), match: 'admin.proker.work-programs.*' },
            { label: 'Wordingan', href: route('admin.proker.wordingan.edit'),      match: 'admin.proker.wordingan.*' },
        ],
    },
];

const hrNav: NavSection[] = [
    {
        title: '',
        items: [
            { label: 'KPI Members', href: route('admin.kpi.index'), match: 'admin.kpi.*' },
        ],
    },
];

const masterNav: NavSection[] = [
    {
        title: 'Settings',
        items: [
            { label: 'Users', href: route('admin.users.index'), match: 'admin.users.*' },
        ],
    },
];

function NavLink({ item }: { item: NavItem }) {
    const active = route().current(item.match);
    return (
        <Link
            href={item.href}
            className={`flex items-center px-5 py-2 text-sm transition-colors ${
                active
                    ? 'bg-amber-500 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
            {item.label}
        </Link>
    );
}

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const role = user?.role ?? 'admin';
    const initial = user?.name?.[0]?.toUpperCase() ?? 'A';

    const sections =
        role === 'hr'     ? hrNav :
        role === 'master' ? [...hrNav, ...adminNav, ...masterNav] :
                            [...hrNav, ...adminNav];

    return (
        <div className="flex min-h-screen bg-[#111111] text-gray-200">
            {/* Sidebar */}
            <aside className="w-52 flex-shrink-0 flex flex-col border-r border-gray-800 bg-[#1a1a1a] overflow-y-auto">
                <div className="h-14 flex items-center px-5 border-b border-gray-800 flex-shrink-0">
                    <Link href={route('dashboard')} className="font-semibold text-white tracking-wide hover:text-amber-400 transition-colors">
                        Web HMIF
                    </Link>
                </div>

                <nav className="flex-1 py-2">
                    {/* Dashboard link */}
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center px-5 py-2 text-sm transition-colors mb-1 ${
                            route().current('dashboard')
                                ? 'bg-amber-500 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Dashboard
                    </Link>

                    {sections.map((section, i) => (
                        <div key={i} className="mt-3">
                            {section.title && (
                                <p className="px-5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    {section.title}
                                </p>
                            )}
                            {section.items.map((item) => (
                                <NavLink key={item.match} item={item} />
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-800 p-3 flex-shrink-0">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left px-2 py-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                        Log out
                    </Link>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-14 flex items-center justify-end px-6 border-b border-gray-800 bg-[#1a1a1a] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{user?.name}</span>
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-white">
                            {initial}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
