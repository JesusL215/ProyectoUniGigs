export type ApplicationStatus =
    | 'PENDIENTE'
    | 'SELECCIONADO'
    | 'EN_PROCESO'
    | 'COMPLETADO'
    | 'CANCELADO'
    | 'RECHAZADO';

export interface Application {
    id: number;
    internshipId: number;
    studentId: number;
    status: ApplicationStatus;
    appliedAt: string;
    internshipTitle?: string;
    studentName?: string;
}
