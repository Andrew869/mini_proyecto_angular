import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoPipe } from './video.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent, VideoPipe],
  template: `
    <app-header/>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MPGym';
  video:string="";
}
