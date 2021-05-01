import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _tema = document.querySelector('#theme');


  constructor() {
    const tema = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this._tema!.setAttribute('href', tema);
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`
    this._tema?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void{
    const links = document.querySelectorAll('.selector');
    links.forEach( element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currenTheme = this._tema?.getAttribute('href');

      if(btnThemeUrl === currenTheme){
        element.classList.add('working');
      }
    });
  }
}
