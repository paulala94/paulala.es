import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { About } from "./components/about/about";
import { Projects } from "./components/projects/projects";
import { Tariffs } from "./components/tariffs/tariffs"


@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Hero, About, Projects, Tariffs],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'paulala';
}
