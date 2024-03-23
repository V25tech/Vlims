import { NgModule } from '@angular/core';
import { ReportsDashboardComponent } from './reportsdashboard/reportsdashboard.component';
import { DocumentsIndexComponent } from './documenstindex/documentsindex.component';
import { DocumentsTypeComponent } from './documenttypeindex/documenttypeindex.component';
import { DocumentsIndexService } from './services/documentsindex.service';
import { DocumentPrintIndexService } from './services/documentprintindex.service';
import { DocumentsTypeIndexService } from './services/documenttypeindex.service';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [ReportsDashboardComponent, DocumentsIndexComponent, DocumentsTypeComponent],
  imports: [ReportsRoutingModule],
  providers: [DocumentsIndexService, DocumentPrintIndexService, DocumentsTypeIndexService]
})

export class ReportsModule {

}
