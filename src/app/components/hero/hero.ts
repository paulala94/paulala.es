
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit {
  animate = false;
  animateBg = false;


  ngOnInit() {
    setTimeout(() => {
      this.animate = true;
    }, 100);
  }
}



