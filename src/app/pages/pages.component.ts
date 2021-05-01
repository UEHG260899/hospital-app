import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  tema = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    const tema = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.tema!.setAttribute('href', tema);
  }

}
