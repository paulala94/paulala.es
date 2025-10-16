import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
})
export class BackToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isVisible = yOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
