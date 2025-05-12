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
  vistaActual: 'template' | 'reactivo' = 'template';

  datosTemplate: any[] = [];
  datosReactivo: any[] = [];
  formTemplate: {
    nombre: string;
    correo: string;
    clase: string;
    horario: string;
    fecha: string;
    equipamiento: string[];
  } = {
    nombre: '',
    correo: '',
    clase: '',
    horario: '',
    fecha: '',
    equipamiento: []
  };

  editando: boolean = false;
  indexEditando: number | null = null;
  formEditar = { nombre: '', correo: '' };

  clasesDisponibles = ['Yoga', 'Box', 'HIIT', 'Pilates', 'Crossfit'];
  opcionesEquipo = ['Tapete para yoga', 'Pesas', 'Cuerda', 'Banda Elástica'];
  hoy = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.cargarDatos();
  }

  seleccionarVista(vista: 'template' | 'reactivo') {
    this.vistaActual = vista;
    this.cancelarEdicion();
  }

  cargarDatos() {
    const tData = localStorage.getItem('datosTemplate');
    const rData = localStorage.getItem('datosReactivo');
    this.datosTemplate = tData ? JSON.parse(tData) : [];
    this.datosReactivo = rData ? JSON.parse(rData) : [];
  }

  guardarDatos() {
    localStorage.setItem('datosTemplate', JSON.stringify(this.datosTemplate));
    localStorage.setItem('datosReactivo', JSON.stringify(this.datosReactivo));
  }

  eliminar(index: number) {
    const datos = this.vistaActual === 'template' ? this.datosTemplate : this.datosReactivo;
    datos.splice(index, 1);
    this.guardarDatos();
  }

  editar(index: number) {
    this.editando = true;
    this.indexEditando = index;

    const datos = this.vistaActual === 'template' ? this.datosTemplate : this.datosReactivo;
    const registro = datos[index];
    this.formEditar = { ...registro };
  }

  guardarEdicion() {
    if (this.indexEditando === null) return;

    const datos = this.vistaActual === 'template' ? this.datosTemplate : this.datosReactivo;
    datos[this.indexEditando] = { ...this.formEditar };

    this.guardarDatos();
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.editando = false;
    this.indexEditando = null;
    this.formEditar = { nombre: '', correo: '' };
  }

  actualizarEquipamiento(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.formTemplate.equipamiento.push(value);
    } else {
      this.formTemplate.equipamiento = this.formTemplate.equipamiento.filter(e => e !== value);
    }
  }

  registrarClase(form: any) {
    if (form.invalid || this.formTemplate.equipamiento.length === 0) return;

    this.datosTemplate.push({ ...this.formTemplate });
    this.guardarDatos();
    this.formTemplate = {
      nombre: '',
      correo: '',
      clase: '',
      horario: '',
      fecha: '',
      equipamiento: []
    };

    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Tu clase personalizada ha sido registrada.',
      timer: 2000,
      showConfirmButton: false
    });

    form.resetForm();
  }
}
