import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Internship } from '../shared/models/internship.interface';

@Injectable({
    providedIn: 'root'
})
export class InternshipService {
    private readonly API_URL = 'http://localhost:8080/api/internships';
    private http = inject(HttpClient);

    getAll(): Observable<Internship[]> {
        return this.http.get<Internship[]>(this.API_URL);
    }

    getById(id: number): Observable<Internship> {
        return this.http.get<Internship>(`${this.API_URL}/${id}`);
    }

    create(internship: Partial<Internship>): Observable<Internship> {
        return this.http.post<Internship>(this.API_URL, internship);
    }

    update(id: number, internship: Partial<Internship>): Observable<Internship> {
        return this.http.put<Internship>(`${this.API_URL}/${id}`, internship);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    getByCompany(companyId: number): Observable<Internship[]> {
        return this.http.get<Internship[]>(`${this.API_URL}/company/${companyId}`);
    }
}
