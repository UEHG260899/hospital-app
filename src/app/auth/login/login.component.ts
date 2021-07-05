import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public loginForm: FormGroup = this._fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember : [false]
  });

  constructor(private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService) { }

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
    
    //this._router.navigateByUrl("dashboard");
  }

}
