import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { AuthenticationRoutingModule } from './modules/authentication/authentication-routing.module';
import { DocumentsRoutingModule } from './modules/documents/documents-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ManagerModule } from './modules/manager/manager.module';
import { DocumentTypesComponent } from './modules/documents/components/document-types/document-types.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppintializorService, serverConfigInitializerFactory } from './shared/appintializor.service';
import { MessageService } from 'primeng/api';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PaginatorModule } from 'primeng/paginator';
import { ToastrModule } from 'ngx-toastr';
import { AuditlogComponentComponent } from './auditlog-component/auditlog-component.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [AppComponent, HeaderComponent, LeftNavComponent, AuditlogComponentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    AppRoutingModule,
    AuthenticationRoutingModule,
    DocumentsRoutingModule,
    FontAwesomeModule,
    BsDropdownModule,
    NgxSpinnerModule,
    ModalModule,
    PaginatorModule,
    NgxSummernoteModule,
    ToastrModule.forRoot(),
    CKEditorModule
  ],
  exports: [TableModule],

  providers: [BsModalService,AppintializorService, { provide: APP_INITIALIZER, useFactory: serverConfigInitializerFactory, deps: [AppintializorService], multi: true },MessageService], 
  bootstrap: [AppComponent],
})
export class AppModule {}
