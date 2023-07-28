import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {loginAuthGuard} from '../authentication/guards/login-auth.guard';
//import { SecuritymgmtComponent } from './components/securitymgmt/securitymgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginAuthGuard] },
  /*{ path: 'security', component: SecuritymgmtComponent, canActivate: [loginAuthGuard] },*/

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
