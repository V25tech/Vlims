import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [AppComponent, HeaderComponent, LeftNavComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DocumentsModule,
    TableModule,
    AppRoutingModule,
    AuthenticationRoutingModule,
    DocumentsRoutingModule,
    FontAwesomeModule,
    BsDropdownModule,
  ],
  exports: [TableModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
