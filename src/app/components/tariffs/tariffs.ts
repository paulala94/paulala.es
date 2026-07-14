import { Component } from '@angular/core';
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
export class Tariffs {
  showModal = false;
  selectedPlan: string | null = null;
  hoveredIndex: number | null = null;

  openPricingForm(plan: string): void {
    this.selectedPlan = plan;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPlan = null;
  }
}