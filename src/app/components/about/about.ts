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

    const img = this.aboutImage.nativeElement;
    const text = this.rightText.nativeElement;
    const imgRect = img.getBoundingClientRect();

    this.renderer.setStyle(text, 'position', 'absolute');
    this.renderer.setStyle(text, 'left', 'calc(50% - 55px)');
    this.renderer.setStyle(text, 'top', '36px');
    this.renderer.setStyle(text, 'width', '608.312px');
    this.renderer.setStyle(text, 'text-align', 'right');
  }

  private animateSentenceParagraphs(): void {
    const sentence = this.elementRef.nativeElement.querySelector(
      '.sentence'
    ) as HTMLElement;
    const paragraphs = Array.from(
      sentence.querySelectorAll('p')
    ) as HTMLElement[];
    const initialDelay = 200;
    const delayStep = 600;

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
