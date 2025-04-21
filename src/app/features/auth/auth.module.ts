import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedAngularMaterialModule } from '../../shared/angular-material/angular-material.module'
import { SharedCommonModule } from '../../shared/common/common.module'

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedAngularMaterialModule,
    SharedCommonModule
  ]
})
export class AuthModule { }
