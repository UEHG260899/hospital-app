import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../models/hospital.model';

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

  private generarUsuarios( resultados: any[] ): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email
        , '', user.google, user.img, user.uid, user.role)
    );
  }


  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = ''){
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this._http.get<any[]>(url, this.headers)
              .pipe(
                map( (resp: any) => {
                  switch(tipo){
                    case 'usuarios': 
                      return this.generarUsuarios(resp.datos);
                    case 'hospitales':
                      return resp.datos;
                    case 'medicos':
                      return resp.datos;
                    default: 
                      return [];
                  }
                } )
              );
  }

  busquedaGlobal(termino : string){
    const url = `${this.base_url}/todo/${termino}`;
    return this._http.get(url, this.headers);
  }
}
