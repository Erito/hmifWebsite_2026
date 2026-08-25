// src/components/AboutUs/datas/division.ts

export const MaskImage = (singkatan: string) => {
    const map: Record<string, string> = {
        "BPH": "MaskBPH.svg",
        "R&D": "MaskRND.svg",
        "Finance": "MaskFN.svg",
        "Project Manager": "MaskPM.svg",
        "Public Relation": "MaskPR.svg",
        "Creative": "MaskCR.svg",
        "HR": "MaskHR.svg",
        "Blank": "MaskBlank.svg"
    };
    return `/assets/AboutUs/assetDivision/${map[singkatan]}`;
};

export const getTitleColor = (singkatan: string) => {
    const colorMap: Record<string, string> = {
        "BPH": "#0088CC",         
        "R&D": "#00B4D8",         
        "Finance": "#005696",     
        "Project Manager": "#00A8E8", 
        "Public Relation": "#D32F2F", 
        "Creative": "#E65100",    
        "HR": "#FF6D00"           
    };
    return colorMap[singkatan] || "#00A8E8";
};
