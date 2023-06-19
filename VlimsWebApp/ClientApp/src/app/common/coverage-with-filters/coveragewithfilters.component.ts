import { Component, OnInit, ViewChild, Input, forwardRef } from '@angular/core';
import { CoverageGridComponent } from './coverage-grid/coveragegrid.component';
import { Subscription } from 'rxjs';
import { RiskFilterComponent } from './risk-dropdown-filter/riskdropdownfilter.component';
import { CoverageHirarchyfilterService } from './coverage-services/coveragehirarchyfilter.service';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { ControlValueAccessor, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'coverage-with-filter',
  templateUrl: './coverageWithFilters.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoverageWithFiltersComponent),
      multi: true,
    },
  ],
})
export class CoverageWithFiltersComponent implements OnInit, ControlValueAccessor {
  @Input('mode') editMode: boolean;
  @Input('decimal') Decimal: number;
  @Input('currency') Currency: number;
  @Input('risksURL') risksURL: string;
  @Input('coverageURL') coverageURL: string;
  @Input('interactiveURL') interactiveConfigurationURL: string;
  @Input('saveURL') saveCoveragesURL: string;
  @Input('headers') headers: any;
  @Input("elementRef") control: NgControl;
  @ViewChild(RiskFilterComponent, null) RiskFilterInstance: RiskFilterComponent;
  @ViewChild(CoverageGridComponent, null) coverageComponentInstance: CoverageGridComponent;
  onChange: any = () => { };
  onTouched: any = () => { };
  Subscription: Subscription = new Subscription();
  coveragesFilter: any[] = [];
  filterdescriptions: string;
  activatedFilter: string;
  ISolverMessages: any[];
  dangerMessages: any[];
  warningMessages: any[];
  renderMessage: string = "Loading.....";
  expandInresponsive: boolean = false;
  constructor(
    private coverageHirachyservice: CoverageHirarchyfilterService,
    public us: UtilityService,
    private http: HttpClient
  ) {
  }

  writeValue(obj: any): void {
    // if (obj) {
    //   this.cbValue = obj;
    // }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit() {
    // this.getRisk();
  }
  getRisk() {
    // try {
    //   this.Subscription.add(this.http.get(this.risksURL, { headers: this.headers }).subscribe((response: any) => {
    //     let index = 0;
    //     this.coveragesFilter = this.coverageHirachyservice.getHierarchy(response);
    //     this.coveragesFilter.forEach((ele) => {
    //       ele.IsActive = false;
    //       ele.index = index++;
    //       let riskInstances = [];
    //       this.coverageHirachyservice.GetRiskDatasource(ele.Type).forEach(item => {
    //         riskInstances.push(item)
    //       });
    //       ele.riskInstances = riskInstances;
    //       ele.filterdata.forEach((y) => {
    //         y.value = '';
    //         y.defaultItem = {
    //           Id: null,
    //           DisplayName: "Please select " + y.Type
    //         }
    //       }
    //       )
    //     });
    //   }, (error: any) => {
    //     this.us.Show("Something went wrong", "error");
    //     this.renderMessage = "Something went wrong";
    //   }));
    // } catch (ex) {
    //   this.us.Show("Something went wrong - " + ex, "error");
    //   this.renderMessage = "Something went wrong";
    // }
  }
  // activatefilter(activatedFilterObject: { filterby: string; index: string | number; }) {
  //   this.clearCovMessages();
  //   this.filterdescriptions = activatedFilterObject.filterby;
  //   this.activatedFilter = activatedFilterObject.filterby;
  //   this.coveragesFilter.forEach((obj: { IsActive: boolean; }) => {
  //     obj.IsActive = false;
  //   })
  //   this.coveragesFilter[activatedFilterObject.index].IsActive = true;

  // }
  // filterchange(filteredObject: { filterby: string; }) {
  //   this.expandInresponsive = !this.expandInresponsive;
  //   this.clearCovMessages();
  //   this.filterdescriptions = filteredObject.filterby;
  // }
  // saveCoverages(postObject: any) {
  //   if (!this.IfDtxInvalidPresent()) {
  //     try {
  //       this.Subscription.add(this.http.post(this.saveCoveragesURL.replace(/{RiskId}/ig, postObject.Id).replace(/{RiskType}/ig, postObject.Type), postObject.covList, { headers: this.headers }).subscribe((response: any) => {
  //         this.us.Show("Coverages saved successfully", "success");
  //         this.clearCovMessages();
  //         this.coverageComponentInstance.resetCoverageForm();
  //         this.RiskFilterInstance.getCoverages(postObject);
  //         if (response != null) {
  //           this.updateRiskFilterFlag(postObject.Id, response);
  //         } else {
  //           this.updateRiskFilterFlag(postObject.Id);
  //         }
  //       }, (error: any) => {
  //         this.us.Show("Something went wrong - " + error.statusText, "error");
  //       }));
  //     } catch (ex) {
  //       this.us.Show("Something went wrong" + ex, "error");
  //     }
  //   } else {
  //     // this.us.Show("please correct the highlighted feilds", "error");
  //   }

  // }

  // updateMessages(oldMessages: any[], newMessages: any[]) {
  //   let existingMessageIndex: number = 0;
  //   newMessages.forEach(newMessage => {
  //     existingMessageIndex = oldMessages.findIndex(oldMessage => { return oldMessage.Id == newMessage.Id });
  //     if (existingMessageIndex != -1) {
  //       oldMessages[existingMessageIndex] = newMessage;
  //     } else {
  //       oldMessages.push(newMessage);
  //     }
  //   })
  //   return oldMessages;
  // }
  // readISolverMessages(messages: any[]) {
  //   if (this.ISolverMessages.length == 0) {
  //     this.ISolverMessages = messages;
  //   } else {
  //     this.ISolverMessages = this.updateMessages(this.ISolverMessages, messages);
  //   }
  //   if (messages != null) {
  //     this.dangerMessages = this.ISolverMessages.filter(message => { return message.Type == 'danger' && message.DisplayText !== "" && message.DisplayText != null })
  //     this.warningMessages = this.ISolverMessages.filter(message => { return message.Type == 'warning' && message.DisplayText !== "" && message.DisplayText != null })
  //     this.updateDTxInvalidFlag(messages);
  //   }
  // }
  // updateDTxInvalidFlag(messages: any[]) {
  //   messages.forEach(message => {
  //     this.coverageComponentInstance.coverages.forEach(coverage => {
  //       if (coverage.Attributes != null) {
  //         coverage.Attributes.forEach(attr => {
  //           if (attr.Id == message.Id && message.Type == "danger" && message.DisplayText !== "" && message.DisplayText != null) {
  //             attr.IsDTxInvalid = true;
  //           }
  //           if (attr.Id == message.Id && message.Type == "danger" && (message.DisplayText == "" || message.DisplayText == null)) {
  //             attr.IsDTxInvalid = false;
  //           }
  //         })
  //       }
  //     })
  //   })
  // }
  // IfDtxInvalidPresent() {
  //   let dtxInvalidPresent: boolean = false;
  //   for (let instance of this.coverageComponentInstance.coverages) {
  //     if (instance.Attributes != null) {
  //       dtxInvalidPresent = instance.Attributes.find(attr => { return attr.IsDTxInvalid == true; }) ? true : false;
  //     }
  //     if (dtxInvalidPresent) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // clearCovMessages() {
  //   this.ISolverMessages = [];
  //   this.dangerMessages = [];
  //   this.warningMessages = [];
  // }
  // updateRiskFilterFlag(riskID, riskInfo?: any[]) {
  //   for (let instance of this.RiskFilterInstance.riskInstances) {
  //     if (instance.Id == riskID) {
  //       instance.CoveragesSelected = true;
  //       break;
  //     }
  //   }
  //   if (riskInfo != null || riskInfo != undefined) {
  //     riskInfo.forEach(risk => {
  //       this.coveragesFilter.forEach(covFilter => {
  //         if (covFilter.Type == risk.Type) {
  //           for (let instance of covFilter.riskInstances) {
  //             if (instance.Id == risk.Id) {
  //               instance.CoveragesSelected = risk.CoveragesSelected;
  //               break;
  //             }
  //           }
  //         }
  //       })
  //     })
  //   }
  //   this.coveragesFilter.forEach(covFilter => {
  //     if (covFilter.riskInstances != null && covFilter.riskInstances.length > 0) {
  //       covFilter.CoveragesSelected = covFilter.riskInstances.find((risk) => { return risk.CoveragesSelected == false }) ? false : true;
  //     }
  //   })
  // }

  isAllCoveragesCompleted(): boolean {
    return false;
    //   return this.coveragesFilter.find(filter => { return filter.CoveragesSelected == false }) ? false : true;
  }

  // ngOnDestroy() {
  //   this.Subscription.unsubscribe();
  // }
}
