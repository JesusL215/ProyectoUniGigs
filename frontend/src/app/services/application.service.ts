import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../shared/models/application.interface';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private readonly API_URL = 'http://localhost:8080/api/applications';
    private http = inject(HttpClient);

    apply(internshipId: number): Observable<Application> {
        return this.http.post<Application>(this.API_URL, { internshipId });
    }

    getByStudent(studentId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.API_URL}/student/${studentId}`);
    }

    getByInternship(internshipId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.API_URL}/internship/${internshipId}`);
    }

    updateStatus(id: number, status: ApplicationStatus): Observable<Application> {
        return this.http.put<Application>(`${this.API_URL}/${id}/status`, { status });
    }

    withdraw(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
