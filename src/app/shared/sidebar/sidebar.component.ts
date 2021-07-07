import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario!: Usuario;

  constructor(private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService) {
    this.menuItems = _sidebarService.menu;
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
