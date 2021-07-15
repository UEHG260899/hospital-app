import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(private _fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this._activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));


    this.medicoForm = this._fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe((hospitalId) => {
        this.hospitalSeleccionado = this.hospitales.find(hosp => hosp.id === hospitalId);
      });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this._medicoService.getMedicoId(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico) => {
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
        return;
      }, (error) => {
        return this._router.navigateByUrl('/dashboard/medicos');
      });
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const datos = {
        ...this.medicoForm.value,
        id: this.medicoSeleccionado.id
      }
      this._medicoService.actualizarMedico(datos)
        .subscribe((resp) => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        });

    } else {

      this._medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this._router.navigateByUrl(`/dashboard/medico/${resp.medico.id}`)
        });
    }


  }

}
