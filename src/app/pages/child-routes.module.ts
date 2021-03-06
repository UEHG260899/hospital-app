import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const childRoutes: Routes = [
  //data permite enviar información en las rutas
  {path : '', component : DashboardComponent, data : {titulo : 'Dashboard'}},
  {path : 'progress', component: ProgressComponent,  data : {titulo : 'Progress'}},
  {path : 'grafica1', component: Grafica1Component,  data : {titulo : 'Grafica'}},
  {path : 'account-settings', component : AccountSettingsComponent,  data : {titulo : 'Ajustes de cuenta'}},
  {path : 'promesas', component : PromesasComponent,  data : {titulo : 'Promesas'}},
  {path : 'rxjs', component: RxjsComponent,  data : {titulo : 'Rxjs'}},
  {path : 'perfil', component: PerfilComponent, data : {titulo : 'Perfil de usuario'}},
  //mantenimientos
  {path : 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data : {titulo : 'Usuarios de aplicacion'}},
  {path : 'hospitales', component: HospitalesComponent, data : {titulo : 'Hospitales de aplicacion'}},
  {path : 'medicos', component: MedicosComponent, data : {titulo: 'Medicos de la aplicacion'}},
  {path : 'medico/:id', component: MedicoComponent, data : {titulo : 'Medico a editar'}},
  {path : 'buscar/:termino', component : BusquedaComponent, data : {titulo : 'Busquedas'}}
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
