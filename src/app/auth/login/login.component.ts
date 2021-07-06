import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public auth2: any;

  public loginForm: FormGroup = this._fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private ngZone: NgZone) { }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this._usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(resp => {

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this._router.navigateByUrl('/');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '329672189352-3kii5mg1pv7h1fjhbtgjul03reo1lmhd.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this._usuarioService.loginGoogle(id_token)
              .subscribe(resp => {
                this.ngZone.run(() => {
                  this._router.navigateByUrl('/');
                })
              });
        }, function(error: any) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }




}
