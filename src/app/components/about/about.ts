import {
  Component,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  standalone: true,
  imports: [CommonModule, Skills],
})
export class About implements AfterViewInit {
  @ViewChild('rightText', { static: false }) rightText!: ElementRef;
  @ViewChild('aboutImage', { static: false }) aboutImage!: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateTextPosition();
    window.addEventListener('resize', () => this.updateTextPosition());

    this.animateSentenceParagraphs();
  }

  private updateTextPosition(): void {
    if (!this.rightText || !this.aboutImage) return;

    const text = this.rightText.nativeElement;
    const mq1440 = window.matchMedia('(max-width: 1440px)');
    const mq1600 = window.matchMedia('(max-width: 1600px)');
    const mq1900 = window.matchMedia('(max-width: 1900px)');
    const mq2560 = window.matchMedia('(max-width: 2560px)');

    if (mq1440.matches) {
      // <= 1440px
      this.renderer.setStyle(text, 'position', 'absolute');
      this.renderer.setStyle(text, 'left', 'calc(50% - 88px)');
      this.renderer.setStyle(text, 'top', '36px');
      this.renderer.setStyle(text, 'width', '700px'); // ajusta según necesidad
      this.renderer.setStyle(text, 'text-align', 'center');
    } else if (mq1600.matches) {
      // > 1440px y <= 1600px
      this.renderer.setStyle(text, 'position', 'absolute');
      this.renderer.setStyle(text, 'left', 'calc(50% - 111px)'); // nuevo valor para 1600px
      this.renderer.setStyle(text, 'top', '36px');
      this.renderer.setStyle(text, 'width', '780px'); // ajusta según necesidad
      this.renderer.setStyle(text, 'text-align', 'center');
    } else if (mq1900.matches) {
      // > 1600px y <= 1900px
      this.renderer.setStyle(text, 'position', 'absolute');
      this.renderer.setStyle(text, 'left', 'calc(50% - 200px)');
      this.renderer.setStyle(text, 'top', '36px');
      this.renderer.setStyle(text, 'width', '860px'); // ajusta según necesidad
      this.renderer.setStyle(text, 'text-align', 'center');
    } else if (mq2560.matches) {
      // > 1900px y <= 2560px
      this.renderer.setStyle(text, 'position', 'absolute');
      this.renderer.setStyle(text, 'left', 'calc(50% - 141px)');
      this.renderer.setStyle(text, 'top', '36px');
      this.renderer.setStyle(text, 'width', '1024px');
      this.renderer.setStyle(text, 'text-align', 'center');
    } else {
      // > 2560px
      this.renderer.setStyle(text, 'position', 'absolute');
      this.renderer.setStyle(text, 'left', 'calc(50% - 55px)');
      this.renderer.setStyle(text, 'top', '36px');
      this.renderer.setStyle(text, 'width', '608.312px');
      this.renderer.setStyle(text, 'text-align', 'right');
    }
  }
  private animateSentenceParagraphs(): void {
    const sentence = this.elementRef.nativeElement.querySelector(
      '.sentence'
    ) as HTMLElement;
    const paragraphs = Array.from(
      sentence.querySelectorAll('p')
    ) as HTMLElement[];
    const initialDelay = 200;
    const delayStep = 200;

    paragraphs.forEach((p) => p.classList.remove('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paragraphs.forEach((p, i) => {
              setTimeout(
                () => p.classList.add('reveal'),
                initialDelay + i * delayStep
              );
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sentence);
  }
}
