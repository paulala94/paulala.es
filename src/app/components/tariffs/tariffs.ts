import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { PricingModal } from '../pricing-modal/pricing-modal';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [CommonModule, Button, PricingModal],
  templateUrl: './tariffs.html',
  styleUrl: './tariffs.scss',
})
export class Tariffs implements AfterViewInit {
  hoveredIndex: number | null = null;

  showModal = false;
  selectedPlan: string | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const cards = Array.from(
      this.elementRef.nativeElement.querySelectorAll('.pricing-cards .card')
    ) as HTMLElement[];
    const delayStep = 300;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('in-view');
              }, i * delayStep);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cards.length) {
      observer.observe(cards[0]);
    }
  }

  openPricingForm(plan: string): void {
    this.selectedPlan = plan;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPlan = null;
  }
}
