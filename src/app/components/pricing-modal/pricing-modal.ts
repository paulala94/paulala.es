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
  @Input() selectedPlan: string | null = null;

  sending = false;
  sent = false;

  constructor(private http: HttpClient) {}

  closeModal() {
    this.sent = false;
    this.sending = false;
    // Emitir evento para que el padre cierre el modal si lo deseas
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Honeypot anti spam
    const honeypot = form.value['honeypot'];
    if (honeypot) {
      // Bot detected
      return;
    }

    formData.append('plan', this.selectedPlan || '');
    formData.append('name', form.value['name'] || '');
    formData.append('email', form.value['email'] || '');
    formData.append('message', form.value['message'] || '');

    this.sending = true;

    // Endpoint de Formspree -- reemplaza con tu URL real
    const formspreeURL = 'https://formspree.io/f/xblkojkd';

    this.http.post(formspreeURL, formData, { responseType: 'text' }).subscribe(
      () => {
        this.sending = false;
        this.sent = true;
        form.resetForm();
      },
      (error) => {
        this.sending = false;
        alert(
          'Ha ocurrido un error al enviar el formulario. Inténtalo más tarde.'
        );
        console.error(error);
      }
    );
  }
}
