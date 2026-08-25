import { Head } from "@inertiajs/react";

const CARD_BG: React.CSSProperties = {
    background:
        "linear-gradient(135deg, rgba(19,58,90,0.9) 0%, rgba(10,22,42,0.95) 50%, rgba(1,5,17,1) 100%)",
};

type LinkItem = {
    label: React.ReactNode;
    icon: string;
    iconLeft: string;
    iconTop: string;
    iconSize: string;
    href: string;
    mobileLeft?: string;
    mobileRight?: string;
    mobileBottom?: string;
    mobileSize?: string;
    mobileOpacity?: number;
};

const leftLinks: LinkItem[] = [
    {
        label: (
            <>
                <span>UMN Informatics Student </span>
                <span style={{ fontFamily: "var(--font-kanit)" }}>
                    Aspiration Form
                </span>
            </>
        ),
        icon: "/assets/LinkPage/aspiration.svg",
        iconLeft: "-78px",
        iconTop: "35px",
        iconSize: "263px",
        href: "/aspirationForm",
        mobileLeft: "16px",
        mobileBottom: "26px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
    {
        label: "Instagram @hmif.umn",
        icon: "/assets/LinkPage/instagram.svg",
        iconLeft: "-45px",
        iconTop: "64px",
        iconSize: "204px",
        href: "https://instagram.com/hmif.umn",
        mobileLeft: "18px",
        mobileBottom: "20px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
    {
        label: "Website Himpunan Mahasiswa Informatika",
        icon: "/assets/LinkPage/website.svg",
        iconLeft: "-61px",
        iconTop: "-10px",
        iconSize: "246px",
        href: "https://hmif.umn.ac.id",
        mobileLeft: "16px",
        mobileBottom: "24px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
];

const rightLinks: LinkItem[] = [
    {
        label: "For Business Inquiries (Internal UMN)",
        icon: "/assets/LinkPage/business.svg",
        iconLeft: "-22px",
        iconTop: "35px",
        iconSize: "206px",
        href: "mailto:hmif@umn.ac.id",
        mobileRight: "16px",
        mobileBottom: "28px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
    {
        label: "For Business Inquiries (External UMN 1)",
        icon: "/assets/LinkPage/business.svg",
        iconLeft: "-22px",
        iconTop: "35px",
        iconSize: "206px",
        href: "mailto:rnd.hmif@gmail.com",
        mobileRight: "16px",
        mobileBottom: "28px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
    {
        label: "For Business Inquiries (External UMN 2)",
        icon: "/assets/LinkPage/business.svg",
        iconLeft: "-22px",
        iconTop: "35px",
        iconSize: "206px",
        href: "mailto:rnd.hmif@gmail.com",
        mobileRight: "16px",
        mobileBottom: "28px",
        mobileSize: "72px",
        mobileOpacity: 0.28,
    },
];

function LinkCard({ item }: { item: LinkItem }) {
    return (
        <a
            href={item.href}
            className="relative flex h-[11.25rem] w-full shrink-0 flex-col items-start justify-center overflow-hidden rounded-2xl px-6 py-6 sm:px-[43px] sm:py-[55px]"
            style={CARD_BG}
        >
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl p-px bg-gradient-to-b from-white/30 to-[#005696]/80"
                style={{
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />
            <div className="relative w-full pl-14 sm:pl-[152px]">
                <p
                    className="w-full text-[18px] sm:text-[20px] font-medium leading-[1.5] text-[#f0f2f5]"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                >
                    {item.label}
                </p>
            </div>
            {/* mobile decorative icon: small, bottom-left */}
            <img
                alt=""
                src={item.icon}
                className="absolute block sm:hidden pointer-events-none"
                style={{
                    left: item.mobileLeft ?? undefined,
                    right: item.mobileRight ?? undefined,
                    bottom: item.mobileBottom ?? "12px",
                    width: item.mobileSize ?? "48px",
                    height: item.mobileSize ?? "48px",
                    opacity: item.mobileOpacity ?? 0.28,
                }}
            />
            {/* desktop / tablet icon: original positions */}
            <img
                alt=""
                src={item.icon}
                className="absolute hidden sm:block"
                style={{
                    left: item.iconLeft,
                    top: item.iconTop,
                    width: item.iconSize,
                    height: item.iconSize,
                }}
            />
        </a>
    );
}

export default function LinksPage() {
    return (
        <main className="relative h-screen overflow-hidden bg-[#010511]">
            <Head title="Connect With Us" />

            <img
                src="/assets/LinkPage/supergraphics.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-0 w-full"
                style={{ top: "45%" }}
            />

            <div className="relative mx-auto flex h-full max-w-[1146px] flex-col items-center justify-center gap-8 px-4 py-10">
                <div className="flex max-w-[54.5rem] flex-col items-center gap-3 text-center">
                    <h1
                        className="bg-gradient-to-r from-[#149ed8] to-[#005696] bg-clip-text text-[72px] sm:text-[128px] font-semibold leading-[0.9] tracking-[-6.4px] text-transparent"
                        style={{ fontFamily: "var(--font-kanit)" }}
                    >
                        Connect With Us
                    </h1>
                    <p
                        className="text-[16px] sm:text-[20px] font-normal leading-[1.5] text-[#c2cad6]"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                        Explore our community, share your aspirations, or reach
                        out for partnerships.
                    </p>
                </div>

                <div className="relative grid grid-cols-2 gap-4 w-full">
                    <div className="flex w-full flex-col gap-5">
                        {leftLinks.map((item, i) => (
                            <LinkCard key={i} item={item} />
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-5">
                        {rightLinks.map((item, i) => (
                            <LinkCard key={i} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
