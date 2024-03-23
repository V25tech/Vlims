import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { ReportsDashboardComponent } from './reportsdashboard/reportsdashboard.component';
import { DocumentsIndexComponent } from './documenstindex/documentsindex.component';
import { DocumentsTypeComponent } from './documenttypeindex/documenttypeindex.component';
import { DocumentsIndexService } from './services/documentsindex.service';
import { DocumentPrintIndexService } from './services/documentprintindex.service';
import { DocumentsTypeIndexService } from './services/documenttypeindex.service';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [ReportsDashboardComponent, DocumentsIndexComponent, DocumentsTypeComponent],
  imports: [ReportsRoutingModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,],
  providers: [DocumentsIndexService, DocumentPrintIndexService, DocumentsTypeIndexService]
})

export class ReportsModule {

}
