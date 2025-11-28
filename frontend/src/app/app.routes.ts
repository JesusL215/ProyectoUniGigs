import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'student',
        canActivate: [authGuard, roleGuard('STUDENT')],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/student/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent)
            },
            {
                path: 'internships',
                loadComponent: () => import('./features/student/internship-list/internship-list.component').then(m => m.InternshipListComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'company',
        canActivate: [authGuard, roleGuard('COMPANY')],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/company/company-dashboard/company-dashboard.component').then(m => m.CompanyDashboardComponent)
            },
            {
                path: 'create-internship',
                loadComponent: () => import('./features/company/create-internship/create-internship.component').then(m => m.CreateInternshipComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
