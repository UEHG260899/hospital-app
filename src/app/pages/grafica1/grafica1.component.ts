import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  datos1: Array<number>[] = [
    [350, 450, 100]
  ];
  colores1 = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ]

  labels2: string[] = ['Categoria 1', 'Categoria 2', 'categoria 3'];
  datos2: Array<number>[] = [
    [150, 200, 300]
  ];
  colores2 = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
