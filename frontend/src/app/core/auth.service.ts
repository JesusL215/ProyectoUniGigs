import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../shared/models/auth-response.interface';
import { LoginRequest } from '../shared/models/login-request.interface';
import { RegisterRequest } from '../shared/models/register-request.interface';
import { User } from '../shared/models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://localhost:8080/api/auth';
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'current_user';

    private http = inject(HttpClient);
    private router = inject(Router);

    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(response => {
                this.storeAuthData(response);
            })
        );
    }

    register(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    getRole(): 'STUDENT' | 'COMPANY' | null {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        // Optional: Add token expiration check here
        return true;
    }

    private storeAuthData(authResponse: AuthResponse): void {
        localStorage.setItem(this.TOKEN_KEY, authResponse.token);

        const user: User = {
            id: authResponse.id,
            email: authResponse.email,
            firstName: authResponse.firstName,
            lastName: authResponse.lastName,
            role: authResponse.role,
            isActive: true
        };

        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    private getUserFromStorage(): User | null {
        const userJson = localStorage.getItem(this.USER_KEY);
        if (userJson) {
            try {
                return JSON.parse(userJson);
            } catch {
                return null;
            }
        }
        return null;
    }
}
