import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})


export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;


  constructor(private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
    private _modalService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this._modalService.nuevaImagen
        .pipe(
          delay(100)
        )  
        .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.paginaDesde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
        }
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.paginaDesde += valor;

    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde > this.totalUsuarios) {
      this.paginaDesde -= valor;
    }

    this.cargarUsuarios();
  }

  busqueda(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this._busquedasService.buscar('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      })
    return;
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this._usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(usuario.uid!)
          .subscribe(resp => {
            Swal.fire('Usuario borrado',
              `${usuario.nombre} ha sido borrado`,
              'success');

            this.cargarUsuarios();
          });
      }
    });

    return;
  }

  cambiarRole(usuario: Usuario){
    this._usuarioService.guardarUsuario(usuario)
        .subscribe(resp => {});
  }

  abrirModal(usuario: Usuario){
    this._modalService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
