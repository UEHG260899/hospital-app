import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from "ng2-charts";


import { DonaComponent } from './dona/dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],

  exports : [
    IncrementadorComponent,
    DonaComponent
  ]
})
export class ComponentsModule { }
