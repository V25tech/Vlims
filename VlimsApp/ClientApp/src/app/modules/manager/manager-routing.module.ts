import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { RequestsComponent } from './components/requests/requests.component';
import { AddRequestComponent } from './components/add-request/add-request.component';
import { PreparationComponent } from './components/preparation/preparation.component';
import { ReviewPrepationComponent } from './components/review-prepation/review-prepation.component';
import { EffectivesComponent } from './components/effectives/effectives.component';
import { ReviewEffectiveComponent } from './components/review-effective/review-effective.component';
import { DocumentManagerHomeComponent } from './components/document-manager-home/document-manager-home.component';
import { DocumentPrintComponent } from './components/print/document-print.component';
import { ExistingDocumentRequestComponent } from './components/existing-document-request/existing-document-request.component';
import { ReviewExistingDocumentRequestComponent } from './components/review-existing-document-request/review-existing-document-request.component';
import { DocumentRevisionRequestsComponent } from './components/document-revision/document-revision.component';
import { NewPrintRequestComponent } from './components/review-print/new-print-request.component';
import { ReviewRevisionComponent } from './components/review-revision/review-revision.component';
import { ExistingDocumentsComponent } from './components/existing-documents/existing-documents.component';
import { AuditmanagerhomepageComponent } from './components/auditmanagerhomepage/auditmanagerhomepage.component';
import { AuditrequestgridpageComponent } from './components/auditrequestgridpage/auditrequestgridpage.component';
import { AuditpreparationgridpageComponent } from './components/auditpreparationgridpage/auditpreparationgridpage.component';
import { AuditeffectivegridpageComponent } from './components/auditeffectivegridpage/auditeffectivegridpage.component';
import { AuditrevisiongridpageComponent } from './components/auditrevisiongridpage/auditrevisiongridpage.component';
import { AuditprintgridpageComponent } from './components/auditprintgridpage/auditprintgridpage.component';
import { AuditexistinggridpageComponent } from './components/auditexistinggridpage/auditexistinggridpage.component';
import { AuditRoleAddPageComponent } from '../authentication/components/audit-role-add-page/audit-role-add-page.component';
import { FunctionalProfileAddPageComponent } from '../authentication/components/functional-profile-add-page/functional-profile-add-page.component';
import { AuditRequestNewPageComponent } from './components/audit-request-new-page/audit-request-new-page.component';
import { AuditPreparationNewPageComponent } from './components/audit-preparation-new-page/audit-preparation-new-page.component';
import { AuditEffectiveNewPageComponent } from './components/audit-effective-new-page/audit-effective-new-page.component';
import { AuditprintgridpagewComponent } from './components/auditprintgridpagew/auditprintgridpagew.component';
import { AuditPrintNewPageComponent } from './components/audit-print-new-page/audit-print-new-page.component';

const routes: Routes = [
  { path: 'manager', redirectTo: 'document-manager', pathMatch: 'full' },

  { path: 'document-manager', component: DocumentManagerHomeComponent, canActivate: [AuthGuard] },
  { path: 'auditmanager', component: AuditmanagerhomepageComponent, canActivate: [AuthGuard] },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditrequests',
    component: AuditrequestgridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests/add',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests/edit',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests/view/:requestId',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests/view/:requestId/:workId/:type',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparations',
    component: PreparationComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditeffectiveaddpage',
    component: AuditEffectiveNewPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditpreparations',
    component: AuditpreparationgridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditprint',
    component: AuditprintgridpagewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditprinttaddpage',
    component: AuditPrintNewPageComponent,
    canActivate: [AuthGuard],
  },


  {
    path: 'auditroleaddpage',
    component: AuditRoleAddPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditrequestaddpage',
    component: AuditRequestNewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditpreparationaddpage',
    component: AuditPreparationNewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditadddfunctionalprofile',
    component: FunctionalProfileAddPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditeffectives',
    component: AuditeffectivegridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditdocumentrevision',
    component: AuditrevisiongridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditdocumentprint',
    component: AuditprintgridpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auditexistingdocumentrequests',
    component: AuditexistinggridpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparation/review',
    component: ReviewPrepationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparation/view/:id',
    component: ReviewPrepationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparation/view/:requestId/:workId/:type',
    component: ReviewPrepationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'effectives',
    component: EffectivesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'effectives/review',
    component: ReviewEffectiveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'effectives/view/:requestId/:workId/:type',
    component: ReviewEffectiveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'effectives/view/:requestId/:workId/:type',
    component: ReviewEffectiveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print',
    component: DocumentPrintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print/add',
    component: NewPrintRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print/edit',
    component: NewPrintRequestComponent,
    canActivate: [AuthGuard],
  }, 
  {
    path: 'print/view/:requestId/:workId/:type',
    component: NewPrintRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'existingdoc',
    component: ExistingDocumentRequestComponent,
  },
  {
    path: 'existingdoc/add',
    component: ReviewExistingDocumentRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'existingdoc/edit/:id',
    component: ReviewExistingDocumentRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revision',
    component: DocumentRevisionRequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revision/edit/:id',
    component: ReviewRevisionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revision/view/:requestId/:workId/:type',
    component: ReviewRevisionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'existingdocuments',
    component: ExistingDocumentsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
