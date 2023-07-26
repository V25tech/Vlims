import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './UserManagement/mainpage.component';
import { HelloComponent } from './hello.component';
import { DashBoardComponent } from './UserManagement/dashboard.component';
import { LoginComponent } from './UserManagement/login';
import { ProductTypeComponent } from './UserManagement/producttype';
import { ProductsView } from './UserManagement/productsview';
import { BrandComponent } from './UserManagement/brand';
import { TaxComponent } from './UserManagement/taxcenter';

import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './UserManagement/products';
import { MatTableModule } from "@angular/material";
import { MatPaginatorModule } from '@angular/material/paginator';
//import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrModule } from 'ngx-toastr';
import { PopupshowDirective } from './shared/popupshow.directive';
import { CartsComponent } from './UserManagement/carts';
import { BillingsComponent } from './views/billings.component';
import { InvoiceComponent } from './views/invoice.component';
import { AppintializorService, serverConfigInitializerFactory } from './shared/appintializor.service';
import { RegisterComponent } from './views/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './views/profile.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SidebarDirective } from './directives/sidebar.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchPipe } from './pipes/search.pipe';
import { TabsDirective } from './directives/tabs.directive';
import { InrPipe } from './pipes/inr.pipe';

import { DocumentTypeConfigComponent } from './document-type-config/document-type-config.component';
import { DocumentTemplateConfigComponent } from './document-template-config/document-template-config.component';
import { WorkflowConfigComponent } from './workflow-config/workflow-config.component';
import { NotificationConfigComponent } from './notification-config/notification-config.component';
import { DashboardConfigComponent } from './dashboard-config/dashboard-config.component';
import { DocumentMasterComponent } from './document-master/document-master.component';
import { AddDocumentTypeConfigComponent } from './add-document-type-config/add-document-type-config.component';
import { AddDocumentTemplateConfigComponent } from './add-document-template-config/add-document-template-config.component';
import { AddWorkflowConfigComponent } from './add-workflow-config/add-workflow-config.component';
import { AddNotificationConfigComponent } from './add-notification-config/add-notification-config.component';
import { AddDashboardConfigComponent } from './add-dashboard-config/add-dashboard-config.component';
import { DocumentmanagerComponent } from './documentmanager/documentmanager.component';
import { DocumentRequestComponent } from './document-request/document-request.component';
import { DocumentPreperationComponent } from './document-preperation/document-preperation.component';
import { DocumentEffectiveComponent } from './document-effective/document-effective.component';
import { DocumentAdditionaltasksComponent } from './document-additionaltasks/document-additionaltasks.component';
import { AddDocumentRequestComponent } from './add-document-request/add-document-request.component';
// import { AddDocumentPreperationComponent } from './add-document-preperation/add-document-preperation.component';
// import { AddDocumentEffectiveComponent } from './add-document-effective/add-document-effective.component';
// import { AddAdditionaltasksComponent } from './add-additionaltasks/add-additionaltasks.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { RolesComponent } from './roles/roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { AddUserComponent } from './add-user/add-user.component';
//import { AddUserGroupComponent } from './add-user-group/add-user-group.component';
//import { DepartmentConfigurationComponent } from './department-configuration/department-configuration.component';
import { HierarchymanagementComponent } from './hierarchymanagement/hierarchymanagement.component';
import { FunctionalProfileComponent } from './functional-profile/functional-profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { WorkitemsComponent } from './workitems/workitems.component';
import { DocumentprepAddComponent } from './documentprep-add/documentprep-add.component';
import { DocumentEffectiveEditComponent } from './document-effective-edit/document-effective-edit.component';
import { PlantComponent } from './plantmanagement/plantmanagement.component';
import { SecurityManagementComponent } from './securitymanagement/securitymanagement.component';
import { UsergroupconfigurationComponent } from './usergroupconfiguration/usergroupconfiguration.component';
import { AddusergroupconfigurationComponent } from './Add-usergroupconfiguration/add-usergroupconfiguration.component';
import { ApprovalConfigurationsComponent } from './Approval-Configuration/approval-configurations.component';
import { NewPlantRegistrationComponent } from './new-plant-registration/new-plant-registration.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { BlobUrlPipe } from './blob-url.pipe';
import { ActivateDeactivateuserComponent } from './activate-deactivateuser/activate-deactivateuser.component';
import { DocumentRevisonComponent } from './document-revison/document-revison.component';






@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule, NgxPaginationModule, HttpClientModule, ToastrModule.forRoot({
    timeOut: 1500,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  })],
  declarations: [AppComponent, HelloComponent, DashBoardComponent, LoginComponent, ProductsComponent, MainPageComponent, ProductTypeComponent,
    ProductsView, BrandComponent, TaxComponent, PopupshowDirective, CartsComponent, DocumentMasterComponent, DocumentTypeConfigComponent,
    DocumentTemplateConfigComponent, WorkflowConfigComponent, NotificationConfigComponent, DashboardConfigComponent,
    BillingsComponent, InvoiceComponent, RegisterComponent, ProfileComponent, FilterPipe,
    SidebarDirective, SpinnerComponent, SearchPipe, SearchPipe, TabsDirective, InrPipe,
    AddDocumentTypeConfigComponent, AddDocumentTemplateConfigComponent, AddWorkflowConfigComponent,
    AddNotificationConfigComponent, AddDashboardConfigComponent, DocumentmanagerComponent, DocumentRequestComponent,
    DocumentPreperationComponent, DocumentEffectiveComponent, DocumentAdditionaltasksComponent,
    AddDocumentRequestComponent, DepartmentComponent, UserConfigurationComponent, AddUserComponent,
    UsergroupconfigurationComponent, RolesComponent, AddRolesComponent, AddDepartmentComponent, HierarchymanagementComponent, FunctionalProfileComponent, UserManagementComponent, WorkitemsComponent, DocumentprepAddComponent, PlantComponent, DocumentEffectiveEditComponent, SecurityManagementComponent, UsergroupconfigurationComponent, AddusergroupconfigurationComponent, ApprovalConfigurationsComponent, NewPlantRegistrationComponent, PdfViewerComponent, BlobUrlPipe, ActivateDeactivateuserComponent, DocumentRevisonComponent],
  providers: [AppintializorService, { provide: APP_INITIALIZER, useFactory: serverConfigInitializerFactory, deps: [AppintializorService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
