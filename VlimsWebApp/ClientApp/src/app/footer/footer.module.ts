import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { FooterComponent } from './footer.component';
import { GridModule } from '@progress/kendo-angular-grid';import { ClickOutsideModule } from 'ng-click-outside';import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({ 
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule, FormsModule, RouterModule, ExpcomponentsModule, GridModule,ClickOutsideModule,DropDownsModule,
  ],
  exports:[FooterComponent]
})
export class FooterModule { }