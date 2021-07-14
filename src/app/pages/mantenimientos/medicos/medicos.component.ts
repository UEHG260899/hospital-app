import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  constructor(private _medicosService: MedicoService,
              private _modalService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }


  cargarMedicos(){
    this.cargando = true;
    this._medicosService.cargarMedicos()
        .subscribe((resp) => {
          this.cargando = false;
          this.medicos = resp;
        });
  }

  borrarMedico(medico : Medico){
    this._medicosService.borrarMedico(medico.id)
        .subscribe((resp) => {
          Swal.fire('Eliminado', medico.nombre, 'success');
          this.cargarMedicos();
        });
  }

  abrirModal(medico : Medico){
    this._modalService.abrirModal('medicos', medico.id, medico.img);
  }
}
