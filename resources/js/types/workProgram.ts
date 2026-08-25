export interface ProgramCardData {
    id: number;
    date?: string;
    title: string;
    subtitle: string;
    description: string;
    logo: string;
    images: string[];
}

export interface ProgramCardProps {
    program: ProgramCardData;
    index: number;
}
