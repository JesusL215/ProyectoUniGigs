import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    registerForm: FormGroup;
    loading = false;
    errorMessage = '';
    successMessage = '';

    constructor() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            role: ['STUDENT', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword) {
            return null;
        }

        return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    }

    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get confirmPassword() { return this.registerForm.get('confirmPassword'); }
    get firstName() { return this.registerForm.get('firstName'); }
    get lastName() { return this.registerForm.get('lastName'); }
    get role() { return this.registerForm.get('role'); }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const { confirmPassword, ...registerData } = this.registerForm.value;

        this.authService.register(registerData).subscribe({
            next: () => {
                this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Error al registrarse. Intenta nuevamente.';
            }
        });
    }
}
