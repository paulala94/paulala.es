import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-pricing-modal',
  imports: [Button],
  templateUrl: './pricing-modal.html',
  styleUrl: './pricing-modal.scss',
  standalone: true,
})
export class PricingModalComponent {
  @Input() plan: string | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    // Este sería tu lógica de envío del formulario
    alert(`Formulario enviado para: ${this.plan}`);
    this.closeModal();
  }
}
