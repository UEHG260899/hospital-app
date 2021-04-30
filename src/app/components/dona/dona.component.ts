import { Component, Input } from '@angular/core';
import { Colors, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo: string = 'Sin titulo';
  @Input('colores') colors: Colors[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ]
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('datos') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];


}
