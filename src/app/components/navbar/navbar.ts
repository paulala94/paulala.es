import { Component } from '@angular/core';
import ScrollSmoother from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  scrollToSection(event: Event, targetId: string): void {
    event.preventDefault();
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(targetId, true, 'top top');
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}