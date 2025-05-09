import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-about',
  imports: [CardComponent],
  template: `
    <app-card [devName]="'ERIK OMAR ALBA DAVILA'" [imgUrl]="'devs/Erik.png'" />
    <app-card [devName]="'HECTOR ANDRES GUTIERREZ ESPARZA'" [imgUrl]="'devs/Hector.jpg'" />
    <app-card [devName]="'ERNESTO ALONSO MORQUECHO CANALES'" [imgUrl]="'devs/Ernesto.jpg'" />
    <app-card [devName]="'VALERIA MICHELLE SAUCEDO DIAZ'" [imgUrl]="'devs/Valeria.jpg'" />
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
