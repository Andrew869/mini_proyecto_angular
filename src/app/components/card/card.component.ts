import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div class="card">
      <img src="{{ imgUrl }}" alt="Avatar">
      <div class="container">
        <h4><b>{{ devName }}</b></h4>
        <p>Desarrollador</p>
      </div>
    </div>
  `,
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() devName = 'name';
  @Input() imgUrl = 'img_avatar.png';
}
