export interface StudentProfile {
    id: number;
    userId: number;
    university: string;
    major: string;
    semester: number;
    skills: string[];
    resume?: string;
    bio?: string;
}
