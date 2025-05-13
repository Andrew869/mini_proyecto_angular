import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, take } from 'rxjs';
import { GymClass } from '../interfaces/class.interface';
import { Trainer } from '../interfaces/trainer.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Cambiar las URLs para que apunten a los archivos JSON locales en la carpeta public
  private classesApiUrl = '/classes.json';
  private trainersApiUrl = '/trainers.json';
  //private classesApiUrl = 'https://fitness-Classes.free.beeceptor.com';//
  //private trainersApiUrl = 'https://fitness-trainers.free.beeceptor.com';//
  
  private backupClassesData: GymClass[] = [
    {
      id: 1,
      name: 'Zumba',
      description: 'Clase aeróbica que combina ritmos latinos con ejercicios cardiovasculares.',
      image: '/clases/zumba.jpg',
      instructor: 'Laura García',
      schedule: 'Lunes y Miércoles 18:00-19:00',
      capacity: 25,
      duration: 60
    },
    {
      id: 2,
      name: 'Yoga',
      description: 'Clase que combina posturas físicas, técnicas de respiración y meditación.',
      image: '/clases/yoga.jpg',
      instructor: 'Carlos Mendoza',
      schedule: 'Martes y Jueves 08:00-09:30',
      capacity: 20,
      duration: 90
    },
    {
      id: 3,
      name: 'Spinning',
      description: 'Entrenamiento cardiovascular en bicicleta estática con música motivadora.',
      image: '/clases/spinning.jpg',
      instructor: 'Ana Rodríguez',
      schedule: 'Lunes, Miércoles y Viernes 19:00-20:00',
      capacity: 15,
      duration: 60
    },
    {
      id: 4,
      name: 'CrossFit',
      description: 'Programa de acondicionamiento que combina levantamiento de pesas y cardio.',
      image: '/clases/crossfit.jpg',
      instructor: 'Roberto Díaz',
      schedule: 'Martes, Jueves y Sábado 17:00-18:30',
      capacity: 12,
      duration: 90
    },
    {
      id: 5,
      name: 'Pilates',
      description: 'Método de ejercicio que desarrolla los músculos internos para mantener el equilibrio corporal.',
      image: '/clases/pilates.jpg',
      instructor: 'María López',
      schedule: 'Miércoles y Viernes 10:00-11:00',
      capacity: 15,
      duration: 60
    }
  ];

  private backupTrainersData: Trainer[] = [
    {
      id: 1,
      name: 'Ana Rodríguez',
      specialty: 'Entrenadora de Fuerza y Acondicionamiento',
      bio: 'Ana se especializa en entrenar la fuerza y ayuda a construir musculo mientras se mantiene la movilidad y la flexibilidad.',
      image: 'trainer/trainer1.jpeg',
      experience: 8,
      certifications: ['NASM Certified Personal Trainer', 'Certified Strength and Conditioning Specialist', 'TRX Suspension Training'],
      socialMedia: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 2,
      name: 'Maria López',
      specialty: 'Entrenadora de Pilates',
      bio: 'Maria trae un acercamiento fresco al fitness, concentrandose en la memoria y relajacion muscular, ademas de el mejor alineamiento en todos sus movimientos.',
      image: 'trainer/trainer2.jpeg',
      experience: 12,
      certifications: ['Trainers Alliance Certification', 'Pilates Method Alliance Certified', 'Mindfulness Meditation Teacher'],
      socialMedia: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    },
    {
      id: 3,
      name: 'Roberto Díaz',
      specialty: 'Instructor de CrossFit',
      bio: 'Alex es un apasionado al ayudarte a superar tus limites y conseguir grandiosos resultados a travez del arduo entrenamiento.',
      image: 'trainer/trainer3.jpeg',
      experience: 6,
      certifications: ['CrossFit Level 2 Trainer', 'HIIT Specialist', 'Kettlebell Certification'],
      socialMedia: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      specialty: 'Instructor de Yoga',
      bio: 'Carlos Mendoza es un instructor de yoga apasionado con más de 4 años de experiencia ayudando a alumnos de todos los niveles a encontrar equilibrio cuerpo/mente. Su enfoque combina vinyasa dinámico con prácticas de respiración consciente y meditación.',
      image: 'trainer/trainer4.jpeg',
      experience: 4,
      certifications: ['Yoga Alliance RYT-200', 'Certificación en Yoga Terapéutico (Yoga Therapy Institute)', 'RCP y Primeros Auxilios (Cruz Roja)'],
      socialMedia: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 5,
      name: 'Laura García',
      specialty: 'Instructora de Zumba',
      bio: 'Laura es reconocida por sus clases enérgicas y divertidas,ella motiva a sus alumnos a bailar al ritmo de la música y a mejorar su condición física. Su estilo alegre y cercano crea un ambiente donde todos pueden disfrutar y ponerse en forma.',
      image: 'trainer/trainer5.jpeg',
      experience: 11,
      certifications: ['Licencia Zumba Basic 1', 'Zumba Gold', 'Zumba Toning', 'Instructor de Fitness Aeróbico (AFPA)'],
      socialMedia: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com'
      }
    }
  ];

  constructor(private http: HttpClient) { }

  getClasses(): Observable<GymClass[]> {
    return this.http.get<GymClass[]>(this.classesApiUrl)
      .pipe(take(1),
        catchError(error => {
          console.error('Error fetching classes from API:', error);
          return of(this.backupClassesData);
        })
      );
  }

  getClassById(id: number): Observable<GymClass | undefined> {
    return this.http.get<GymClass>(`${this.classesApiUrl}/${id}`)
      .pipe(
        /*catchError(error => {
          console.error(`Error fetching class with id ${id} from API:`, error);
          return of(this.backupClassesData.find(c => c.id === id));
        })*/
      );
  }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.trainersApiUrl)
      .pipe(take(1),
        catchError(error => {
          console.error('Error fetching trainers from API:', error);
          return of(this.backupTrainersData);
        })
      );
  }

  searchClasses(term: string): Observable<GymClass[]> {
    if (!term.trim()) {
      return of([]);
    }
    
    return this.http.get<GymClass[]>(`${this.classesApiUrl}/search?term=${term}`)
      .pipe(
        catchError(error => {
          console.error('Error searching classes from API:', error);
          const filteredClasses = this.backupClassesData.filter(c => 
            c.name.toLowerCase().includes(term.toLowerCase()) || 
            c.description.toLowerCase().includes(term.toLowerCase()) ||
            c.instructor.toLowerCase().includes(term.toLowerCase())
          );
          return of(filteredClasses);
        })
      );
  }
}