import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDashboardComponent } from './reportsdashboard/reportsdashboard.component';
import { DocumentsIndexComponent } from './documenstindex/documentsindex.component';
import { DocumentPrintIndexComponent } from './documentprintindex/documentprintindex.component';
import { DocumentsTypeComponent } from './documenttypeindex/documenttypeindex.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ReportsDashboardComponent, },
  { path: 'doctypeindex', component: DocumentsTypeComponent },
  { path: 'docindex', component: DocumentsIndexComponent },
  { path: 'docprintindex', component: DocumentPrintIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
