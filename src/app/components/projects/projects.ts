import { Component, AfterViewInit } from '@angular/core';
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
export class Projects implements AfterViewInit {
  projects = projectsData;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('#projects', {
      backgroundPosition: '50% 30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
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
