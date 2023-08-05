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

const routes: Routes = [
  { path: 'manager', redirectTo: 'document-manager', pathMatch: 'full' },

  { path: 'document-manager', component: DocumentManagerHomeComponent, canActivate: [AuthGuard] },
  {
    path: 'requests',
    component: RequestsComponent,
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
    path: 'requests/view/workId/:requestId/:workId',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparations',
    component: PreparationComponent,
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
    path: 'effectives/view/:id',
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
  }, {
    path: 'existingdoc',
    component: ExistingDocumentRequestComponent,
  },
  {
    path: 'existingdoc/add',
    component: ReviewExistingDocumentRequestComponent
  },
  {
    path: 'existingdoc/edit/:id',
    component: ReviewExistingDocumentRequestComponent
  },
  {
    path: 'revision',
    component: DocumentRevisionRequestsComponent
  },
  {
    path: 'revision/edit/:id',
    component: ReviewRevisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
