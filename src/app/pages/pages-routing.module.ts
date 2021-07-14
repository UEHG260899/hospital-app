import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



const routes : Routes = [
  { 
    path : 'dashboard', 
    component : PagesComponent,
    canActivate: [AuthGuard],
    children : [
      //data permite enviar información en las rutas
      {path : '', component : DashboardComponent, data : {titulo : 'Dashboard'}},
      {path : 'progress', component: ProgressComponent,  data : {titulo : 'Progress'}},
      {path : 'grafica1', component: Grafica1Component,  data : {titulo : 'Grafica'}},
      {path : 'account-settings', component : AccountSettingsComponent,  data : {titulo : 'Ajustes de cuenta'}},
      {path : 'promesas', component : PromesasComponent,  data : {titulo : 'Promesas'}},
      {path : 'rxjs', component: RxjsComponent,  data : {titulo : 'Rxjs'}},
      {path : 'perfil', component: PerfilComponent, data : {titulo : 'Perfil de usuario'}},
      //mantenimientos
      {path : 'usuarios', component: UsuariosComponent, data : {titulo : 'Usuarios de aplicacion'}},
      {path : 'hospitales', component: HospitalesComponent, data : {titulo : 'Hospitales de aplicacion'}}
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class PagesRoutingModule { }
