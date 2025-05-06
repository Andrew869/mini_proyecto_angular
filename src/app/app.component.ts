import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/classes" routerLinkActive="active">classes</a>
      <a routerLink="/trainers" routerLinkActive="active">trainers</a>
      <a routerLink="/contact" routerLinkActive="active">contact</a>
      <a routerLink="/login" routerLinkActive="active">login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MPGym';
}
