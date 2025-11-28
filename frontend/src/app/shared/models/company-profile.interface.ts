export interface CompanyProfile {
    id: number;
    userId: number;
    companyName: string;
    industry: string;
    description?: string;
    website?: string;
    location?: string;
}
