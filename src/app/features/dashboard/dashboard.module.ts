import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedAngularMaterialModule } from '../../shared/angular-material/angular-material.module'
import { SharedCommonModule } from '../../shared/common/common.module'


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedAngularMaterialModule,
    SharedCommonModule
  ]
})
export class DashboardModule { }
