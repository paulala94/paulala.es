import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Seleccionamos todas las imágenes dentro del logo
    const logoImgs = Array.from(
      this.el.nativeElement.querySelectorAll('.logo .mask-wrap img')
    ) as HTMLElement[];

    // Animación inicial con GSAP (fade-in + slide-up relativo)
    gsap.from(logoImgs, {
      opacity: 0,
      yPercent: 100, // 🔹 relativo → no pisa tu transform del SCSS
      duration: 1,
      ease: 'bounce.out',
      stagger: 0.25,
    });

    // 🔹 Animación para los bloques .bg (ej. en móvil)
    const bgBlocks = Array.from(
      this.el.nativeElement.querySelectorAll('.bg')
    ) as HTMLElement[];

    bgBlocks.forEach((bg) => {
      const wordSpans = Array.from(
        bg.querySelectorAll('.mask-wrap img')
      ) as HTMLElement[];

      // Estado inicial
      gsap.set(wordSpans, { opacity: 0, yPercent: 100 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(wordSpans, {
                opacity: 1,
                yPercent: 0,
                duration: 0.9,
                ease: 'power2.out',
                stagger: 0.15,
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(bg);
    });
  }
}
