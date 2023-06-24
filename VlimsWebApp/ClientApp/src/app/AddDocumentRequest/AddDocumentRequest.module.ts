
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '../core/can-deactivate-guard.service';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AddDocumentRequestComponent } from './AddDocumentRequest.component';
import { HeaderModule } from '../header/header.module';import { FooterModule } from '../footer/footer.module';import { UploadModule } from '@progress/kendo-angular-upload';    
const routes: Routes = [  
       {path:'', component:AddDocumentRequestComponent, canDeactivate: [CanDeactivateGuardService], pathMatch:'prefix'}    
]
@NgModule({
  declarations: [
  AddDocumentRequestComponent 
  ],
  imports: [
    CommonModule, FormsModule, TooltipModule, ExpcomponentsModule, DialogsModule, HeaderModule,FooterModule,UploadModule,
	RouterModule.forChild(routes)  
  ],
  exports:[],
  schemas: [],
  providers:[]
})
export class AddDocumentRequestModule { }

