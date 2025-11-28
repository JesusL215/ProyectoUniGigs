import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    features = [
        {
            icon: 'bi-search',
            title: 'Descubre Oportunidades',
            description: 'Explora pasantías en empresas líderes que buscan talento universitario.'
        },
        {
            icon: 'bi-person-check',
            title: 'Perfil Profesional',
            description: 'Crea tu perfil y destaca tus habilidades para atraer a reclutadores.'
        },
        {
            icon: 'bi-graph-up-arrow',
            title: 'Gana Experiencia',
            description: 'Construye tu portafolio con micro-experiencias reales en el mundo laboral.'
        },
        {
            icon: 'bi-building',
            title: 'Para Empresas',
            description: 'Encuentra talento joven y publique oportunidades de pasantías fácilmente.'
        }
    ];
}
