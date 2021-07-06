import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _baseUrl: string = environment.baseURL;
  public auth2: any;


  constructor(private _http: HttpClient,
    private _router: Router,
    private ngZone: NgZone) {
    this.googleInit();
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


  logout() {
    localStorage.removeItem('token');


    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this._router.navigateByUrl('/auth/login');
      });

    });
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem("token") || '';

    return this._http.get(`${this._baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this._http.post(`${this._baseUrl}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginUsuario(formData: LoginForm) {
    return this._http.post(`${this._baseUrl}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: Object) {
    return this._http.post(`${this._baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
