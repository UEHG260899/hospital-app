import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public urlImagen: string = '';

  constructor(private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService) {
    this.menuItems = _sidebarService.menu;
    this.urlImagen = this._usuarioService.usuario.imagenUrl;
  }

  ngOnInit(): void {
  }

}
