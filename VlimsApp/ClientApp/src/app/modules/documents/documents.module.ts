import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsLandingComponent } from './components/documents-landing/documents-landing.component';
import { AssignedComponent } from './components/assigned/assigned.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentTypesComponent } from './components/document-types/document-types.component';
import { AddDocumentTypeComponent } from './components/add-document-type/add-document-type.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { AddTemplateComponent } from './components/add-template/add-template.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { DocumentMasterHomeComponent } from './components/document-master-home/document-master-home.component';
import { AppintializorService, serverConfigInitializerFactory } from 'src/app/shared/appintializor.service';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    DocumentsLandingComponent,
    AssignedComponent,
    DocumentTypesComponent,
    AddDocumentTypeComponent,
    TemplatesComponent,
    AddTemplateComponent,
    WorkflowsComponent,
    AddWorkflowComponent,
    DocumentMasterHomeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    DocumentsRoutingModule,
    FontAwesomeModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    NgxSpinnerModule
  ],
  providers: [] 
})
export class DocumentsModule { }
