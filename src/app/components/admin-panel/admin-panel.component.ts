import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  datosTemplate: any[] = [];

  formTemplate: {
    id?: number;
    nombre: string;
    correo: string;
    clase: string;
    horario: string;
    fecha: string;
    equipamiento: string[];
  } = this.inicializarFormulario();

<<<<<<< HEAD
  editando: boolean = false;
  indexEditando: number | null = null;
  formEditar = { nombre: '', correo: '' };

  clasesDisponibles = ['Yoga', 'Zumba', 'Spinnig', 'Pilates', 'Crossfit'];
=======
  clasesDisponibles = ['Yoga', 'Spinning', 'Zumba', 'Pilates', 'Crossfit'];
>>>>>>> origin/RamaVale
  opcionesEquipo = ['Tapete para yoga', 'Pesas', 'Cuerda', 'Banda Elástica'];
  hoy = new Date().toISOString().split('T')[0];

  vistaActual: string = 'template';
  modoEdicion: boolean = false;

  ngOnInit(): void {
    this.cargarDatos();
  }

  inicializarFormulario() {
    return {
      id: undefined,
      nombre: '',
      correo: '',
      clase: '',
      horario: '',
      fecha: '',
      equipamiento: []
    };
  }

  cargarDatos() {
    const tData = localStorage.getItem('datosTemplate');
    this.datosTemplate = tData ? JSON.parse(tData) : [];
  }

  guardarDatos() {
    localStorage.setItem('datosTemplate', JSON.stringify(this.datosTemplate));
  }

  actualizarEquipamiento(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      if (!this.formTemplate.equipamiento.includes(value)) {
        this.formTemplate.equipamiento.push(value);
      }
    } else {
      this.formTemplate.equipamiento = this.formTemplate.equipamiento.filter(e => e !== value);
    }
  }

  registrarClase(form: any) {
    if (form.invalid || this.formTemplate.equipamiento.length === 0) return;

    if (this.modoEdicion) {
      const index = this.datosTemplate.findIndex(d => d.id === this.formTemplate.id);
      if (index !== -1) {
        this.datosTemplate[index] = { ...this.formTemplate };
      }
      Swal.fire({
        icon: 'success',
        title: '¡Registro actualizado!',
        text: 'La clase fue modificada correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      // Nuevo registro
      this.formTemplate.id = Date.now();
      this.datosTemplate.push({ ...this.formTemplate });

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu clase personalizada ha sido registrada.',
        timer: 2000,
        showConfirmButton: false
      });
    }

    this.guardarDatos();
    form.resetForm();
    this.formTemplate = this.inicializarFormulario();
    this.modoEdicion = false;
  }

  editarRegistro(registro: any) {
    this.formTemplate = { ...registro };
    this.modoEdicion = true;
    this.vistaActual = 'template';
  }

  eliminarRegistro(registro: any) {
    Swal.fire({
      title: '¿Eliminar este registro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.datosTemplate = this.datosTemplate.filter(r => r.id !== registro.id);
        this.guardarDatos();
        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
      }
    });
  }
}
