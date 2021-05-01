import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';






@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule
  ],
  exports : [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
