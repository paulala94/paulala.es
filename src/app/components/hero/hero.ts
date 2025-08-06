import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    const delayStep = 150;

    // 1. Animación secuencial para .logo .mask-wrap (al cargar)
    const logoMasks = Array.from(
      this.el.nativeElement.querySelectorAll('.logo .mask-wrap')
    ) as HTMLElement[];
    logoMasks.forEach((mask, i) => {
      setTimeout(() => {
        mask.classList.add('in-view');
      }, i * 600); // 600 ms entre cada una
    });

    // 2. Resto de lógicas para otros bloques, como tenías...
    const allMaskWraps = Array.from(
      this.el.nativeElement.querySelectorAll('.mask-wrap')
    ) as HTMLElement[];
    const bgMaskWraps = Array.from(
      this.el.nativeElement.querySelectorAll('.bg .mask-wrap')
    ) as HTMLElement[];

    const standaloneSpans = allMaskWraps.filter(
      (el) => !bgMaskWraps.includes(el)
    );

    // IntersectionObserver para .bg
    const bgBlocks = Array.from(
      this.el.nativeElement.querySelectorAll('.bg')
    ) as HTMLElement[];

    bgBlocks.forEach((bg) => {
      const wordSpans = Array.from(
        bg.querySelectorAll('.mask-wrap')
      ) as HTMLElement[];
      wordSpans.forEach((span) => span.classList.remove('in-view'));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              wordSpans.forEach((span, i) => {
                setTimeout(() => span.classList.add('in-view'), i * delayStep);
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(bg);
    });

    // Animación con IntersectionObserver para otros contenedores
    const parentGroups = new Map<HTMLElement, HTMLElement[]>();

    standaloneSpans.forEach((span) => {
      const parent = span.parentElement!;
      if (!parentGroups.has(parent)) {
        parentGroups.set(parent, []);
      }
      parentGroups.get(parent)!.push(span);
    });

    parentGroups.forEach((spans, container) => {
      spans.forEach((span) => span.classList.remove('in-view'));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              spans.forEach((span, i) => {
                setTimeout(() => span.classList.add('in-view'), i * delayStep);
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(container);
    });
  }
}
