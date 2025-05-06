import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';
import { ContactForm } from '../../interfaces/contact-form.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  minDate = new Date();
  checkboxTouched = false;
  
  formData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: new Date(),
    membershipOptions: [],
    message: ''
  };
  
  serviceTypes = [
    'Membresía Regular',
    'Membresía Premium',
    'Clases Particulares',
    'Asesoría Nutricional',
    'Entrenamiento Personal'
  ];
  
  membershipOptions = [
    'Mensual',
    'Trimestral',
    'Semestral',
    'Anual'
  ];
  
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);
  
  onCheckboxChange(option: string, isChecked: boolean) {
    this.checkboxTouched = true;
    
    if (isChecked) {
      this.formData.membershipOptions.push(option);
    } else {
      const index = this.formData.membershipOptions.indexOf(option);
      if (index !== -1) {
        this.formData.membershipOptions.splice(index, 1);
      }
    }
  }
  
  isFormValid(): boolean {
    return this.formData.name !== '' && 
           this.formData.email !== '' && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email) &&
           this.formData.phone !== '' && 
           /^[0-9]{10}$/.test(this.formData.phone) &&
           this.formData.serviceType !== '' && 
           this.formData.preferredDate !== null &&
           this.formData.membershipOptions.length > 0 &&
           this.formData.message !== '' &&
           this.formData.message.length >= 20;
  }
  
  onSubmit() {
    if (this.isFormValid()) {
      this.storageService.saveContactForm({...this.formData});
      
      this.snackBar.open('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.', 'Cerrar', {
        duration: 5000
      });
      
      this.formData = {
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        preferredDate: new Date(),
        membershipOptions: [],
        message: ''
      };
      this.checkboxTouched = false;
    }
  }
}
