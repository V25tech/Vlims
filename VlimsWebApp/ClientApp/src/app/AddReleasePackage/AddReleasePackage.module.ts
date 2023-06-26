
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '../core/can-deactivate-guard.service';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AddReleasePackageComponent } from './AddReleasePackage.component';
import { HeaderModule } from '../header/header.module';import { FooterModule } from '../footer/footer.module';import { DropDownsModule } from '@progress/kendo-angular-dropdowns';import { GridModule } from '@progress/kendo-angular-grid';import { ClickOutsideModule } from 'ng-click-outside';import { DateInputsModule,DatePickerModule } from '@progress/kendo-angular-dateinputs';    
const routes: Routes = [  
       {path:'', component:AddReleasePackageComponent, canDeactivate: [CanDeactivateGuardService], pathMatch:'prefix'}    
]
@NgModule({
  declarations: [
  AddReleasePackageComponent 
  ],
  imports: [
    CommonModule, FormsModule, TooltipModule, ExpcomponentsModule, DialogsModule, HeaderModule,FooterModule,DropDownsModule,GridModule,ClickOutsideModule,DateInputsModule,DatePickerModule,
	RouterModule.forChild(routes)  
  ],
  exports:[],
  schemas: [],
  providers:[]
})
export class AddReleasePackageModule { }

