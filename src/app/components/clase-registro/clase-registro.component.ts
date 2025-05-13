import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClaseFormularioComponent } from '../clase-formulario/clase-formulario.component';

@Component({
  selector: 'app-clase-registro',
  imports: [RouterModule, ClaseFormularioComponent],
  templateUrl: './clase-registro.component.html',
  styleUrl: './clase-registro.component.css'
})
export class ClaseRegistroComponent {

}
