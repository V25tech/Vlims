import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpcomponentsModule } from '../common/expcomponents.module';
import { HeaderComponent } from './header.component';
import { GridModule } from '@progress/kendo-angular-grid';import { ClickOutsideModule } from 'ng-click-outside';import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({ 
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule, FormsModule, RouterModule, ExpcomponentsModule, GridModule,ClickOutsideModule,DropDownsModule,
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }