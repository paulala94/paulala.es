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
    const logoImgs = Array.from(
      this.el.nativeElement.querySelectorAll('.logo .mask-wrap img')
    ) as HTMLElement[];

    gsap.from(logoImgs, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: 'bounce.out',
      stagger: 0.25,
    });

    const bgBlocks = Array.from(
      this.el.nativeElement.querySelectorAll('.bg')
    ) as HTMLElement[];

    bgBlocks.forEach((bg) => {
      const wordSpans = Array.from(
        bg.querySelectorAll('.mask-wrap img')
      ) as HTMLElement[];

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
