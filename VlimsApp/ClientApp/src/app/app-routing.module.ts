import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DocumentsRoutingModule } from './modules/documents/documents-routing.module';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';
import { TrackSearchComponent } from './common/tracksearch/tracksearch.component';
import { SearchViewComponent } from './common/searchview/searchview.component';

const routes: Routes = [
  { path: '', component: AuthenticationModule },
  { path: 'documents', component: DocumentsRoutingModule },
  { path: 'manager', component: ManagerRoutingModule },
  { path: 'admin-home', component: AuthenticationModule },
  { path: 'search-results', component: TrackSearchComponent },
  { path: 'search-view', component: SearchViewComponent },
  { path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(mod => mod.ReportsModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationModule,
    DocumentsRoutingModule,
    ManagerRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
