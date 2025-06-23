import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
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

    const imgLeftRelative = imgRect.left - containerRect.left;
    const imgTopRelative = imgRect.top - containerRect.top;

     this.renderer.setStyle(text, 'position', 'absolute');
  this.renderer.setStyle(text, 'left', `calc(50% - 55px)`); 
  this.renderer.setStyle(text, 'top', '36px');
  this.renderer.setStyle(text, 'width', '608.312px');
  this.renderer.setStyle(text, 'text-align', 'right');
  }
}