import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  faqs = [
    {
      question: '¿El precio incluye el dominio y hosting?',
      answer:
        'No, el precio base normalmente no incluye el coste de dominio y hosting. Estos servicios se pueden gestionar aparte o puedo asesorarte y encargarlos por ti si lo prefieres.',
      open: false,
    },
    {
      question: 'No sé qué tipo de web necesito, ¿me ayudas a decidir?',
      answer:
        'Por supuesto. Analizo tus necesidades, objetivos y presupuesto para recomendarte la opción más adecuada y explicarte claramente las diferencias entre tipos de web.',
      open: false,
    },
    {
      question: '¿En cuánto tiempo tendré mi web lista?',
      answer:
        'El plazo depende del tipo de proyecto, pero normalmente va de 1 a 4 semanas. Siempre acordamos un calendario claro desde el inicio.',
      open: false,
    },
    {
      question: '¿La web será responsive y se verá bien en móviles?',
      answer:
        'Sí, todas las webs se diseñan para funcionar perfectamente en móviles, tablets y ordenadores.',
      open: false,
    },
    {
      question: '¿Qué necesito aportar para arrancar el proyecto?',
      answer:
        'Necesitaré detalles sobre tu negocio, textos, imágenes y una idea de tus objetivos o referentes visuales. Si lo prefieres, puedo ayudarte a definir todo esto.',
      open: false,
    },
    {
      question: '¿Puedo gestionar luego el contenido de la web yo mismo?',
      answer:
        'Si el proyecto se hace en WordPress u otro CMS, recibirás acceso para editar textos, imágenes o entradas del blog de manera sencilla.',
      open: false,
    },
  ];
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const items: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('.faq-item')
    );
    const delayStep = 300;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('in-view'), i * delayStep);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (items.length) observer.observe(items[0]);
  }

  toggle(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
