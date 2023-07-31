import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {loginAuthGuard} from '../authentication/guards/login-auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



//import { SecuritymgmtComponent } from './components/securitymgmt/securitymgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginAuthGuard] },
  //{ path: 'admin-home', component:AdminHomeComponent, canActivate: [loginAuthGuard] },

  
  //{
  //  path: 'roles',
  //  component: RolesComponent,
  //  canActivate: [AuthGuard],
  //},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
