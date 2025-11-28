import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: (allowedRole: 'STUDENT' | 'COMPANY') => CanActivateFn =
    (allowedRole) => (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const userRole = authService.getRole();

        if (userRole === allowedRole) {
            return true;
        }

        // Redirect to appropriate dashboard based on actual role
        if (userRole === 'STUDENT') {
            router.navigate(['/student/dashboard']);
        } else if (userRole === 'COMPANY') {
            router.navigate(['/company/dashboard']);
        } else {
            router.navigate(['/login']);
        }

        return false;
    };
