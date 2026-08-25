export const CATEGORY_CONFIG = {
    BEASISWA: { label: 'BEASISWA', color: '#149ED8' },
    INFORMATION: { label: 'INFORMATION', color: '#E45325' },
    EMPLOYMENT: { label: 'EMPLOYMENT', color: '#BF1E2D' },
    OTHERS: { label: 'OTHERS', color: '#9167f3f1' },
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;
export const getCategoryColor = (category: CategoryKey): string => CATEGORY_CONFIG[category]?.color || '#149ED8';
export const getCategoryLabel = (category: CategoryKey): string => CATEGORY_CONFIG[category]?.label || category;
