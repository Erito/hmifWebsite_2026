export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'hr' | 'master';
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface KpiPeriod {
    id: number;
    kpi_member_id: number;
    period_name: string;
    score: number;
}

export interface KpiMember {
    id: number;
    name: string;
    division: string;
    overall: number;
    periods: KpiPeriod[];
}

export type KpiData = Record<string, { overall: number; history: Record<string, number> }>;

export interface GalleryImage {
    id: number;
    image_path: string;
    image_url: string;
    title: string | null;
    description: string | null;
    order: number;
}

export interface CustomLink {
    id: number;
    slug: string;
    destination_url: string;
    label: string | null;
    created_at: string;
    updated_at: string;
}

export interface Article {
    id: number;
    category: string;
    title: string;
    published_at: string;
    date: string;
    image_path: string;
    image_url: string;
    image_alt: string | null;
    excerpt: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}
