import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
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
  public medicosTemp: Medico[] = [];
  public imgSubs!: Subscription;

  constructor(private _medicosService: MedicoService,
              private _modalService: ModalImagenService,
              private _busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this._modalService.nuevaImagen
        .pipe(
          delay(100)
        )  
        .subscribe(img => this.cargarMedicos());
  }


  cargarMedicos(){
    this.cargando = true;
    this._medicosService.cargarMedicos()
        .subscribe((resp) => {
          this.cargando = false;
          this.medicos = resp;
          this.medicosTemp = resp;
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

  busqueda(termino: string){
    
    if(termino.length === 0){
      return this.medicos = this.medicosTemp;
    }

    this._busquedaService.buscar('medicos', termino)
        .subscribe((resp) => {
          this.medicos = resp;
        });

    return;
  }
}
