import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _baseUrl: string = environment.baseURL;

  constructor(private _http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    return this._http.post(`${this._baseUrl}/usuarios`, formData);
  }
}
