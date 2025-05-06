import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
// import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
// import { ClassesComponent } from './components/classes/classes.component';
// import { TrainersComponent } from './components/trainers/trainers.component';
// import { ContactComponent } from './components/contact/contact.component';
// import { LoginComponent } from './components/login/login.component';
// import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
  {path: 'home', redirectTo: '/', pathMatch: 'full'},
  // {path: '', component: HomeComponent},
  // {path: 'about', component: AboutComponent},
  // {path: 'classes', component: ClassesComponent},
  // {path: 'trainers', component: TrainersComponent},
  // {path: 'contact', component: ContactComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'admin', component: AdminPanelComponent},
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'classes', loadComponent: () => import('./components/classes/classes.component').then(m => m.ClassesComponent) },
  { path: 'trainers', loadComponent: () => import('./components/trainers/trainers.component').then(m => m.TrainersComponent) },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];