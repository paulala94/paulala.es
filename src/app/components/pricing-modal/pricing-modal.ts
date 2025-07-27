import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-pricing-modal',
  standalone: true,
  imports: [CommonModule, Button, FormsModule],
  templateUrl: './pricing-modal.html',
  styleUrl: './pricing-modal.scss',
})
export class PricingModal {
  @Input() selectedPlan: string | null = null;
  @Output() close = new EventEmitter<void>();

  sending = false;
  sent = false;

  constructor(private http: HttpClient) {}

  closeModal() {
    this.sent = false;
    this.sending = false;
    this.close.emit();
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const honeypot = form.value['honeypot'];
    if (honeypot) return; // Bot

    const formData = new FormData();
    formData.append('plan', this.selectedPlan || '');
    formData.append('name', form.value['name'] || '');
    formData.append('email', form.value['email'] || '');
    formData.append('message', form.value['message'] || '');

    this.sending = true;

    const formspreeURL = 'https://formspree.io/f/xblkojkd';

    this.http.post(formspreeURL, formData, { responseType: 'text' }).subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        form.resetForm();
      },
      error: (error: any) => {
        this.sending = false;
        alert(
          'Ha ocurrido un error al enviar el formulario. Inténtalo más tarde.'
        );
        console.error(error);
      },
    });
  }
}
