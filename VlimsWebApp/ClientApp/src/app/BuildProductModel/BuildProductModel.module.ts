
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '../core/can-deactivate-guard.service';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { BuildProductModelComponent } from './BuildProductModel.component';
import { HeaderModule } from '../header/header.module';import { FooterModule } from '../footer/footer.module';import { GridModule } from '@progress/kendo-angular-grid';import { ClickOutsideModule } from 'ng-click-outside';import { DropDownsModule } from '@progress/kendo-angular-dropdowns';    
const routes: Routes = [  
       {path:'', component:BuildProductModelComponent, canDeactivate: [CanDeactivateGuardService], pathMatch:'prefix'}    
]
@NgModule({
  declarations: [
  BuildProductModelComponent 
  ],
  imports: [
    CommonModule, FormsModule, TooltipModule, ExpcomponentsModule, DialogsModule, HeaderModule,FooterModule,GridModule,ClickOutsideModule,DropDownsModule,
	RouterModule.forChild(routes)  
  ],
  exports:[],
  schemas: [],
  providers:[]
})
export class BuildProductModelModule { }

