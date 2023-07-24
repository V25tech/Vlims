import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DocumentsRoutingModule } from './modules/documents/documents-routing.module';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';

const routes: Routes = [
  { path: '', component: AuthenticationModule },
  { path: 'documents', component: DocumentsRoutingModule },
  { path: 'manager', component: ManagerRoutingModule },
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
