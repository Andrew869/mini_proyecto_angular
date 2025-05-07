import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-about',
  imports: [CardComponent],
  template: `
    <app-card [devName]="'ERIK OMAR ALBA DAVILA'" [imgUrl]="'img_avatar.png'" />
    <app-card [devName]="'HECTOR ANDRES GUTIERREZ ESPARZA'" [imgUrl]="'img_avatar.png'" />
    <app-card [devName]="'ERNESTO ALONSO MORQUECHO CANALES'" [imgUrl]="'img_avatar.png'" />
    <app-card [devName]="'VALERIA MICHELLE SAUCEDO DIAZ'"  />
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
