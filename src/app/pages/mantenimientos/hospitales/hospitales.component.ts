import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';



@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private _hospitalService: HospitalService,
              private _modalService: ModalImagenService,
              private _busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this._modalService.nuevaImagen
        .pipe(
          delay(100)
        )  
        .subscribe(img => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }

  guardarCambios(hospital : Hospital){
    this._hospitalService.actualizarHospital(hospital.id, hospital.nombre)
        .subscribe((resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  }

  eliminarHospital(hospital : Hospital){
    this._hospitalService.eliminarHospital(hospital.id)
        .subscribe((resp) => {
          Swal.fire('Eliminado', 'Se ha eliminado con exito', 'success');
          this.cargarHospitales();
        });
  }

  async abrirSweetAlert(){
    const { value = ''} = await Swal.fire<string>({
      title: 'Agregar Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    });

    if(value!.trim().length > 0){
      this._hospitalService.crearHospital(value!)
          .subscribe((resp : any) => {
            this.hospitales.push(resp.hospital)
          });
    }
    
  }

  abrirModal(hospital : Hospital){
    this._modalService.abrirModal('hospitales', hospital.id, hospital.img);
  }

  busqueda(termino: string){
    
    if(termino.length === 0){
      return this.hospitales = this.hospitalesTemp;
    }

    this._busquedaService.buscar('hospitales', termino)
        .subscribe((resp) => {
          this.hospitales = resp;
        });

    return;
  }

}
