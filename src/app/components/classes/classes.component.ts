import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../services/api.service';
import { GymClass } from '../../interfaces/class.interface';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {
  classes: GymClass[] = [];
  filteredClasses: GymClass[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.filteredClasses = [...this.classes];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching classes', err);
        this.error = 'No se pudieron cargar las clases. Por favor, intente nuevamente más tarde.';
        this.loading = false;
      }
    });
  }

  searchClasses(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClasses = [...this.classes];
      return;
    }
    
    this.loading = true;
    this.apiService.searchClasses(this.searchTerm).subscribe({
      next: (results) => {
        this.filteredClasses = results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching classes', err);
        const term = this.searchTerm.toLowerCase().trim();
        this.filteredClasses = this.classes.filter(classItem => 
          classItem.name.toLowerCase().includes(term) ||
          classItem.instructor.toLowerCase().includes(term) ||
          classItem.description.toLowerCase().includes(term)
        );
        this.loading = false;
      }
    });
  }
}
