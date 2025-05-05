import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  featuredClasses = [
    {
      id: 1,
      name: 'Zumba',
      description: 'Clase aeróbica que combina ritmos latinos con ejercicios cardiovasculares.',
      image: 'assets/images/zumba.jpg',
      instructor: 'Laura García'
    },
    {
      id: 2,
      name: 'Yoga',
      description: 'Clase que combina posturas físicas, técnicas de respiración y meditación.',
      image: 'assets/images/yoga.jpg',
      instructor: 'Carlos Mendoza'
    },
    {
      id: 3,
      name: 'Spinning',
      description: 'Entrenamiento cardiovascular en bicicleta estática con música motivadora.',
      image: 'assets/images/spinning.jpg',
      instructor: 'Ana Rodríguez'
    }
  ];
  
  navigateToClass(classId: number) {
    console.log(`Navegando a la clase con ID: ${classId}`);
  }
}
