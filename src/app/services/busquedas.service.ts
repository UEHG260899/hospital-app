import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public base_url: string = environment.baseURL;

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

  buscar( tipo: 'usuarios' | 'medicos' | 'hopsitales', termino: string = ''){
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this._http.get<any[]>(url, this.headers)
              .pipe(
                map( (resp: any) => resp.datos )
              );
  }
}
