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
import { DocumentPrintComponent } from './components/Print/document-print.component';
import { NewPrintRequestComponent } from './components/Print/new-print-request.component';
import { ExistingDocumentRequestComponent } from './components/existing-document-request/existing-document-request.component';
import { ReviewExistingDocumentRequestComponent } from './components/review-existing-document-request/review-existing-document-request.component';
import { DocumentRevisonRequestsComponent } from './components/document-revision/document-revision.component';

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
})
export class ManagerModule { }
