import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {loginAuthGuard} from '../authentication/guards/login-auth.guard';
import { PlantComponent } from './components/plantmanagement/plantmanagement.component';
import { NewPlantRegistrationComponent } from './components/new-plant-registration/new-plant-registration.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { ApprovalConfigurationsComponent } from './components/Approval-Configuration/approval-configurations.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginAuthGuard] },
  { path: 'plant', component: PlantComponent, canActivate: [loginAuthGuard] },
  { path: 'addplant', component: NewPlantRegistrationComponent, canActivate: [loginAuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [loginAuthGuard] },
  { path: 'addroles', component: AddRolesComponent, canActivate: [loginAuthGuard] },
  { path: 'apprconfig', component: ApprovalConfigurationsComponent, canActivate: [loginAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
