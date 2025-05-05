import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GymClass } from '../interfaces/class.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://my-json-server.typicode.com/yourusername/fitlife-gym-api/classes';
  
  private backupData: GymClass[] = [
    {
      id: 1,
      name: 'Zumba',
      description: 'Clase aeróbica que combina ritmos latinos con ejercicios cardiovasculares.',
      image: 'assets/images/zumba.jpg',
      instructor: 'Laura García',
      schedule: 'Lunes y Miércoles 18:00-19:00',
      capacity: 25,
      duration: 60
    },
    {
      id: 2,
      name: 'Yoga',
      description: 'Clase que combina posturas físicas, técnicas de respiración y meditación.',
      image: 'assets/images/yoga.jpg',
      instructor: 'Carlos Mendoza',
      schedule: 'Martes y Jueves 08:00-09:30',
      capacity: 20,
      duration: 90
    },
    {
      id: 3,
      name: 'Spinning',
      description: 'Entrenamiento cardiovascular en bicicleta estática con música motivadora.',
      image: 'assets/images/spinning.jpg',
      instructor: 'Ana Rodríguez',
      schedule: 'Lunes, Miércoles y Viernes 19:00-20:00',
      capacity: 15,
      duration: 60
    },
    {
      id: 4,
      name: 'CrossFit',
      description: 'Programa de acondicionamiento que combina levantamiento de pesas y cardio.',
      image: 'assets/images/crossfit.jpg',
      instructor: 'Roberto Díaz',
      schedule: 'Martes, Jueves y Sábado 17:00-18:30',
      capacity: 12,
      duration: 90
    },
    {
      id: 5,
      name: 'Pilates',
      description: 'Método de ejercicio que desarrolla los músculos internos para mantener el equilibrio corporal.',
      image: 'assets/images/pilates.jpg',
      instructor: 'María López',
      schedule: 'Miércoles y Viernes 10:00-11:00',
      capacity: 15,
      duration: 60
    }
  ];

  constructor(private http: HttpClient) { }

  getClasses(): Observable<GymClass[]> {
    return of(this.backupData);
    // return this.http.get<GymClass[]>(this.apiUrl);
  }

  getClassById(id: number): Observable<GymClass | undefined> {
    return of(this.backupData.find(c => c.id === id));
    // return this.http.get<GymClass>(`${this.apiUrl}/${id}`);
  }

  searchClasses(term: string): Observable<GymClass[]> {
    if (!term.trim()) {
      return of([]);
    }
    const filteredClasses = this.backupData.filter(c => 
      c.name.toLowerCase().includes(term.toLowerCase()) || 
      c.description.toLowerCase().includes(term.toLowerCase()) ||
      c.instructor.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredClasses);
  }
}