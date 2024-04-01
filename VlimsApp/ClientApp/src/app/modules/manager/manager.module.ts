import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagerRoutingModule } from './manager-routing.module';
import { RequestsComponent } from './components/requests/requests.component';
import { NgModule } from '@angular/core';
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
import { ExistingDocumentsService } from './services/existing-documents.service';
import { ExistingDocumentsComponent } from './components/existing-documents/existing-documents.component';
import { AuditmanagerhomepageComponent } from './components/auditmanagerhomepage/auditmanagerhomepage.component';
import { AuditrequestgridpageComponent } from './components/auditrequestgridpage/auditrequestgridpage.component';
import { AuditpreparationgridpageComponent } from './components/auditpreparationgridpage/auditpreparationgridpage.component';
import { AuditeffectivegridpageComponent } from './components/auditeffectivegridpage/auditeffectivegridpage.component';
import { AuditrevisiongridpageComponent } from './components/auditrevisiongridpage/auditrevisiongridpage.component';
import { AuditprintgridpageComponent } from './components/auditprintgridpage/auditprintgridpage.component';
import { AuditexistinggridpageComponent } from './components/auditexistinggridpage/auditexistinggridpage.component';
import { AuditRequestNewPageComponent } from './components/audit-request-new-page/audit-request-new-page.component';
import { AuditPreparationNewPageComponent } from './components/audit-preparation-new-page/audit-preparation-new-page.component';
import { AuditEffectiveNewPageComponent } from './components/audit-effective-new-page/audit-effective-new-page.component';
import { AuditprintgridpagewComponent } from './components/auditprintgridpagew/auditprintgridpagew.component';
import { AuditPrintNewPageComponent } from './components/audit-print-new-page/audit-print-new-page.component';

@NgModule({
  declarations: [
    RequestsComponent,
    AddRequestComponent,
    PreparationComponent,
    ReviewPrepationComponent,
    EffectivesComponent,
    ReviewEffectiveComponent,
    DocumentManagerHomeComponent,
    DocumentPrintComponent,
    NewPrintRequestComponent,
    ExistingDocumentRequestComponent,
    ReviewExistingDocumentRequestComponent,
    DocumentRevisionRequestsComponent,
    ReviewRevisionComponent,
    ExistingDocumentsComponent,
    AuditmanagerhomepageComponent,
    AuditrequestgridpageComponent,
    AuditpreparationgridpageComponent,
    AuditeffectivegridpageComponent,
    AuditrevisiongridpageComponent,
    AuditprintgridpageComponent,
    AuditexistinggridpageComponent,
    AuditRequestNewPageComponent,
    AuditPreparationNewPageComponent,
    AuditEffectiveNewPageComponent,
    AuditprintgridpagewComponent,
    AuditPrintNewPageComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [ExistingDocumentsService]
})
export class ManagerModule { }
