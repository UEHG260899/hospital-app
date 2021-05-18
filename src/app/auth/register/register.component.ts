import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public registerForm: FormGroup = this._fb.group({
    nombre : ['', [Validators.required, Validators.minLength(3)]],
    email : ['', Validators.required],
    password : ['', Validators.required],
    password2 : ['', Validators.required],
    terminos : [false, Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  crearUsuario(){
    console.log(this.registerForm.value);
  }

}
