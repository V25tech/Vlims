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
    path: 'effectives',
    component: EffectivesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'effectives/review',
    component: ReviewEffectiveComponent,
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
