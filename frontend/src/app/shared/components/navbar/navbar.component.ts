import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { User } from '../../models/user.interface';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    authService = inject(AuthService);
    currentUser: User | null = null;

    constructor() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    isStudent(): boolean {
        return this.authService.getRole() === 'STUDENT';
    }

    isCompany(): boolean {
        return this.authService.getRole() === 'COMPANY';
    }

    logout(): void {
        this.authService.logout();
    }
}
