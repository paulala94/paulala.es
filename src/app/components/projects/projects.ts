import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Button } from '../button/button'
import projectsData from '../../../assets/projects.json'

@Component({
  selector: 'app-projects',
  imports: [ CommonModule, Button ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
projects = projectsData;

navigateToProject(url: string): void {
    if (this.isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

}