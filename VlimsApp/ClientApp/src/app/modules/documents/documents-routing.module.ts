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
  {
    path: 'document-types',    component: DocumentTypesComponent,

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
    path: 'workflow',
    component: WorkflowsComponent,
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
    children :[
      {
          path:'',
          component:AdminHomeComponent,
      },
      // {
      //   path:'security',
      //   component:SecuritymgmtComponent,
      // }
    ]
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },


  // {
  //   path: 'admin/security',
  //   component: SecuritymgmtComponent,
  //   children :[
  //     {
  //         path:'',
  //         //component:null,
  //     }
  //   ]
  // },
  // {
  //   path: 'admin/plant',
  //   //component: PlantComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'roles',
  //   component: RolesComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'UserGroup',
  //   component: Usergroupconfiguration,
  //   canActivate: [AuthGuard],
  // },
  //{
  //  path: 'department',
  //  component: DepartmentComponent,
  //  canActivate: [AuthGuard],
  //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
