import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button'; // Ajusta si tu botón está en otro path

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './tariffs.html',
  styleUrl: './tariffs.scss',
})
export class Tariffs implements AfterViewInit {
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
    console.log('Solicitud de presupuesto para:', plan);

    // Puedes conectar esta acción con un modal, un formulario, scroll, etc.
    // document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  }
}
