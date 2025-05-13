import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {path: 'home', redirectTo: '/', pathMatch: 'full'},
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'classes', loadComponent: () => import('./components/classes/classes.component').then(m => m.ClassesComponent) },
  { path: 'claseRegistro', loadComponent: () => import('./components/clase-registro/clase-registro.component').then(m => m.ClaseRegistroComponent) },
  { path: 'trainers', loadComponent: () => import('./components/trainers/trainers.component').then(m => m.TrainersComponent) },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];