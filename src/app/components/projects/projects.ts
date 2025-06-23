import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import projectsData from '../../../assets/projects.json'

@Component({
  selector: 'app-projects',
  imports: [ CommonModule ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
projects = projectsData;
}
