import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { InternshipService } from '../../../services/internship.service';
import { Internship } from '../../../shared/models/internship.interface';
import { User } from '../../../shared/models/user.interface';

@Component({
    selector: 'app-company-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './company-dashboard.component.html'
})
export class CompanyDashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private internshipService = inject(InternshipService);

    currentUser: User | null = null;
    internships: Internship[] = [];
    loading = true;

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.loadInternships();
    }

    loadInternships(): void {
        if (this.currentUser) {
            this.internshipService.getByCompany(this.currentUser.id).subscribe({
                next: (data) => {
                    this.internships = data;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading internships:', error);
                    this.loading = false;
                }
            });
        }
    }

    getActiveCount(): number {
        return this.internships.filter(i => i.isActive).length;
    }

    getInactiveCount(): number {
        return this.internships.filter(i => !i.isActive).length;
    }
}
