import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Trainer } from '../../interfaces/trainer.interface';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent implements OnInit {
  trainers: Trainer[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getTrainers().subscribe({
      next: (data) => {
        this.trainers = data.trainers;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trainers', err);
        this.error = 'No se pudieron cargar los entrenadores. Por favor, intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }
}