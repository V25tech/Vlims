import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { CheckboxlistComponent } from "./checkboxlist/checkboxlist.component";
import { RadiobuttonlistComponent } from "./radiobutton/radiobutton.component";
import { LeftnavigationComponent } from "./leftnavigation/leftnavigation.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SwitchComponent } from "./switch/switch.component";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { TabComponent } from "./tab/tab.component";
import { ExpmentDirective } from "./expment.directive";
import { FilterPipe } from './filter.pipe';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {
  DropDownsModule,
  AutoCompleteModule
} from "@progress/kendo-angular-dropdowns";
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { OrderByPipe } from './orderby.pipe';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SectionComponent } from './section/section.component';
import { CardComponent } from './card/card.component';
import { PanelComponent } from './panel/Panel.component';
import { SubtopnavigationComponent } from './subtopnavigation/subtopnavigation.component';
import { StickyNavigationDirective } from './stickyHeader.directive';
import { MultiselectdropdownDirective } from './multi-select-dropdown/multiselectdropdown.directive';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { ClickOutSideDirective } from './click-out-side.directive';
import { QuotecomparisonComponent } from './quotecomparison/quotecomparison.component';
import { QuotecomparisonCardComponent } from './quotecomparison/quotecomparison-card/quotecomparison-card.component';
import { TilesComponent } from "./tiles/tiles.component";
import { BannercarouselComponent } from "./bannercarousel/bannercarousel.component";
import { MessagelistComponent } from "./messagelist/messagelist.component";
import { PricingComponent } from "./pricing/pricing.component";
import { MarqueeComponent } from "./marquee/marquee.component";
import { DealwalldatepipePipe } from "./dealwalldatepipe.pipe";
import { FiltermenuComponent } from "./filtermenu/filtermenu.component";
import { FormsComponent } from './forms/forms.component';
import { FormriskfiltersComponent } from './formriskfilters/formriskfilters.component';
import { CoverageGridComponent } from './coverage-with-filters/coverage-grid/coveragegrid.component'
import { RiskFilterComponent } from './coverage-with-filters/risk-dropdown-filter/riskdropdownfilter.component';
import { RiskHirarchyfilterComponent } from './coverage-with-filters/coverage-hirarchy-filter/coveragehirarchyfilter.component';
import { CoverageWithFiltersComponent } from './coverage-with-filters/coveragewithfilters.component';
import { DealwallComponent } from "./dealwall/dealwall.component";
import { DealwallViewEventComponent } from './dealwall/dealwall-view-event/dealwall-view-event.component';
import { DealwallViewAttachmentComponent } from './dealwall/dealwall-view-attachment/dealwall-view-attachment.component';
import { DealwallViewNoteComponent } from './dealwall/dealwall-view-note/dealwall-view-note.component';
import { DealwallAddAttachmentComponent } from './dealwall/dealwall-add-attachment/dealwall-add-attachment.component';
import { DealwallAddNoteComponent } from './dealwall/dealwall-add-note/dealwall-add-note.component';
import { ReferralreasonsComponent } from "./referralreasons/referralreasons.component";
import { ReferralreasonComponent } from './referralreasons/referralreason/referralreason.component';
import { CoverageDataBusService } from './coverage-with-filters/coverage-services/coveragedatabus.service';
import { RisksDataBusService } from './coverage-with-filters/coverage-services/risksdatabus.service';
import { CoverageComponent } from './coverage/coverage.component';
import { CustomControlValidatorDirective } from './coverage/customControlReqValid.directive';
import { OffcanvasmenuComponent } from './offcanvasmenu/offcanvasmenu.component';
import { PlanoptionsComponent } from './planoptions/planoptions.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { NavPillsComponent } from './nav-pills/nav-pills.component';
import { PopupModule } from "@progress/kendo-angular-popup";
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { DropdownTreeviewComponent } from './dropdown-treeview/dropdown-treeview.component';

@NgModule({
  declarations: [
    CheckboxlistComponent,
    RadiobuttonlistComponent,
    LeftnavigationComponent,
    NavigationComponent,
    SwitchComponent,
    TabComponent,
    FilterPipe,
    ExpmentDirective,
    OrderByPipe,
    OrderByPipe,
    PanelComponent,
    SectionComponent,
    SubtopnavigationComponent,
    StickyNavigationDirective,
    MultiSelectDropdownComponent,
    MultiselectdropdownDirective,
    ClickOutSideDirective,
    CardComponent,
    QuotecomparisonComponent,
    QuotecomparisonCardComponent,
    TilesComponent,
    BannercarouselComponent,
    MessagelistComponent,
    PricingComponent,
    ReferralreasonsComponent,
    ReferralreasonComponent,
    MarqueeComponent,
    DealwallComponent,
    DealwalldatepipePipe,
    DealwallAddNoteComponent,
    DealwallAddAttachmentComponent,
    DealwallViewNoteComponent,
    DealwallViewAttachmentComponent,
    DealwallViewEventComponent,
    FiltermenuComponent,
    CoverageGridComponent,
    RiskFilterComponent,
    RiskHirarchyfilterComponent,
    CoverageWithFiltersComponent,
    FormsComponent,
    FormriskfiltersComponent,
    CoverageComponent,
    CustomControlValidatorDirective,
    OffcanvasmenuComponent,
    PlanoptionsComponent,
    DropdownButtonComponent,
    NavPillsComponent,
    DropdownTreeviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ScrollViewModule,
    DialogsModule,
    DropDownsModule,
    InputsModule,
    DatePickerModule,
    GridModule,
    ButtonsModule,
    TooltipModule,
    PopupModule,
    TreeViewModule
  ],
  exports: [
    ExpmentDirective,
    CheckboxlistComponent,
    RadiobuttonlistComponent,
    LeftnavigationComponent,
    NavigationComponent,
    SwitchComponent,
    TabComponent,
    SectionComponent,
    PanelComponent,
    SubtopnavigationComponent,
    MultiselectdropdownDirective,
    MultiSelectDropdownComponent,
    ClickOutSideDirective,
    CardComponent,
    QuotecomparisonComponent,
    QuotecomparisonCardComponent,
    MessagelistComponent,
    PricingComponent,
    ReferralreasonsComponent,
    FiltermenuComponent,
    TilesComponent,
    DealwallComponent,
    BannercarouselComponent,
    MarqueeComponent,
    FormsComponent,
    CoverageWithFiltersComponent,
    CoverageComponent,
    CustomControlValidatorDirective,
    OffcanvasmenuComponent,
    PlanoptionsComponent,
    DropdownButtonComponent,
    NavPillsComponent,
    FilterPipe,
    DropdownTreeviewComponent
  ],
  providers: [CoverageDataBusService, RisksDataBusService]
})
export class ExpcomponentsModule { }
