import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  sending = false;
  sent = false;

  constructor(private http: HttpClient) {}

  submitForm(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const honeypot = form.value['honeypot'];
    if (honeypot) return;

    const formData = new FormData();
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

  resetForm() {
    this.sent = false;
    this.sending = false;
  }
}
