import { Component, OnInit } from '@angular/core';
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


  public loginForm: FormGroup = this._fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember : [false]
  });

  constructor(private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this._usuarioService.loginUsuario( this.loginForm.value )
        .subscribe( resp => {
          
          if(this.loginForm.get('remember')?.value){
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          }else{
            localStorage.removeItem('email');
          }
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        });
    
  }

  onSuccess(googleUser : any) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    
  }

  onFailure(error : any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }


}
