import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, DoCheck } from '@angular/core';
import { ValidatorService } from 'src/app/core/validator.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'coverage',
  templateUrl: './coverage.component.html',
  animations: [trigger('animationOption', [
    transition(':enter', [
      style({ backgroundColor: 'white' }),
      animate(300)
    ]),
    transition(':leave', [
      animate(300)
    ]),
    state('*', style({ backgroundColor: '#f7f7f7' })),
  ])],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoverageComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CoverageComponent),
      multi: true
    }
  ]
})
export class CoverageComponent implements ControlValueAccessor {
  value: any = {};
  @Input('madatoryHeading') madatoryHeading: any;
  @Input('optionalHeading') optionalHeading: any;
  @Input('attributesLabel') attributesLabel: any;
  @Input('mode') editMode: boolean;
  @Input('saveCallEvent') saveCallEvent: number;
  @Input('attributes') attributes: any[];
  @Input('Decimal') Decimal: number;
  @Input('Currency') Currency: number;
  @Input('interactiveConfigurationURL') interactiveConfigurationURL: string;

  // @ViewChild('formInCustumControl', null) formInCustumControl: any;

  // coverages: any[];
  // ISolverMessages: any[] = [];
  // dangerMessages: any[] = [];
  // warningMessages: any[] = [];
  // splittedCoverages: any[] = [];
  // isDtxInvalidPresent: boolean = false;
  @Output('callISolver') executeISolverEmittion: EventEmitter<any> = new EventEmitter<any>();
  @Input('coverages') loadedCoverages: any[];
  @Input('iSolverResponse') iSolverResponse: any;

  constructor(public vs: ValidatorService) {

  }
  //#region custom control logic

  // ngDoCheck(): void {
  //   if (this.formInCustumControl != undefined) {
  //     this.formInCustumControl.form.markAsTouched();
  //     this.valueChanged();
  //   }
  // }

  // onChange = (value: string) => { };
  // onTouched = () => { };
  // validate(c: any) { }

  // valueChanged() {
  //   this.writeValue(this.value);
//  if(this.formInCustumControl.form && this.formInCustumControl.form.dirty)
//this.onChange(this.value);
  // }

  writeValue(value): void {
    // if (this.formInCustumControl) {
    //   this.value['formInCustomControl'] = this.formInCustumControl;
    //   this.value['coverages'] = this.coverages;
    // }
    // if (this.isDtxInvalidPresent) {
    //   this.value['isDtxInvalidPresent'] = true;
    // } else {
    //   this.value['isDtxInvalidPresent'] = false;
    // }
    // this.onChange(this.value)
  }

  registerOnChange(fn: (value: string) => void): void {
    //this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
   // this.onTouched = fn;
  }
  //#endregion

  //#region coverage main looping logic
  // loadNewCoverages(coverages: any[]) {
  //   this.refreshMessagesDisplay();
  //   this.coverages = coverages;
  //   if (this.coverages.length > 0) {
  //     this.coverages.forEach(x => {
  //       x.IsExpanded = false;
  //       x.Searched = true;
  //       if (x.Attributes != null) {
  //         x.Attributes.forEach(y => {
  //           y.IsDTxInvalid = false;
  //           if (y.ControlType == 'DateTime' || y.ControlType == 'DatePicker') {
  //             if (y.UserValue != null && y.UserValue != "") {
  //               y.UserValue = new Date(y.UserValue)
  //             }
  //           }
  //           if ((y.DataType == "Numeric" || y.DataType == "Integer" || y.DataType == "Decimal") && y.UserValue != null && y.UserValue != "") {
  //             y.UserValue = parseFloat(y.UserValue)
  //           }
  //         })
  //       }
  //     })
  //   }
  // }

  // loadNewAttributes(attributes: any[]) {
  //   this.refreshMessagesDisplay();
  //   this.attributes = attributes;
  //   if (this.attributes != null && this.attributes.length > 0) {
  //     this.attributes.forEach(y => {
  //       y.IsDTxInvalid = false;
  //       if (y.ControlType == 'DateTime' || y.ControlType == 'DatePicker') {
  //         if (y.UserValue != null && y.UserValue != "") {
  //           y.UserValue = new Date(y.UserValue)
  //         }
  //       }
  //       if ((y.DataType == "Numeric" || y.DataType == "Integer" || y.DataType == "Decimal") && y.UserValue != null && y.UserValue != "") {
  //         y.UserValue = parseFloat(y.UserValue)
  //       }
  //     })
  //   }
  // }

  // getDateObj(dateString) {
  //   return new Date(dateString)
  // }

  // getDecimalPrecisionLength(format: string, datatype: string) {
  //   if (datatype == "Numeric" || datatype == "Integer") {
  //     return 0;
  //   }
  //   else {
  //     if (format == 'currency') {
  //       return this.Currency;
  //     }
  //     else {
  //       return this.Decimal;
  //     }
  //   }
  // }

  // isCoverageAvailable(coverageId: String) {
  //   return this.coverages.find(coverage => { return coverage.Id == coverageId }) ? true : false;
  // }

  // covIdTracker(index, item) {
  //   return index + item.Id;
  // }

  // getFormat(format: string, datatype: string) {
  //   if (datatype == "Numeric" || datatype == "Integer") {
  //     if (format == 'currency') {
  //       return "c0";
  //     }
  //     else {
  //       return "n0";
  //     }
  //   }
  //   else {
  //     if (format == 'currency') {
  //       return "c" + this.Currency;
  //     }
  //     else {
  //       return "n" + this.Decimal;
  //     }
  //   }
  // }

  //#endregion

  //#region ISolver logic
  // refreshMessagesDisplay() {
  //   this.ISolverMessages = [];
  //   this.dangerMessages = [];
  //   this.warningMessages = [];
  // }
  // ExecuteISolver(parent: any, executor: any, executedOn?: any) {
  //   if (executor.IsActionable == true) {
  //     this.solverLogic(parent, executor, executedOn);
  //   }
  // }
  // solverLogic(parent: any, executor: any, executedOn?: any) {
  //   if (executedOn != "coverage" && !executor.UserValue) {
  //     return;
  //   }
  //   let postObject = {};
  //   if (!parent) {
  //     postObject = {
  //       Id: 771,
  //       Name: executor.Name,
  //       Value: executor.UserValue,
  //       Type: "Attribute",
  //       Parent: "",
  //       RuleType: executor.RuleType,
  //       ParentName: ""
  //     };
  //   } else if (executedOn == 'coverage') {
  //     postObject = {
  //       Id: parent.Id,
  //       Name: parent.Name,
  //       Value: parent.IsSelected,
  //       Type: 'coverage',
  //       Parent: '',
  //       RuleType: parent.RuleType,
  //       ParentName: ''
  //     };
  //   } else {
  //     postObject = {
  //       Id: executor.Id,
  //       Name: executor.Name,
  //       Value: executor.UserValue,
  //       Type: "Attribute",
  //       Parent: parent.Id,
  //       RuleType: executor.RuleType,
  //       ParentName: parent.Name
  //     };
  //   }
  //   this.executeISolverEmittion.emit(postObject);
  // }
  // executeISolverBusinessLogic(response) {
  //   if (response.Details != null && response.Details.length > 0) {
  //     this.updateCoveragesAttributes(response);
  //   }
  //   if (response.Coverages != null) {
  //     if (response.Coverages.length > 0) {
  //       response.Coverages.filter(newCoverage => {

  //         let isCoverageAlreadyExist = this.isCoverageAvailable(newCoverage.Id);
  //         if (isCoverageAlreadyExist) {
  //           if (newCoverage.IsDeleted) {
  //             this.deleteExistingCoverage(newCoverage);
  //           }
  //           if (newCoverage.IsAdded) {
  //             this.updateExistingCoverage(newCoverage);
  //           }
  //         }
  //         if (newCoverage.IsAdded && !isCoverageAlreadyExist) {
  //           this.addNewCoverage(newCoverage);
  //         }
  //         this.updateSVMflags(newCoverage);
  //       })
  //     }
  //   }
  //   if (response.Messages != null) {
  //     this.readISolverMessages(response.Messages);
  //   }
  // }
  // updateCoveragesAttributes(response) {
  //   response.Details.filter((newAtts: any) => {
  //     this.coverages.filter((oldCoverages: any) => {
  //       if (oldCoverages.Attributes != null) {
  //         for (let oldAtts of oldCoverages.Attributes) {
  //           if (newAtts.Id == oldAtts.Id) {
  //             if (newAtts.ControlType == 'DateTime' || newAtts.ControlType == 'DatePicker') {
  //               if (newAtts.UserValue != null && newAtts.UserValue != "") {
  //                 newAtts.UserValue = new Date(newAtts.UserValue)
  //               }
  //             }
  //             if ((newAtts.DataType == "Numeric" || newAtts.DataType == "Integer" || newAtts.DataType == "Decimal") && newAtts.UserValue != null && newAtts.UserValue != "" || (isNaN(parseFloat(newAtts.UserValue)) == false)) {
  //               newAtts.UserValue = parseFloat(newAtts.UserValue)
  //             }
  //             if (newAtts.UIRuleIndicator == true) {
  //               oldAtts.IsEnabled = newAtts.IsEnabled;
  //               oldAtts.IsVisible = newAtts.IsVisible;
  //             }
  //             if (newAtts.ProductChoicesIndicator == true) {
  //               if (newAtts.Values != null) {
  //                 oldAtts.Values = newAtts.Values;
  //                 if (newAtts.Values.indexOf(oldAtts.UserValue) > -1) {
  //                   newAtts.UserValue = oldAtts.UserValue;
  //                 } else {
  //                   oldAtts.UserValue = '';
  //                 }
  //               }
  //               if (newAtts.UserValue != null && newAtts.UserValue != '') {
  //                 oldAtts.UserValue = newAtts.UserValue;
  //               }
  //               if (newAtts.Min != null && newAtts.Min != '') {
  //                 oldAtts.Min = newAtts.Min;
  //                 if (parseFloat(oldAtts.UserValue) < parseFloat(newAtts.Min)) {
  //                   oldAtts.UserValue = newAtts.Min;
  //                 }
  //               }
  //               if (newAtts.Max != null && newAtts.Max != '') {
  //                 oldAtts.Max = newAtts.Max;
  //                 if (parseFloat(oldAtts.UserValue) > parseFloat(newAtts.Max)) {
  //                   oldAtts.UserValue = newAtts.Max;
  //                 }
  //               }
  //             }
  //             break;
  //           }

  //         }
  //       }

  //     })
  //     for (let oldAtts of this.attributes) {
  //       if (newAtts.Id == oldAtts.Id) {
  //         if (newAtts.ControlType == 'DateTime' || newAtts.ControlType == 'DatePicker') {
  //           if (newAtts.UserValue != null && newAtts.UserValue != "") {
  //             newAtts.UserValue = new Date(newAtts.UserValue)
  //           }
  //         }
  //         if ((newAtts.DataType == "Numeric" || newAtts.DataType == "Integer" || newAtts.DataType == "Decimal") && newAtts.UserValue != null && newAtts.UserValue != "" || (isNaN(parseFloat(newAtts.UserValue)) == false)) {
  //           newAtts.UserValue = parseFloat(newAtts.UserValue)
  //         }
  //         if (newAtts.UIRuleIndicator == true) {
  //           oldAtts.IsEnabled = newAtts.IsEnabled;
  //           oldAtts.IsVisible = newAtts.IsVisible;
  //         }
  //         if (newAtts.ProductChoicesIndicator == true) {
  //           if (newAtts.Values != null) {
  //             oldAtts.Values = newAtts.Values;
  //             if (newAtts.Values.indexOf(oldAtts.UserValue) > -1) {
  //               newAtts.UserValue = oldAtts.UserValue;
  //             } else {
  //               oldAtts.UserValue = '';
  //             }
  //           }
  //           if (newAtts.UserValue != null && newAtts.UserValue != '') {
  //             oldAtts.UserValue = newAtts.UserValue;
  //           }
  //           if (newAtts.Min != null && newAtts.Min != '') {
  //             oldAtts.Min = newAtts.Min;
  //             if (parseFloat(oldAtts.UserValue) < parseFloat(newAtts.Min)) {
  //               oldAtts.UserValue = newAtts.Min;
  //             }
  //           }
  //           if (newAtts.Max != null && newAtts.Max != '') {
  //             oldAtts.Max = newAtts.Max;
  //             if (parseFloat(oldAtts.UserValue) > parseFloat(newAtts.Max)) {
  //               oldAtts.UserValue = newAtts.Max;
  //             }
  //           }
  //         }
  //         break;
  //       }
  //     }
  //   })
  // }
  // addNewCoverage(newCoverage: any) {
  //   newCoverage.IsExpanded = false;
  //   newCoverage.Searched = true;
  //   if (newCoverage.Attributes != null) {
  //     newCoverage.Attributes.filter(newAttr => {
  //       newAttr.IsDTxInvalid = false;
  //       if (newAttr.ControlType == 'DateTime' || newAttr.ControlType == 'DatePicker') {
  //         if (newAttr.UserValue != null && newAttr.UserValue != "") {
  //           newAttr.UserValue = new Date(newAttr.UserValue)
  //         }
  //       }
  //       if ((newAttr.DataType == "Numeric" || newAttr.DataType == "Integer" || newAttr.DataType == "Decimal") && newAttr.UserValue != null && newAttr.UserValue != "") {
  //         newAttr.UserValue = parseFloat(newAttr.UserValue)
  //       }
  //     })
  //   }
  //   this.coverages.push(newCoverage)
  // }
  // deleteExistingCoverage(coverage: any) {
  //   let index = 0;
  //   for (var value of this.coverages) {
  //     if (coverage.Id == value.Id) {
  //       this.coverages.splice(index, 1);
  //       break;
  //     }
  //     index++
  //   }

  // }
  // updateExistingCoverage(newCoverage: any) {
  //   this.coverages.filter(oldCoverage => {
  //     if (oldCoverage.Id == newCoverage.Id) {
  //       if (oldCoverage.Attributes != null && newCoverage.Attributes != null) {
  //         oldCoverage.Attributes.filter(oldAttr => {
  //           for (var attribute of newCoverage.Attributes) {
  //             if (oldAttr.Id == attribute.Id && oldAttr.IsActionable) {
  //               oldAttr.UserValue = attribute.UserValue;
  //               break;
  //             }
  //           }
  //         })
  //       }

  //     }
  //   })
  // }
  // updateSVMflags(newCoverage: any) {
  //   this.coverages.filter(oldCoverage => {
  //     if (newCoverage.Id == oldCoverage.Id) {
  //       if (newCoverage.ProductChoicesIndicator) {
  //         oldCoverage.IsSelected = newCoverage.IsSelected;
  //         oldCoverage.IsMandatory = newCoverage.IsMandatory;
  //       }
  //       if (newCoverage.UIRuleIndicator) {
  //         oldCoverage.IsVisible = newCoverage.IsVisible;
  //       }
  //     }
  //   })
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
  // updateDTxInvalidFlag(messages: any[]) {
  //   messages.forEach(message => {
  //     this.coverages.forEach(coverage => {
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
  //   if (this.IfDtxInvalidPresent()) {
  //     this.isDtxInvalidPresent = true;
  //   } else {
  //     this.isDtxInvalidPresent = false;
  //   }
  // }
  // IfDtxInvalidPresent() {
  //   let dtxInvalidPresent: boolean = false;
  //   for (let instance of this.coverages) {
  //     if (instance.Attributes != null) {
  //       dtxInvalidPresent = instance.Attributes.find(attr => { return attr.IsDTxInvalid == true; }) ? true : false;
  //     }
  //     if (dtxInvalidPresent) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // //#endregion


  // ngOnChanges(changes: any): void {
  //   if (changes.loadedCoverages != undefined) {
  //     this.loadNewCoverages(changes.loadedCoverages.currentValue)
  //   }
  //   if (changes.attributes != undefined)
  //     this.loadNewAttributes(changes.attributes.currentValue);

  //   if (changes.iSolverResponse != undefined) {
  //     this.executeISolverBusinessLogic(changes.iSolverResponse.currentValue);
  //   }
  // }
}




