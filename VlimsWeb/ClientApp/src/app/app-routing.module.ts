import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './UserManagement/dashboard.component';
import { LoginComponent } from './UserManagement/login';
import { ProductsComponent } from './UserManagement/products';
import { MainPageComponent } from './UserManagement/mainpage.component';
import { ProductTypeComponent } from './UserManagement/producttype';
import { ProductsView } from './UserManagement/productsview';
import { BrandComponent } from './UserManagement/brand';
import { TaxComponent } from './UserManagement/taxcenter';
import { CartsComponent } from './UserManagement/carts';
import { BillingsComponent } from './views/billings.component';
import { InvoiceComponent } from './views/invoice.component';
import { RegisterComponent } from './views/register.component';
import { ProfileComponent } from './views/profile.component';
import { AuthGuardService } from './routeGuards/auth.guard.service';

import { DocumentMasterComponent } from './document-master/document-master.component';
import { DocumentTypeComponent } from './UserManagement/doctype';
import { WorkflowConfigComponent } from './workflow-config/workflow-config.component';
import { NotificationConfigComponent } from './notification-config/notification-config.component';
import { DashboardConfigComponent } from './dashboard-config/dashboard-config.component';
import { DocumentTemplateConfigComponent } from './document-template-config/document-template-config.component';
import { DocumentTypeConfigComponent } from './document-type-config/document-type-config.component';
import { AddDocumentTypeConfigComponent } from './add-document-type-config/add-document-type-config.component';
import { DocumentmanagerComponent } from './documentmanager/documentmanager.component';
import { DocumentRequestComponent } from './document-request/document-request.component';
import { DocumentPreperationComponent } from './document-preperation/document-preperation.component';
import { DocumentEffectiveComponent } from './document-effective/document-effective.component';
import { DocumentAdditionaltasksComponent } from './document-additionaltasks/document-additionaltasks.component';
import { AddDocumentTemplateConfigComponent } from './add-document-template-config/add-document-template-config.component';
import { AddWorkflowConfigComponent } from './add-workflow-config/add-workflow-config.component';
import { HierarchymanagementComponent } from './hierarchymanagement/hierarchymanagement.component';
import { DepartmentComponent } from './department/department.component';
//import { DepartmentConfigurationComponent } from './department-configuration/department-configuration.component';
import { RolesComponent } from './roles/roles.component';
import { FunctionalProfileComponent } from './functional-profile/functional-profile.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddDocumentRequestComponent } from './add-document-request/add-document-request.component';
import { WorkitemsComponent } from './workitems/workitems.component';
import { DocumentprepAddComponent } from './documentprep-add/documentprep-add.component';
import { DocumentEffectiveEditComponent } from './document-effective-edit/document-effective-edit.component';
import { SecurityManagementComponent } from './securitymanagement/securitymanagement.component';
import { UsergroupconfigurationComponent } from './usergroupconfiguration/usergroupconfiguration.component';
import { AddUserGroupComponent } from './add-user-group/add-user-group.component';
import { AddusergroupconfigurationComponent } from './Add-usergroupconfiguration/add-usergroupconfiguration.component';
import { ApprovalConfigurationsComponent } from './Approval-Configuration/approval-configurations.component';
import { PlantComponent } from './plantmanagement/plantmanagement.component';
import { NewPlantRegistrationComponent } from './new-plant-registration/new-plant-registration.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { ActivateDeactivateuserComponent } from './activate-deactivateuser/activate-deactivateuser.component';


const routes: Routes = [
  // { path: 'dashboard', component: DashBoardComponent },
  // {path:'products',component:ProductsComponent,outlet:'mainpage'},
  {
    path: 'mainpage',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashBoardComponent,
        // component:ProductsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'tax',
        component: TaxComponent
      },
      {
        path: 'billing',
        component: BillingsComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductTypeComponent
          },
          {
            path: 'brand',
            component: BrandComponent
          },
          {
            path: 'productview',
            component: ProductsView
          },
          {
            path: 'carts',
            component: CartsComponent
          }
        ]
      },
      {
        path: 'security',
        component: SecurityManagementComponent
      },
      {
        path: 'appconfig',
        component: ApprovalConfigurationsComponent
      },
      {
        path: 'plant',
        component: PlantComponent
      },
      {
        path: 'plantnew',
        component: NewPlantRegistrationComponent
      },
      {
        path: 'documentmaster',
        component: DocumentMasterComponent,
        children: [
          {
            path: '',
            component: DocumentTypeConfigComponent
          },
          {
            path: 'doctemplate',
            component: DocumentTemplateConfigComponent
          },
          {
            path: 'workflow',
            component: WorkflowConfigComponent
          },
          {
            path: 'notification',
            component: NotificationConfigComponent
          },
          {
            path: 'dashboard',
            component: DashboardConfigComponent
          },
          {
            path: 'doctype',
            component: DocumentTypeConfigComponent
          },
          {
            path: 'adddoctype',
            component: AddDocumentTypeConfigComponent
          },
          {
            path: 'editdoctype',
            component: AddDocumentTypeConfigComponent
          },
          {
            path: 'viewdoctype',
            component: AddDocumentTypeConfigComponent
          },
          {
            path: 'adddoctemplate',
            component: AddDocumentTemplateConfigComponent
          },
          {
            path: 'addworkflow',
            component: AddWorkflowConfigComponent
          },
          {
            path: 'editdoctemplate',
            component: AddDocumentTemplateConfigComponent
          },
          {
            path: 'viewdoctemplate',
            component: AddDocumentTemplateConfigComponent
          },
          {
            path: 'editworkflow',
            component: AddWorkflowConfigComponent
          },
          {
            path: 'viewworkflow',
            component: AddWorkflowConfigComponent
          }
        ]
      },
      {
        path: 'documentmanager',
        component: DocumentmanagerComponent,
        children: [
          {
            path: '',
            component: DocumentRequestComponent
          },
          {
            path: 'documreq',
            component: DocumentRequestComponent
          },
          {
            path: 'documprep',
            component: DocumentPreperationComponent
          },
          {
            path: 'documenprepadd',
            component: DocumentprepAddComponent
          },
          {
            path: 'viewdocprep',
            component: DocumentprepAddComponent
          },
          {
            path: 'editdocprep',
            component: DocumentprepAddComponent
          },
          {
            path: 'documeffect',
            component: DocumentEffectiveComponent
          },
          {
            path: 'documeffectedit',
            component: DocumentEffectiveEditComponent
          },
          {
            path: 'additasks',
            component: DocumentAdditionaltasksComponent
          },
          {
            path: 'adddocrequest',
            component: AddDocumentRequestComponent
          },          
          {
            path: 'viewdocrequest',
            component: AddDocumentRequestComponent
          },
          {
            path: 'viewdocreq',
            component: AddDocumentRequestComponent
          },
          {
            path: 'editdocreq',
            component: AddDocumentRequestComponent
          },
          {
            path: 'preview',
            component: PdfViewerComponent
          },
        ]
      },
      {
        path: 'workitems',
        component: WorkitemsComponent,
        children: [
          {
            path: '',
            component: WorkitemsComponent
          }
        ]
      },
      {
        path: 'hierarchy',
        component: HierarchymanagementComponent,
        children: [
          {
            path: '',
            component: DepartmentComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'functional',
            component: FunctionalProfileComponent
          },
          {
            path: 'department',
            component: DepartmentComponent
          },
          {
            path: 'adddept',
            component: AddDepartmentComponent
          },
          {
            path: 'addrole',
            component: AddRolesComponent
          }
        ]
      }
      , {
        path: 'users',
        component: UserManagementComponent,
        children: [
          {
            path: '',
            component: UserConfigurationComponent
          },
          {
            path: 'users',
            component: UserConfigurationComponent
          },
          {
            path: 'adduser',
            component: AddUserComponent
          },
          {
            path: 'usergrp',
            component: UsergroupconfigurationComponent
          },
          {
            path: 'addusergroup',
            component: AddusergroupconfigurationComponent
          },
          {
            path: 'activeuser',
            component: ActivateDeactivateuserComponent
          }
          
        ]
      }
    ]
  },
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
