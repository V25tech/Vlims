
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '../core/can-deactivate-guard.service';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';

import { HeaderModule } from '../header/header.module';import { FooterModule } from '../footer/footer.module';import { GridModule } from '@progress/kendo-angular-grid';
import { DocumentEffective } from './DocumentEffective.component';
const routes: Routes = [
  { path: '', component: DocumentEffective, canDeactivate: [CanDeactivateGuardService], pathMatch:'prefix'}
]
@NgModule({
  declarations: [
    DocumentEffective
  ],
  imports: [
    CommonModule, FormsModule, TooltipModule, ExpcomponentsModule, DialogsModule, HeaderModule,FooterModule,GridModule,
	RouterModule.forChild(routes)
  ],
  exports:[],
  schemas: [],
  providers:[]
})
export class DocumentEffectiveModule { }

