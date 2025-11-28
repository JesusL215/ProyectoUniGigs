import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternshipService } from '../../../services/internship.service';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../core/auth.service';
import { Internship } from '../../../shared/models/internship.interface';

@Component({
    selector: 'app-internship-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './internship-list.component.html'
})
export class InternshipListComponent implements OnInit {
    private internshipService = inject(InternshipService);
    private applicationService = inject(ApplicationService);
    private authService = inject(AuthService);

    internships: Internship[] = [];
    filteredInternships: Internship[] = [];
    loading = true;
    searchTerm = '';
    successMessage = '';
    errorMessage = '';

    ngOnInit(): void {
        this.loadInternships();
    }

    loadInternships(): void {
        this.internshipService.getAll().subscribe({
            next: (data) => {
                this.internships = data.filter(i => i.isActive);
                this.filteredInternships = this.internships;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading internships:', error);
                this.errorMessage = 'Error al cargar las pasantías';
                this.loading = false;
            }
        });
    }

    filterInternships(): void {
        if (!this.searchTerm.trim()) {
            this.filteredInternships = this.internships;
            return;
        }

        const term = this.searchTerm.toLowerCase();
        this.filteredInternships = this.internships.filter(internship =>
            internship.title.toLowerCase().includes(term) ||
            internship.description.toLowerCase().includes(term) ||
            internship.location.toLowerCase().includes(term) ||
            internship.requiredSkills.some(skill => skill.toLowerCase().includes(term))
        );
    }

    applyToInternship(internshipId: number): void {
        this.successMessage = '';
        this.errorMessage = '';

        this.applicationService.apply(internshipId).subscribe({
            next: () => {
                this.successMessage = '¡Postulación exitosa! Revisa tu dashboard para ver el estado.';
                setTimeout(() => this.successMessage = '', 5000);
            },
            error: (error) => {
                this.errorMessage = error.error?.message || 'Error al postularse. Inténtalo nuevamente.';
                setTimeout(() => this.errorMessage = '', 5000);
            }
        });
    }
}
