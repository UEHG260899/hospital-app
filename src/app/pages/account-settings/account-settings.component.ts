import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  elemento = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`
    this.elemento?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

}
