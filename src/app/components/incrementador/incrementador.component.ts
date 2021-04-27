import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 50;
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();

  cambiarValor(valor : number){
    if(this.progreso > 100 ){
      this.valorSalida.emit(100);
      this.progreso = 100;
    }

    if(this.progreso < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
    }

    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }

}
