import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {


  progreso1: number = 25;
  progreso2: number = 35;

  get getProgeso1(): string {
    return `${this.progreso1}%`;
  }

  get getProgeso2(): string {
    return `${this.progreso2}%`;
  }

}
