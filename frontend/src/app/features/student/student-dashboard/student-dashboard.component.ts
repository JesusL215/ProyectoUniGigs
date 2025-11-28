import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../shared/models/application.interface';
import { User } from '../../../shared/models/user.interface';

@Component({
    selector: 'app-student-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private applicationService = inject(ApplicationService);

    currentUser: User | null = null;
    applications: Application[] = [];
    loading = true;

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.loadApplications();
    }

    loadApplications(): void {
        if (this.currentUser) {
            this.applicationService.getByStudent(this.currentUser.id).subscribe({
                next: (apps) => {
                    this.applications = apps;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading applications:', error);
                    this.loading = false;
                }
            });
        }
    }

    getStatusBadgeClass(status: string): string {
        const classes: { [key: string]: string } = {
            'PENDIENTE': 'bg-warning',
            'SELECCIONADO': 'bg-success',
            'EN_PROCESO': 'bg-info',
            'COMPLETADO': 'bg-primary',
            'CANCELADO': 'bg-secondary',
            'RECHAZADO': 'bg-danger'
        };
        return classes[status] || 'bg-secondary';
    }
}
