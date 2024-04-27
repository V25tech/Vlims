import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { DocumentsLandingComponent } from './components/documents-landing/documents-landing.component';
import { AssignedComponent } from './components/assigned/assigned.component';
import { DocumentTypesComponent } from './components/document-types/document-types.component';
import { AddDocumentTypeComponent } from './components/add-document-type/add-document-type.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { AddTemplateComponent } from './components/add-template/add-template.component';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { DocumentMasterHomeComponent } from './components/document-master-home/document-master-home.component';
import { AdminHomeComponent } from '../authentication/components/Admin-Home/Admin-home.component';
import { SecuritymgmtComponent } from '../authentication/components/Securitymgmt/securitymgmt.component';
import { PlantComponent } from '../authentication/components/Plantmanagement/plantmanagement.component';
import { RolesComponent } from '../authentication/components/Roles/roles.component';
import { Usergroupconfiguration } from '../../models/model';
import { DepartmentComponent } from '../authentication/components/Department/department.component';
import { UserConfigurationComponent } from '../authentication/components/User-configuration/user-configuration.component';
import { ApprovalConfigurationsComponent } from '../authentication/components/Approval-Configuration/approval-configurations.component';
import { UsergroupconfigurationComponent } from '../authentication/components/User-Group/usergroupconfiguration.component';
import { AddDepartmentComponent } from '../authentication/components/Department/add-department.component';
import { NewPlantRegistrationComponent } from '../authentication/components/New-plant-registration/new-plant-registration.component';
import { RegisterComponent } from '../authentication/components/register/register.component';
import { AddusergroupconfigurationComponent } from '../authentication/components/Add-user-group-configuration/add-usergroupconfiguration.component';
import { AddRoleComponent } from '../authentication/components/Roles/new-role.component';
import { SetfunctionalprofileComponent } from '../authentication/components/set-functional-profile/setfunctionalprofile.component';
import { ActivateDeactivateuserComponent } from '../authentication/components/Activate-deactivate-user/activate-deactivateuser.component';
import { ChangepasswordComponent } from '../authentication/components/changepassword/changepassword.component';
import { HierarchyComponent } from '../authentication/components/hierarchy/hierarchy.component';
import { UsermanagementComponent } from '../authentication/components/usermanagement/usermanagement.component';
import { AuditlogComponentComponent } from 'src/app/auditlog-component/auditlog-component.component';
import { AuditdocumentmasterhomeComponent } from './components/auditdocumentmasterhome/auditdocumentmasterhome.component';
import { AuditdocumenttypesgridpageComponent } from './components/auditdocumenttypesgridpage/auditdocumenttypesgridpage.component';
import { AudittemplategridpageComponent } from './components/audittemplategridpage/audittemplategridpage.component';
import { AuditworkflowgridpageComponent } from './components/auditworkflowgridpage/auditworkflowgridpage.component';
import { AuditadminhomeComponent } from '../authentication/components/auditadminhome/auditadminhome.component';
import { AuditplantgridpageComponent } from '../authentication/components/auditplantgridpage/auditplantgridpage.component';
import { AuditusermanagementgridpageComponent } from '../authentication/components/auditusermanagementgridpage/auditusermanagementgridpage.component';
import { AudithierarchyhomepageComponent } from '../authentication/components/audithierarchyhomepage/audithierarchyhomepage.component';
import { AuditdepartmentgridpageComponent } from '../authentication/components/auditdepartmentgridpage/auditdepartmentgridpage.component';
import { AuditrolegridpageComponent } from '../authentication/components/auditrolegridpage/auditrolegridpage.component';
import { AuditsetfuncprofilegridpageComponent } from '../authentication/components/auditsetfuncprofilegridpage/auditsetfuncprofilegridpage.component';
import { AuditDocumetTypeNewPageComponent } from './components/audit-documet-type-new-page/audit-documet-type-new-page.component';
import { AuditWorkflowTypeNewPageComponent } from './components/audit-workflow-type-new-page/audit-workflow-type-new-page.component';
import { AuditDepAddComponent } from '../authentication/components/audit-dep-add/audit-dep-add.component';
import { AuditRoleAddPageComponent } from '../authentication/components/audit-role-add-page/audit-role-add-page.component';
import { AuditUserMananagementAddPageComponent } from '../authentication/components/audit-user-mananagement-add-page/audit-user-mananagement-add-page.component';
import { AuditPlantAddPageComponent } from '../authentication/components/audit-plant-add-page/audit-plant-add-page.component';
import { AuditTemplateTypeNewPageComponent } from './components/audit-template-type-new-page/audit-template-type-new-page.component';
import { DocumentsIndexComponent } from '../reports/documenstindex/documentsindex.component';

const routes: Routes = [
  { path: 'documents', redirectTo: 'home', pathMatch: 'full' },
  { path: 'doc-home', redirectTo: 'document-types', pathMatch: 'full' },
  {
    path: 'home',
    component: DocumentsLandingComponent,
    canActivate: [AuthGuard],
  },
  { path: 'assigned', component: AssignedComponent, canActivate: [AuthGuard] },
  { path: 'document-master', component: DocumentMasterHomeComponent, canActivate: [AuthGuard] },
  { path: 'auditdocmaster', component: AuditdocumentmasterhomeComponent, canActivate: [AuthGuard] },
  {
    path: 'document-types', component: DocumentTypesComponent,

    canActivate: [AuthGuard],
  },
  {
    path: 'auditdocumettypes', component: AuditdocumenttypesgridpageComponent,

    canActivate: [AuthGuard],
  },
  {
    path: 'document-type/add',
    component: AddDocumentTypeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'document-type/edit/:typeId',
    component: AddDocumentTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'document-type/view/:typeName',
    component: AddDocumentTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'audittemplatesgrid',
    component: AudittemplategridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditgridaddpagetemplate',
    component: AuditTemplateTypeNewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'docindex',
    component: DocumentsIndexComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'templates/add/:count',
    component: AddTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates/edit/:templateId',
    component: AddTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates/view/:templateName',
    component: AddTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates/body/:templateName',
    component: AddTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'templates/body/prep/:templateName/:prepid',
    component: AddTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workflow',
    component: WorkflowsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditworkflowgrid',
    component: AuditworkflowgridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workflows/add/:count',
    component: AddWorkflowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workflows/edit/:workflowId',
    component: AddWorkflowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditadmin',
    component: AuditadminhomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/groups',
    component: UsergroupconfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/groups/add/:count',
    component: AddusergroupconfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/groups/edit/:groupId',
    component: AddusergroupconfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/departments',
    component: DepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'departments',
    component: DepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditadddepartment',
    component: AuditDepAddComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'auditplantadd',
    component: AuditPlantAddPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditaddrole',
    component: AuditRoleAddPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditadduserconfiguration',
    component: AuditUserMananagementAddPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditdepartments',
    component: AuditdepartmentgridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditRoles',
    component: AuditrolegridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditgridadd',
    component: AuditDocumetTypeNewPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditgridaddworkflow',
    component: AuditWorkflowTypeNewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditprofile',
    component: AuditsetfuncprofilegridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/departments/add',
    component: AddDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/departments/edit/:deptId',
    component: AddDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/roles',
    component: RolesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'role',
    component: RolesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/roles/add',
    component: AddRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/roles/edit/:deptId',
    component: AddRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/users',
    component: UserConfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userconfig',
    component: UserConfigurationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/users/add',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/users/edit/:userId',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/security',
    component: SecuritymgmtComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'securityM',
    component: SecuritymgmtComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/plant',
    component: PlantComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditplant',
    component: AuditplantgridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'plant',
    component: PlantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/plant/edit/:plantId',
    component: NewPlantRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/addplant',
    component: NewPlantRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/approval',
    component: ApprovalConfigurationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/hierarchy/profile',
    component: SetfunctionalprofileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'SetFprofile',
    component: SetfunctionalprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement/activeuser',
    component: ActivateDeactivateuserComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'activeconfig',
    component: ActivateDeactivateuserComponent,
    canActivate: [AuthGuard],
  },

  
  {
    path: 'audithierrachy',
    component: AudithierarchyhomepageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/change',
    component: ChangepasswordComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'admin/hierarchy',
    component: HierarchyComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'audithierrachy',
    component: AudithierarchyhomepageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'audithierrachy',
    component: AudithierarchyhomepageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'audithierrachy',
    component: AudithierarchyhomepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/usermanagement',
    component: UsermanagementComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditUser',
    component: AuditusermanagementgridpageComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'home/hierarchy',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/auditlog',
    component: AuditlogComponentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule { }
