import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';



declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _baseUrl: string = environment.baseURL;
  public auth2: any;
  public usuario!: Usuario;


  constructor(private _http: HttpClient,
    private _router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get role(): string {
    return this.usuario.role!;
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '329672189352-3kii5mg1pv7h1fjhbtgjul03reo1lmhd.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });

  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');


    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this._router.navigateByUrl('/auth/login');
      });

    });
  }


  validarToken(): Observable<boolean> {

    return this._http.get(`${this._baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, google, role, uid, img = '' } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', google, img, uid, role);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(err => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this._http.post(`${this._baseUrl}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role!
    }
    return this._http.put(`${this._baseUrl}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  loginUsuario(formData: LoginForm) {
    return this._http.post(`${this._baseUrl}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  loginGoogle(token: Object) {
    return this._http.post(`${this._baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${this._baseUrl}/usuarios?desde=${desde}`;
    return this._http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(usuario => new Usuario(usuario.nombre, usuario.email
            , '', usuario.google, usuario.img, usuario.uid, usuario.role));
          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }

  eliminarUsuario( uid: string ){
    const url = `${this._baseUrl}/usuarios/${uid}`;
    return this._http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this._http.put(`${this._baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
