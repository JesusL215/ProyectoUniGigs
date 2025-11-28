export interface AuthResponse {
    token: string;
    type: string; // "Bearer"
    id: number;
    email: string;
    role: 'STUDENT' | 'COMPANY';
    firstName: string;
    lastName: string;
}
