export interface Internship {
    id: number;
    title: string;
    description: string;
    requiredSkills: string[];
    duration: string;
    location: string;
    isActive: boolean;
    companyId: number;
    companyName?: string;
    createdAt?: string;
}
