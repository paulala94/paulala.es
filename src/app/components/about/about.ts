import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  imports: [ CommonModule, Skills ], 
})

export class About implements AfterViewInit {
  @ViewChild('rightText', { static: false }) rightText!: ElementRef;
  @ViewChild('aboutImage', { static: false }) aboutImage!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.updateTextPosition();
    window.addEventListener('resize', () => this.updateTextPosition());
  }

  private updateTextPosition(): void {
    if (!this.rightText || !this.aboutImage) return;

    const img = this.aboutImage.nativeElement;
    const text = this.rightText.nativeElement;
    const imgRect = img.getBoundingClientRect();
    const containerRect = img.parentElement.getBoundingClientRect();

    this.renderer.setStyle(text, 'position', 'absolute');
    this.renderer.setStyle(text, 'left', 'calc(50% - 55px)');
    this.renderer.setStyle(text, 'top', '36px');
    this.renderer.setStyle(text, 'width', '608.312px');
    this.renderer.setStyle(text, 'text-align', 'right');
  }
}                                                                