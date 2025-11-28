import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup;
    loading = false;
    errorMessage = '';

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                // Redirect based on role
                const role = response.role;
                if (role === 'STUDENT') {
                    this.router.navigate(['/student/dashboard']);
                } else if (role === 'COMPANY') {
                    this.router.navigate(['/company/dashboard']);
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
            }
        });
    }
}
