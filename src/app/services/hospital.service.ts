import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


import { Hospital } from '../models/hospital.model';


const baseUrl = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {
    const url = `${baseUrl}/hospital`;
    return this._http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
                .pipe(
                  map( ( resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales)
                );
  }
}
