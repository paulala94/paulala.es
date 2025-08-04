import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

import projectsData from '../../../assets/projects.json';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Button],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit {
  projects = projectsData;

  ngAfterViewInit(): void {
    gsap.to('#projects', {
      backgroundPosition: '50% 30%', // Ejemplo: mueve fondo del centro al 30% verticalmente
      ease: 'none',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom', // Cuando la sección empieza a entrar
        end: 'bottom top', // Hasta que la sección sale de la pantalla
        scrub: true, // Animación sincronizada con el scroll
      },
    });
  }

  navigateToProject(url: string): void {
    if (this.isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
