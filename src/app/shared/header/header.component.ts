import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private UsuarioService: UsuarioService) {
    this.usuario = UsuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.UsuarioService.logout();
  }

}
