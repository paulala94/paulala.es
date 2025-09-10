import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit {
  skills = [
    { name: 'HTML & CSS', isBg: false },
    { name: 'JavaScript', isBg: false },
    { name: 'Vue.js', isBg: false },
    { name: 'React', isBg: false },
    { name: 'Angular', isBg: false },
    { name: 'Figma', isBg: true },
    { name: 'WordPress', isBg: true },
    { name: 'Adobe', isBg: true },
  ];

  @ViewChildren('skillItem') skillItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const items = this.skillItems.toArray().map((i) => i.nativeElement);

    const list = items[0]?.parentElement;
    if (!list) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(items, {
              opacity: 0,
              y: 90,
              duration: 0.8,
              ease: 'bounce.out',
              stagger: 0.2, // animación escalonada
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(list);
  }
}
