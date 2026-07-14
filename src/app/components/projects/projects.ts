import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../button/button';
import projectsData from '../../../assets/projects.json';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Button],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {
  projects = projectsData;
  String = String; // Para usar en el template

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupScrollAnimations();
    this.setupHoverAnimations();
  }

  private setupScrollAnimations(): void {
    // Animación del container de fondo sutil
    gsap.to('.projects-container', {
      backgroundPosition: '50% 50%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.projects-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

   // Efecto parallax en las tarjetas
const cards = gsap.utils.toArray<HTMLElement>('.project-card');
cards.forEach((card) => {
  const animation = gsap.to(card, {
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: card,
      start: 'top bottom',
      end: 'center center',
      scrub: 1,
      markers: false,
    },
  });

  // Acceder a scrollTrigger usando notación de corchetes
  if (animation['scrollTrigger']) {
    this.scrollTriggers.push(animation['scrollTrigger'] as ScrollTrigger);
  }
});
  }

  private setupHoverAnimations(): void {
    // Animaciones más suaves en hover
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        });
      });
    });
  }

  navigateToProject(url: string): void {
    if (this.isValidUrl(url)) {
      // Pequeña animación antes de navegar
      gsap.to('.project-card', {
        duration: 0.2,
        opacity: 0.8,
      });

      window.open(url, '_blank', 'noopener,noreferrer');

      // Restaurar opacidad
      gsap.to('.project-card', {
        duration: 0.2,
        opacity: 1,
        delay: 0.1,
      });
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

  ngOnDestroy(): void {
    // Limpiar todos los ScrollTriggers
    this.scrollTriggers.forEach((trigger) => trigger.kill());
    gsap.globalTimeline.clear();
  }
}
