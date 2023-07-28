import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './components/Department/add-department.component';
import { ApprovalConfigurationsComponent } from './components/Approval-Configuration/approval-configurations.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { NewPlantRegistrationComponent } from './components/new-plant-registration/new-plant-registration.component';
import { PlantComponent } from './components/plantmanagement/plantmanagement.component';
import { RolesComponent } from './components/roles/roles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AddDepartmentComponent,
    ApprovalConfigurationsComponent,
    AddRolesComponent,
    NewPlantRegistrationComponent,
    PlantComponent,
    RolesComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    NgxSpinnerModule
    
  ]
})
export class AuthenticationModule { }
