import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileuploadService } from '../../services/fileupload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubida!: File;
  public imgTemp: any = '';


  constructor(private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _fileUploadService: FileuploadService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this._fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {

    this._usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios guardados con exito', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

  cambiarImagen(event: any) {
    let imagen = event.target.files[0];

    this.imagenSubida = imagen;

    if (!imagen) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imagen);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return;
  }

  subirImagen() {
    this._fileUploadService.actualizarFoto(this.imagenSubida, 'usuarios', this.usuario.uid!)
      .then((img) => {
        this.usuario.img = img
        Swal.fire('Guardado', 'La imagen se cargo correctamente', 'success');
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
