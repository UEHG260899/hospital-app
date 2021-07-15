import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


import { Medico } from '../models/medico.model';


const base_url = environment.baseURL;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private _http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos(){
    const url = `${base_url}/medicos`;
    return this._http.get(url, this.headers)
              .pipe(
                map((resp: any) => resp.medicos)
              );
  }

  getMedicoId(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this._http.get(url, this.headers)
              .pipe(
                map((resp: any) => resp.medico)
              );
  }

  crearMedico(medico : {nombre: string, hospital: string }){
    const url = `${base_url}/medicos`;
    return this._http.post(url, medico, this.headers);
  }
  
  actualizarMedico(medico : Medico){
    const url = `${base_url}/medicos/${medico.id}`;
    return this._http.put(url, medico , this.headers);
                
  }

  borrarMedico(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this._http.delete(url, this.headers);
  }


}
