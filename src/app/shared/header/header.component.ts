import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private UsuarioService: UsuarioService,
              private _router: Router) {
    this.usuario = UsuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.UsuarioService.logout();
  }

  buscar(termino: string){

    if(termino.length === 0){
      this._router.navigateByUrl('/dashboard');
    }
    this._router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
