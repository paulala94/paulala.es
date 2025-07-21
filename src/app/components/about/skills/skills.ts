import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
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

    items.forEach((li) => li.classList.remove('animate'));

    const list = items[0]?.parentElement;
    if (!list) return;

    const initialDelay = 200;
    const delayStep = 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((li, i) => {
              setTimeout(
                () => li.classList.add('animate'),
                initialDelay + i * delayStep
              );
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
