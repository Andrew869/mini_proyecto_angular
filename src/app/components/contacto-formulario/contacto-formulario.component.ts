import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';
import { ContactForm } from '../../interfaces/contact-form.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contacto-formulario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  templateUrl: './contacto-formulario.component.html',
  styleUrl: './contacto-formulario.component.css'
})
export class ContactoFormularioComponent {
  minDate = new Date();
  checkboxTouched = false;
  @ViewChild('formRef') form!: NgForm;

  formData: FormGroup;
  // membership: Array<string> = [];

  constructor(private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      serviceType: ['', [Validators.required]],
      preferredDate: [new Date(), [Validators.required]],
      membership: this.formBuilder.array([], Validators.required),
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

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

  onCheckboxChange(event: MatCheckboxChange) {
    this.checkboxTouched = true;

    const value = event.source.value;
    const membership = this.formData.get('membership') as FormArray;

    if (event.checked) {
      membership.push(new FormControl(value));
    } else {
      const index = membership.controls.findIndex(ctrl => ctrl.value === value);
      if (index !== -1) {
        membership.removeAt(index);
      }
    }
  }

  isChecked(option: string): boolean {
    const membership = this.formData.get('membership') as FormArray;
    return membership.value.includes(option);
  }

  markFormGroupUntouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupUntouched(control);
      } else {
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  onSubmit() {
    if (this.formData.invalid) return;

    const formValues = this.formData.value;

    const existingData = JSON.parse(localStorage.getItem('datosContacto') || '[]');

    existingData.push(formValues);

    localStorage.setItem('datosContacto', JSON.stringify(existingData));

    this.snackBar.open('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.', 'Cerrar', {
      duration: 5000
    });

    this.form.resetForm();

    const membershipArray = this.formData.get('membership') as FormArray;
    membershipArray.clear();
    membershipArray.markAsPristine();
    membershipArray.markAsUntouched();
    this.checkboxTouched = false;
  }


  get name() {
    return this.formData.get('name') as FormControl;
  }
  get email() {
    return this.formData.get('email') as FormControl;
  }
  get phone() {
    return this.formData.get('phone') as FormControl;
  }
  get serviceType() {
    return this.formData.get('serviceType') as FormControl;
  }
  get preferredDate() {
    return this.formData.get('preferredDate') as FormControl;
  }
  get membership() {
    return this.formData.get('membership') as FormControl;
  }
  get message() {
    return this.formData.get('message') as FormControl;
  }
}
