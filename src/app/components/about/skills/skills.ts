import {
  Component, ElementRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [ CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
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
    { name: 'Adobe', isBg: true }
  ];

  @ViewChildren('skillItem') skillItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.skillItems.forEach(item => observer.observe(item.nativeElement));
  }
}
