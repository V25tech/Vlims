import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppintializorService, serverConfigInitializerFactory } from 'src/app/shared/appintializor.service';
import { MessageService } from 'primeng/api';
import { AuditadminhomeComponent } from './components/auditadminhome/auditadminhome.component';
import { AuditplantgridpageComponent } from './components/auditplantgridpage/auditplantgridpage.component';
import { AuditusermanagementgridpageComponent } from './components/auditusermanagementgridpage/auditusermanagementgridpage.component';
import { AudithierarchyhomepageComponent } from './components/audithierarchyhomepage/audithierarchyhomepage.component';
import { AuditdepartmentgridpageComponent } from './components/auditdepartmentgridpage/auditdepartmentgridpage.component';
import { AuditrolegridpageComponent } from './components/auditrolegridpage/auditrolegridpage.component';
import { AuditsetfuncprofilegridpageComponent } from './components/auditsetfuncprofilegridpage/auditsetfuncprofilegridpage.component';
import { AuditDepAddComponent } from './components/audit-dep-add/audit-dep-add.component';
import { AuditRoleAddPageComponent } from './components/audit-role-add-page/audit-role-add-page.component';
import { AuditUserMananagementAddPageComponent } from './components/audit-user-mananagement-add-page/audit-user-mananagement-add-page.component';
import { AuditPlantAddPageComponent } from './components/audit-plant-add-page/audit-plant-add-page.component';
import { FunctionalProfileAddPageComponent } from './components/functional-profile-add-page/functional-profile-add-page.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuditadminhomeComponent,
    AuditplantgridpageComponent,
    AuditusermanagementgridpageComponent,
    AudithierarchyhomepageComponent,
    AuditdepartmentgridpageComponent,
    AuditrolegridpageComponent,
    AuditsetfuncprofilegridpageComponent,
    AuditDepAddComponent,
    AuditRoleAddPageComponent,
    AuditUserMananagementAddPageComponent,
    AuditPlantAddPageComponent,
    FunctionalProfileAddPageComponent,
    //AdminHomeComponent,
    //AddDepartmentComponent,
    //ApprovalConfigurationsComponent,
    // AddRolesComponent,
    // NewPlantRegistrationComponent,
    //PlantComponent,
   // RolesComponent


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

  ],
  providers: [AppintializorService, { provide: APP_INITIALIZER, useFactory: serverConfigInitializerFactory, deps: [AppintializorService], multi: true },MessageService]
})
export class AuthenticationModule { 
 

}
