import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselItem } from '../../interfaces/carrousel.interface';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() items: CarouselItem[] = [];
  @Input() autoSlide: boolean = true;
  @Input() slideInterval: number = 5000;
  
  currentSlide: number = 0;
  private autoSlideInterval: any;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.startAutoSlide();
    }
    
    if (this.items.length === 0) {
      this.items = [
        {
          image: '/carousel/img1.jpg',
          title: 'Empieza hoy tu viaje Fitness',
          description: 'Únete a nuestra comunidad y transforma tu vida con nuestros expertos entrenadores y nuestras instalaciones de primera categoría.'
        },
        {
          image: '/carousel/img2.jpg',
          title: 'Grupos de clases Fitness',
          description: 'Disfrute de motivadores entrenamientos en grupo dirigidos por instructores titulados. Desde yoga hasta Crossfit, tenemos algo para todos.'
        },
        {
          image: '/carousel/img3.jpg',
          title: 'Entrenamiento personal',
          description: 'Consiga sus objetivos más rápidamente con planes de entrenamiento personalizados y la orientación individualizada de nuestros entrenadores personales.'
        }
      ];
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.resetAutoSlide();
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.items.length - 1) {
      this.currentSlide++;
      this.resetAutoSlide();
    } else if (this.autoSlide) {
      this.currentSlide = 0;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      if (this.currentSlide < this.items.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    }, this.slideInterval);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private resetAutoSlide(): void {
    if (this.autoSlide) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }
}
