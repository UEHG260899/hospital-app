import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';

  constructor(private UsuarioService: UsuarioService) {
    this.imgUrl = UsuarioService.usuario.imagenUrl;
   }

  ngOnInit(): void {
  }

  logout(){
    this.UsuarioService.logout();
  }

}
