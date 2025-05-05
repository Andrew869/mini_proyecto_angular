import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS: User[] = [
    { username: 'admin1', password: 'admin123', fullName: 'Administrador Principal' },
    { username: 'admin2', password: 'admin456', fullName: 'Coordinador de Gimnasio' },
    { username: 'admin3', password: 'admin789', fullName: 'Supervisor de Clases' }
  ];

  currentUser = signal<User | null>(null);

  constructor() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}