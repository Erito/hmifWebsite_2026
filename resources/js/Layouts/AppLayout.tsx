import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const HIDE_NAVBAR_ON  = ['/aspirationForm', '/linkPage'];
const HIDE_FOOTER_ON  = ['/gallery'];

export default function AppLayout({ children }: { children: ReactNode }) {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const showNavbar = !HIDE_NAVBAR_ON.includes(pathname);
    const showFooter = !HIDE_FOOTER_ON.includes(pathname);

    return (
        <SmoothScroll>
            {showNavbar && <Navbar />}
            <main>{children}</main>
            {showFooter && <Footer />}
        </SmoothScroll>
    );
}
