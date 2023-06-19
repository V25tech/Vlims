import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormDetails, Mode, Section, Field, Coverage } from '../formriskfilters/formdetails';
import { Form, Details } from '../forms/form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FormsConfigService } from '../forms-config.service';
import { UtilityService } from 'src/app/utility.service';
import { NgModelGroup, NgForm } from '@angular/forms';
import { ValidatorService } from 'src/app/core/validator.service';

@Component({
  selector: 'formriskfilters',
  templateUrl: './formriskfilters.component.html'
})
export class FormriskfiltersComponent implements OnInit {
  @ViewChild("formDetailsForm", { static: false }) formDetailsForm: NgForm;
  @ViewChild("schForm", { static: false }) schForm: NgForm;
  @Input() data: Array<FormDetails> = [];
  @Input() selectedForm: Form;
  @Output() showForms = new EventEmitter<{ forms: Form[], action: string, isSubmit: boolean }>();
  @Output() updateForms = new EventEmitter<Form[]>();
  @Output() hideRiskTypes = new EventEmitter();

   riskTypes: any = [];
   allRiskTypes: any = [];
   selectedRiskType: any = null;
   parentRiskTypes: any = [];
   lstRisks: any = [];
   dynamicRiskFiters: any = [];
   curntRiskTypeRisks: any = [];
   datatypes: string[] = ['Integer', 'Numeric', 'Decimal'];
   ISolverMessages: any = []; // to show rules messages
   dangerMessages: any = [];
   warningMessages: any = [];
   schRulesMessages: any = []; // to show schedule rules messages
   schDangerMessages: any = [];
   schWarningMessages: any = [];
   curntRiskTypeRisk: any = [];
   selectedRisk: any = null;
   IsFiltersVisible: boolean = false;
   RisktypesVisible: boolean = false;
   IsSubmitVisible: boolean = true;
   isSnglRiskVisible: boolean = false;
   showAssociateValMsg: boolean = false;
   showExpandAll: boolean = true;
   riskCount: number = 0;

   hiddenColumns: string[] = ['Code'];
   isSchContentVsble: boolean = false;
   isEditSchContentVsble: boolean = false;
   isFormDataVsble: boolean = false;
   schObj: any = {};
   scheduleMsgs: any = [];
   curntFormId: string = '';
   curntSchName: string = '';
   curntSchDetails: any = null;
   curntSchItem: Section = null;
   curntSchId: string = null;
   associatedRisks = [];
   associatedFormData: any = [];
   deletedFormData: any = [];
   risk: string = '';
   selRisk: string;
   isVisible: boolean = false;
   risksWithoutDetails: boolean = false;
   viewMode: boolean = false;

  // constructor(public vs: ValidatorService, public us: UtilityService, public http: HttpClient, private formsConfig: FormsConfigService) {
  // }

  ngOnInit() {

  }
  // ngOnChanges() {
  //   if (this.data.length > 0) {
  //     this.assignFormDetails(this.data);
  //   }
  // }
  // //form details
  // assignFormDetails(formdata: FormDetails[]) {
  //   this.isFormDataVsble = true;
  //   this.viewMode = (this.formsConfig.viewMode && !(this.formsConfig.editNonPremiumBearingForms && this.selectedForm.PremiumBearing.toLowerCase() == 'no'));
  //   this.risksWithoutDetails = (!this.selectedForm.IsPolicyForm && !this.selectedForm.RequireAdditionalDetails && this.selectedForm.Type.toLowerCase() == 'mandatory');
  //   this.ResetRiskFilters();
  //   if (formdata.length == 1 && formdata[0].Forms == null && this.selectedForm.IsPolicyForm) {
  //     if (formdata[0].Fields != null)
  //       this.getFields(formdata[0].Fields);
  //     if (formdata[0].Coverages != null) {
  //       for (let j = 0; j < formdata[0].Coverages.length; j++) {
  //         if (formdata[0].Coverages[j].Fields != null) {
  //           this.getFields(formdata[0].Coverages[j].Fields);
  //         }
  //       }
  //     }
  //     if (formdata[0].IsAttached) {
  //       this.bindSchedulesData(formdata[0]);
  //     }
  //     this.associatedFormData = formdata;
  //   }
  //   else {
  //     this.getAssociatedFormData(formdata);
  //   }
  //   if (this.selectedForm.Type.toLowerCase() != 'mandatory') { // to show associated risks directly for mandatory form without selected by user
  //     if (this.riskTypes.length == 1) {
  //       this.selectedRiskType = { DisplayName: this.riskTypes[0].DisplayName, Type: this.riskTypes[0].Type };
  //       this.riskTypeChange(this.selectedRiskType);
  //       //this.isVisible = this.curntRiskTypeRisks.length > 0;
  //     }
  //   }
  //   this.expandAll(true);
  // }

  // getAssociatedFormData(lstFormData: FormDetails[]) {
  //   let rskTypeExists = false, flg = false;
  //   if (lstFormData != null) {
  //     lstFormData.forEach(formData => {
  //       rskTypeExists = false; flg = false;
  //       if (formData.IsAttached || (!this.selectedForm.IsPolicyForm && !this.selectedForm.RequireAdditionalDetails && this.selectedForm.Type.toLowerCase() == 'mandatory' && formData.FormName == this.selectedForm.Name)) {
  //         formData.Mode = (this.selectedForm.IsSubmit ? Mode.Update : Mode.Add);
  //         if (formData.Fields != null)
  //           this.getFields(formData.Fields);
  //         if (formData.Coverages != null) {
  //           for (let j = 0; j < formData.Coverages.length; j++) {
  //             if (formData.Coverages[j].Fields != null) {
  //               this.getFields(formData.Coverages[j].Fields);
  //             }
  //           }
  //         }
  //         this.bindSchedulesData(formData);
  //         this.associatedFormData.push(
  //           formData
  //         );
  //       }
  //       //#region to get all risktypes
  //       if (this.selectedForm.Type.toLowerCase() != 'mandatory') {
  //         for (let j = 0; j < this.riskTypes.length; j++) {
  //           if (this.riskTypes[j].Type == formData.Type.RiskType) {
  //             rskTypeExists = true;
  //             break;
  //           }
  //         }
  //         for (let k = 0; k < this.allRiskTypes.length; k++) {
  //           if (this.allRiskTypes[k].Type == formData.Type.RiskType) {
  //             flg = true;
  //             break;
  //           }
  //         }
  //         if (!rskTypeExists && formData.FormName == this.selectedForm.Name) {
  //           this.riskTypes.push({ FormName: formData.FormName, Type: formData.Type.RiskType, DisplayName: formData.Type.DisplayName });
  //         }
  //         if (!flg) {
  //           this.allRiskTypes.push({ FormName: formData.FormName, Type: formData.Type.RiskType, DisplayName: formData.Type.DisplayName });
  //         }
  //       }
  //       //#endregion
  //       if (formData.Forms != null && formData.Forms.length > 0) {
  //         this.getAssociatedFormData(formData.Forms);
  //       }
  //     });
  //   }
  // }

  // expandAll(isExpand: boolean) {
  //   this.showExpandAll = true;
  //   if (!this.selectedForm.IsPolicyForm && !this.selectedForm.RequireAdditionalDetails) {
  //     this.showExpandAll = false;
  //   }
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     this.associatedFormData[i].isExpanded = isExpand;
  //   }
  // }
  // //end form details

  // ResetRiskFilters() {
  //   this.associatedFormData = [];
  //   this.deletedFormData = [];
  //   this.curntRiskTypeRisks = [];
  //   this.lstRisks = [];
  //   this.riskTypes = [];
  //   this.allRiskTypes = [];
  //   this.dynamicRiskFiters = [];
  //   this.scheduleMsgs = [];
  //   this.selectedRiskType = null;
  //   this.isSchContentVsble = false;
  //   this.IsFiltersVisible = false;
  //   this.showAssociateValMsg = false;
  //   if (this.selectedForm.Type.toLowerCase() != 'mandatory' && !this.selectedForm.IsPolicyForm) {
  //     this.RisktypesVisible = true;
  //   }
  //   else {
  //     this.RisktypesVisible = false;
  //   }
  //   this.IsSubmitVisible = true;
  //   this.isVisible = false;
  //   this.isSnglRiskVisible = false;
  // }

  // riskTypeChange(obj: any) {
  //   this.curntRiskTypeRisks = [];
  //   this.dynamicRiskFiters = [];
  //   this.scheduleMsgs = [];
  //   this.curntRiskTypeRisk = [];
  //   if (obj.DisplayName != "Select") {
  //     this.allRiskTypes.forEach(riskType => {
  //       if (typeof this.lstRisks[riskType.Type] == "undefined") {
  //         this.parentRiskTypes[riskType.Type] = new Array();
  //         this.lstRisks[riskType.Type] = new Array();

  //         if (this.data != null) {// && (this.allRiskTypes.length != 1 || this.data.length > 1)
  //           this.getRisksByRiskType(this.data, riskType.Type, this.lstRisks[riskType.Type]);
  //         }
  //       }
  //     });

  //     //to get risktypes parent child hierarchy
  //     for (let n = 0; n < this.data.length; n++) {
  //       if (this.data[n].Forms != null && this.data[n].Forms.length > 0) {
  //         this.getRisktypesHierarchy(this.data[n].Type.RiskType, this.data[n].Forms);
  //       }
  //     }
  //     //this.isVisible = true;
  //     this.getRiskFilters();
  //     //this.curntRiskTypeRisks = this.lstRisks[this.selectedRiskType.Type]; // due to reference maintained
  //     let flg = false;
  //     this.riskCount = 0;
  //     if (typeof this.lstRisks[this.selectedRiskType.Type] != "undefined") {
  //       this.lstRisks[this.selectedRiskType.Type].forEach(risk => {
  //         flg = false;
  //         if (risk.FormName == this.selectedForm.Name) {
  //           this.riskCount++;
  //           this.curntRiskTypeRisk.push(risk);
  //           if (this.associatedFormData.length == 0) {
  //             this.curntRiskTypeRisks.push(risk);
  //           }
  //           else {
  //             for (let i = 0; i < this.associatedFormData.length; i++) {
  //               if (risk.UId == this.associatedFormData[i].UId) {
  //                 flg = true;
  //                 break;
  //               }
  //             }
  //             if (!flg) {
  //               this.curntRiskTypeRisks.push(risk);
  //             }
  //           }
  //         }
  //       });
  //     }
  //     if (this.riskCount == 1) {
  //       this.selectedRisk = { Name: this.curntRiskTypeRisk[0].Name };
  //       this.getFormDetails();
  //       this.isVisible = false;
  //       this.IsFiltersVisible = false;
  //       this.isSnglRiskVisible = true;
  //     }
  //     else {
  //       this.isVisible = true;
  //       this.IsFiltersVisible = (this.parentRiskTypes[this.selectedRiskType.Type].length > 0 && this.lstRisks[this.selectedRiskType.Type].length > 0);
  //       this.isSnglRiskVisible = false;
  //     }
  //   }
  //   else {
  //     this.IsFiltersVisible = false;
  //     this.isVisible = false;
  //     this.isSnglRiskVisible = false;
  //     this.showAssociateValMsg = false;
  //   }
  // }

  // snglRiskChange() {
  //   this.getFormDetails();
  // }

  // // makeEmpty(fld: any){
  // //   fld.Value = "";
  // // }

  // //to get the formdetails when current risktype has single risk
  // getFormDetails() {
  //   //this.resetFormDataMode();
  //   try {
  //     let isFormDataExists = false;
  //     for (let i = 0; i < this.associatedFormData.length; i++) {
  //       if (this.associatedFormData[i].UId == this.curntRiskTypeRisk[0].UId) {
  //         isFormDataExists = true;
  //         break;
  //       }
  //     }
  //     if (this.selectedRisk.Name != "Select" && !isFormDataExists) {
  //       this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.GetFormDetailsUrl), this.curntRiskTypeRisk,
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((fd: any) => {
  //           if (fd != null) {
  //             if (fd.FormData != null && fd.FormData.length > 0) {
  //               fd.FormData[0].Mode = Mode.Add;
  //               this.assignFormData(fd.FormData);
  //               this.bindSchedulesData(fd.FormData[0]);
  //               this.isVisible = false;
  //               this.isSnglRiskVisible = true;
  //             }
  //             if (fd.Forms != null) {
  //               this.updateForms.emit(fd.Forms);
  //             }
  //           }
  //         },
  //           (error) => {
  //             this.us.Show(error.message, 'error');
  //           });
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // riskChange(selRisk: any, rskType: string) {
  //   if (selRisk.Name != "Select") {
  //     let fltrRsks = [];
  //     if (this.lstRisks[rskType] != undefined) {
  //       for (let i = 0; i < this.lstRisks[rskType].length; i++) {
  //         if (this.lstRisks[rskType][i].UId == selRisk.UId) {
  //           fltrRsks = this.lstRisks[rskType][i].Forms;
  //           break;
  //         }
  //       }
  //       if (this.dynamicRiskFiters[this.dynamicRiskFiters.length - 1].Type == rskType) {
  //         this.curntRiskTypeRisks = [];
  //         if (fltrRsks != null) {
  //           fltrRsks.forEach(risk => {
  //             if (risk.FormName == this.selectedForm.Name && risk.Type.RiskType == this.selectedRiskType.Type) {
  //               if (!this.associatedFormData.some((item) => item.UId == risk.UId)) {
  //                 this.curntRiskTypeRisks.push(risk);
  //               }
  //             }
  //           });
  //         }
  //       }
  //       else {
  //         for (let j = 0; j < this.dynamicRiskFiters.length; j++) {
  //           if (this.dynamicRiskFiters[j].Type == rskType && j + 1 != this.dynamicRiskFiters.length) {
  //             this.dynamicRiskFiters[j + 1].Risks = fltrRsks;
  //             this.dynamicRiskFiters[j + 1].SelectedRisk = { Name: "Select", UId: "Select" };
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   else {
  //     for (let j = 0; j < this.dynamicRiskFiters.length; j++) {
  //       if (this.dynamicRiskFiters[j].Type == rskType) {
  //         if (j == this.dynamicRiskFiters.length - 1) {
  //           this.curntRiskTypeRisks = [];
  //           for (let n = 0; n < this.lstRisks[this.selectedRiskType.Type].length; n++) {
  //             if (this.lstRisks[this.selectedRiskType.Type][n].FormName == this.selectedForm.Name && this.lstRisks[this.selectedRiskType.Type][n].Type.RiskType == this.selectedRiskType.Type) {
  //               if (!this.associatedFormData.some((item) => item.UId == this.lstRisks[this.selectedRiskType.Type][n].UId)) {
  //                 this.curntRiskTypeRisks.push(this.lstRisks[this.selectedRiskType.Type][n]);
  //               }
  //             }
  //           }
  //         }
  //         else {
  //           this.dynamicRiskFiters[j + 1].Risks = this.lstRisks[this.dynamicRiskFiters[j + 1].Type];
  //           this.dynamicRiskFiters[j + 1].SelectedRisk = { Name: "Select", UId: "Select" };
  //         }
  //         break;
  //       }
  //     }
  //   }
  // }

  // getRisktypesHierarchy(risktype, forms) {
  //   forms.forEach(form => {
  //     if (this.parentRiskTypes[form.Type.RiskType].indexOf(risktype) === -1)
  //       this.parentRiskTypes[form.Type.RiskType].push(risktype);
  //     if (form.Forms != null && form.Forms.length > 0) {
  //       this.getRisktypesHierarchy(form.Type.RiskType, form.Forms);
  //       this.getRisktypesHierarchy(risktype, form.Forms);
  //     }
  //   });
  // }

  // getRiskFilters() {
  //   this.IsFiltersVisible = false;
  //   if (this.parentRiskTypes[this.selectedRiskType.Type].length > 0) {
  //     this.IsFiltersVisible = true;
  //     for (let i = this.parentRiskTypes[this.selectedRiskType.Type].length - 1; i >= 0; i--)
  //       this.dynamicRiskFiters.push({
  //         Type: this.parentRiskTypes[this.selectedRiskType.Type][i], SelectedRisk: { Name: "Select", UId: "Select" },
  //         Risks: this.lstRisks[this.parentRiskTypes[this.selectedRiskType.Type][i]]
  //       });
  //   }
  // }

  // getRisksByRiskType(forms, risktype, rskarr) {
  //   forms.forEach(form => {
  //     if (risktype == form.Type.RiskType) {
  //       rskarr.push(form);
  //     }
  //     if (form.Forms != null && form.Forms.length > 0) {   //checking for nested risks                       
  //       this.getRisksByRiskType(form.Forms, risktype, rskarr);
  //     }
  //   });
  // }

  // deleteAllAssociatedRisks() {
  //   let i = 0;
  //   this.us.Confirmation('Are you sure, do you want to delete all associated risks?').subscribe(x => {
  //     if (x) {
  //       for (i; i < this.associatedFormData.length; i++) {
  //         //this.associatedFormData[i].Mode = Mode.Delete;
  //         if (!this.deletedFormData.some((item) => item.UId == this.associatedFormData[i].UId)) {
  //           this.deletedFormData.push(JSON.parse(JSON.stringify(this.associatedFormData[i])));
  //           this.deletedFormData[this.deletedFormData.length - 1].Mode = Mode.Delete;
  //         }
  //         if (this.selectedRiskType != null && this.associatedFormData[i].Type.RiskType == this.selectedRiskType.Type) {
  //           this.curntRiskTypeRisks.push(JSON.parse(JSON.stringify(this.associatedFormData[i])));
  //           this.curntRiskTypeRisks[this.curntRiskTypeRisks.length - 1].Mode = Mode.Add;
  //         }
  //       }
  //       this.clearFormDataRulesMessages();
  //       this.clearSchRulesMessages();
  //       this.associatedFormData = [];
  //       if (this.riskCount == 1)
  //         this.selectedRisk = { Name: "Select" };
  //     }
  //     else {
  //     }
  //   });
  // }

  // clearFormDataRulesMessages() {
  //   this.ISolverMessages = [];
  //   this.dangerMessages = [];
  //   this.warningMessages = [];
  // }

  // deleteFormData(formData: FormDetails) {
  //   let i = 0;
  //   this.us.Confirmation('Are you sure, do you want to delete "' + formData.Name + '"?').subscribe(x => {
  //     if (x) {
  //       for (i; i < this.associatedFormData.length; i++) {
  //         if (this.associatedFormData[i].UId == formData.UId) {
  //           //this.associatedFormData[i].Mode = Mode.Delete;
  //           if (!this.deletedFormData.some((item) => item.UId == formData.UId)) {
  //             this.deletedFormData.push(JSON.parse(JSON.stringify(this.associatedFormData[i])));
  //             this.deletedFormData[this.deletedFormData.length - 1].Mode = Mode.Delete;
  //           }
  //           if (this.selectedRiskType != null && this.associatedFormData[i].Type.RiskType == this.selectedRiskType.Type) {
  //             this.curntRiskTypeRisks.push(JSON.parse(JSON.stringify(this.associatedFormData[i])));
  //             this.curntRiskTypeRisks[this.curntRiskTypeRisks.length - 1].Mode = Mode.Add;
  //           }
  //           //this.curntRiskTypeRisks.push(this.associatedFormData[i]);
  //           this.deleteCurrentFormDataMessages(this.associatedFormData[i]);
  //           if (this.curntRiskTypeRisk.length > 0 && this.curntRiskTypeRisk[0].UId == formData.UId) {
  //             this.selectedRisk = { Name: "Select" };
  //           }
  //           break;
  //         }
  //       }
  //       this.associatedFormData.splice(i, 1);
  //     }
  //     else {
  //     }
  //   });
  // }

  // deleteCurrentFormDataMessages(formData: FormDetails) {
  //   this.deleteMessages(formData.Fields);
  //   if (formData.Coverages != null) {
  //     for (let i = 0; i < formData.Coverages.length; i++) {
  //       this.deleteMessages(formData.Coverages[i].Fields);
  //     }
  //   }
  //   this.dangerMessages = this.ISolverMessages.filter(message => { return message.Type == 'danger' && message.DisplayText !== null && message.DisplayText !== "" })
  //   this.warningMessages = this.ISolverMessages.filter(message => { return message.Type == 'warning' && message.DisplayText !== null && message.DisplayText !== "" })
  // }

  // deleteMessages(fields: Field[]) {
  //   if (this.ISolverMessages != null) {
  //     for (let j = 0; j < this.ISolverMessages.length; j++) {
  //       if (fields != null) {
  //         for (let i = 0; i < fields.length; i++) {
  //           if (this.ISolverMessages[j].Id == fields[i].Id) {
  //             this.ISolverMessages.splice(j, 1);
  //             j--;
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // //#region "Associate Form Data"

  // moveRight() {
  //   if (this.curntRiskTypeRisks.length > 0) {
  //     for (let i = 0; i < this.curntRiskTypeRisks.length; i++) {
  //       if (this.curntRiskTypeRisks[i]['isClicked'] && !this.associatedRisks.some((item) => item.UId == this.curntRiskTypeRisks[i].UId)) {
  //         this.associatedRisks.push(this.curntRiskTypeRisks[i]);
  //         this.curntRiskTypeRisks[i]['isClicked'] = false;
  //         this.curntRiskTypeRisks.splice(i, 1);
  //         i--;
  //       }
  //     }
  //     this.risk = '';
  //   }
  // }
  // moveLeft() {
  //   if (this.associatedRisks.length > 0) {
  //     for (let i = 0; i < this.associatedRisks.length; i++) {
  //       if (this.associatedRisks[i]['isClicked'] && !this.curntRiskTypeRisks.some((item) => item.UId == this.associatedRisks[i].UId)) {
  //         this.curntRiskTypeRisks.push(this.associatedRisks[i]);
  //         this.associatedRisks[i]['isClicked'] = false;
  //         this.associatedRisks.splice(i, 1);
  //         i--;
  //       }
  //     }
  //     this.selRisk = '';
  //   }
  // }

  // deSelectAll(isSelected: boolean) {
  //   if (isSelected) {
  //     this.associatedRisks.forEach(risk => {
  //       risk.isClicked = false;
  //     });
  //   }
  //   else {
  //     this.curntRiskTypeRisks.forEach(risk => {
  //       risk.isClicked = false;
  //     });
  //   }
  // }

  // moveAllRight() {
  //   if (this.curntRiskTypeRisks.length > 0) {
  //     this.deSelectAll(false);
  //     this.associatedRisks.push.apply(this.associatedRisks, this.curntRiskTypeRisks);
  //     this.curntRiskTypeRisks = [];
  //   }
  // }
  // moveAllLeft() {
  //   if (this.associatedRisks.length > 0) {
  //     this.deSelectAll(true);
  //     this.curntRiskTypeRisks.push.apply(this.curntRiskTypeRisks, this.associatedRisks);
  //     this.associatedRisks = [];
  //   }
  // }
  // getFormData() {
  //   try {
  //     this.IsSubmitVisible = false;
  //     if (this.associatedRisks != null && this.associatedRisks.length > 0) {
  //       this.resetFormDataMode();
  //       this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.GetFormDetailsUrl), this.associatedRisks,
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((fd: any) => {
  //           if (fd != null) {
  //             this.assignFormData(fd.FormData);
  //             this.CancelRiskAssociation();
  //             if (fd.Forms != null) {
  //               this.updateForms.emit(fd.Forms);
  //             }
  //           }
  //         },
  //           (error) => {
  //             this.us.Show(error.message, 'error');
  //           });
  //     }
  //     else {
  //       this.showAssociateValMsg = true;
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }
  // assignFormData(formdata: any) {
  //   formdata.forEach(fd => {
  //     fd.isExpanded = true;
  //     if (fd.Fields != null)
  //       this.getFields(fd.Fields);
  //     if (fd.Coverages != null) {
  //       fd.Coverages.forEach(coverage => {
  //         if (coverage.Fields != null) {
  //           this.getFields(coverage.Fields);
  //         }
  //       });
  //     }
  //     this.associatedFormData.push(fd);
  //   });
  // }

  // getFields(fields: Field[]) {
  //   fields.forEach(fld => {
  //     if (fld.Type == 'DateTime' || fld.Type == 'DatePicker') {
  //       if (fld.Value != null && fld.Value != "") {
  //         fld.Value = new Date(fld.Value);
  //       }
  //     }
  //     if ((fld.DataType == "Numeric" || fld.DataType == "Integer" || fld.DataType == "Decimal") && fld.Value != null && fld.Value != "") {
  //       fld.Value = parseFloat(fld.Value);
  //     }
  //     if (fld.Type == 'CheckBox') {
  //       fld.Value = (fld.Value == 'true' || fld.Value == 'True');
  //     }
  //   });
  // }

  // showCoverageHeader(coverages: Coverage[]) {
  //   if (coverages != null) {
  //     for (let i = 0; i < coverages.length; i++) {
  //       if (coverages[i].IsVisible)
  //         return true;
  //     }
  //   }
  //   return false;
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
  //       return "c" + this.formsConfig.paramsConfig.CurrencyFormat;
  //     }
  //     else {
  //       return "n" + this.formsConfig.paramsConfig.DecimalFormat;
  //     }
  //   }
  // }

  // resetFormDataMode() {   // delete the associated risk and reassociate the same risk when edit the submitted form
  //   for (let i = 0; i < this.associatedRisks.length; i++) {
  //     if (this.deletedFormData.some((item) => item.UId == this.associatedRisks[i].UId)) {
  //       this.associatedRisks[i].Mode = Mode.Add;
  //     }
  //   }
  // }
  // Cancel() {
  //   try {
  //     if (!this.risksWithoutDetails && !this.viewMode) {
  //       this.http.get(this.getUrlWithParameters(this.formsConfig.urlConfig.RollbackUrl),
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((forms: Form[]) => {
  //           this.clearFilters(forms);
  //         }, (error) => {
  //           this.us.Show(error.message, 'error');
  //         });
  //     }
  //     else {
  //       this.clearFilters(null);
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }
  // clearFilters(forms: Form[]) {
  //   this.isVisible = false;
  //   this.IsFiltersVisible = false;
  //   this.dynamicRiskFiters = [];
  //   this.curntRiskTypeRisks = [];
  //   this.selectedRiskType = null;
  //   this.associatedRisks = [];
  //   this.data = [];
  //   this.clearFormDataRulesMessages();
  //   this.clearSchRulesMessages();
  //   this.showForms.emit({ forms: forms, action: 'cancel', isSubmit: false });
  // }

  // CancelRiskAssociation() {
  //   this.isVisible = false;
  //   this.IsFiltersVisible = false;
  //   this.showAssociateValMsg = false;
  //   this.dynamicRiskFiters = [];
  //   this.curntRiskTypeRisks = [];
  //   this.selectedRiskType = null;
  //   this.associatedRisks = [];
  // }

  // //#region ISolver

  // onCtrlChange(parent: any, fld: Field, curntFormId: string, isCov?: boolean) {
  //   let obj = {};
  //   if (isCov) {
  //     obj = {
  //       Id: fld.Id, Name: fld.Name, Value: fld.Value, Type: "Attribute", Parent: parent.Id, RuleType: fld.RuleType,
  //       ParentName: parent.Name
  //     };
  //   }
  //   else {
  //     obj = {
  //       Id: fld.Id, Name: fld.Name, Value: fld.Value, Type: "Attribute", Parent: parent.FormId, RuleType: fld.RuleType,
  //       ParentName: parent.FormName
  //     };
  //   }
  //   this.executeFields(obj, curntFormId);
  // }

  // onCoverageChange(parent: FormDetails, coverage: Coverage) {
  //   let obj = {
  //     Id: coverage.Id, Name: coverage.Name, Value: coverage.IsSelected, Type: "Coverage", Parent: parent.FormId, RuleType: coverage.RuleType,
  //     ParentName: ''
  //   };
  //   this.executeFields(obj, parent.UId);
  // }

  // executeFields(obj: any, formUId: string) {
  //   try {
  //     this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.ExecuteFieldsUrl), obj,
  //       { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: any) => {
  //         if (resp != null) {
  //           this.updateFields(resp, formUId);
  //           if (resp.Forms != null) {
  //             this.updateForms.emit(resp.Forms);
  //           }
  //         }
  //       },
  //         (error) => {
  //           this.us.Show(error.message, 'error');
  //         });
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // updateFields(data: any, formUId: string) {
  //   if (data.Details != null) {
  //     let curntFld = null;
  //     data.Details.forEach(field => {
  //       curntFld = null;
  //       for (let j = 0; j < this.associatedFormData.length; j++) {
  //         curntFld = null;
  //         if (this.associatedFormData[j].Fields != null) {
  //           for (let k = 0; k < this.associatedFormData[j].Fields.length; k++) {
  //             if (field.Id == this.associatedFormData[j].Fields[k].Id) {
  //               curntFld = this.associatedFormData[j].Fields[k];
  //               break;
  //             }
  //           }
  //         }

  //         if (this.associatedFormData[j].Coverages != null) {
  //           if (curntFld == null) {
  //             cov_data:
  //             for (let l = 0; l < this.associatedFormData[j].Coverages.length; l++) {
  //               if (this.associatedFormData[j].Coverages[l].Fields != null) {
  //                 for (let m = 0; m < this.associatedFormData[j].Coverages[l].Fields.length; m++) {
  //                   if (field.Id == this.associatedFormData[j].Coverages[l].Fields[m].Id) {
  //                     curntFld = this.associatedFormData[j].Coverages[l].Fields[m];
  //                     break cov_data;
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //         if (curntFld != null) {
  //           if (field.UIRuleIndicator) {
  //             curntFld.IsEnabled = field.IsEnabled;
  //             curntFld.IsVisible = field.IsVisible;
  //           }
  //           if (field.ProductChoicesIndicator) {
  //             if (curntFld.Type == 'DateTime' || curntFld.Type == 'DatePicker') {
  //               if (field.UserValue != null && field.UserValue != "") {
  //                 field.UserValue = new Date(field.UserValue);
  //               }
  //             }
  //             if ((field.DataType == "Numeric" || field.DataType == "Integer" || field.DataType == "Decimal") && field.UserValue != null && field.UserValue != "" || (isNaN(parseFloat(field.UserValue)) == false)) {
  //               field.UserValue = parseFloat(field.UserValue);
  //             }
  //             if (field.Values != null) {
  //               curntFld.Values = field.Values;
  //               if (field.Values.indexOf(curntFld.Value) > -1) {
  //                 field.UserValue = curntFld.Value;
  //               } else {
  //                 curntFld.Value = '';
  //               }
  //             }
  //             if (field.UserValue != null && field.UserValue != '') {
  //               if (field.Type == 'CheckBox') {
  //                 field.UserValue = (field.UserValue == true || field.UserValue == 'true' || field.UserValue == 'True');
  //               }
  //               curntFld.Value = field.UserValue;
  //             }
  //             if (field.Min != null && field.Min != '') {
  //               curntFld.Min = field.Min;
  //               if (parseFloat(curntFld.Value) < parseFloat(field.Min)) {
  //                 curntFld.Value = field.Min;
  //               }
  //             }
  //             if (field.Max != null && field.Max != '') {
  //               curntFld.Max = field.Max;
  //               if (parseFloat(curntFld.Value) > parseFloat(field.Max)) {
  //                 curntFld.Value = field.Max;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     });
  //   }

  //   //update coverages
  //   if (data.Coverages != null) {
  //     if (data.Coverages.length > 0) {
  //       data.Coverages.filter(covrg => {
  //         this.updateSVMflags(covrg, formUId);
  //       });
  //     }
  //   }
  //   //to show dtx rules messages
  //   if (data.Messages != null) {
  //     this.readISolverMessages(data.Messages, formUId);
  //   }
  // }

  // getDateObj(dateString) {
  //   return new Date(dateString);
  // }

  // identify(index, item) {
  //   return item.Id;
  // }

  // isCoverageExists(coverageId: String, curntFormUId: string) {
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     if (this.associatedFormData[i].UId == curntFormUId) {
  //       if (this.associatedFormData[i].Coverages != null) {
  //         for (let j = 0; j < this.associatedFormData[i].Coverages.length; j++) {
  //           if (this.associatedFormData[i].Coverages[j].Id == coverageId) {
  //             return true;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // deleteExistingCoverage(formData: FormDetails, covId: string) {
  //   for (let k = 0; k < formData.Coverages.length; k++) {
  //     if (covId == formData.Coverages[k].Id) {
  //       formData.Coverages.splice(k, 1);
  //       return;
  //     }
  //   }
  // }

  // // SVM = isSelected, isVisible, isMandatory flags respectvly.
  // updateSVMflags(newCoverage: any, curntFormUId: string) {
  //   form_data:
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     if (this.associatedFormData[i].UId == curntFormUId) {
  //       for (let j = 0; j < this.associatedFormData[i].Coverages.length; j++) {
  //         let covrg = this.associatedFormData[i].Coverages[j];
  //         if (newCoverage.IsAdded && !this.isCoverageExists(newCoverage.Id, curntFormUId)) {
  //           if (newCoverage.Fields != null) {
  //             newCoverage.Fields.filter(newAttr => {
  //               if (newAttr.Type == 'DateTime' || newAttr.Type == 'DatePicker') {
  //                 if (newAttr.Value != null && newAttr.Value != "") {
  //                   newAttr.Value = new Date(newAttr.Value);
  //                 }
  //               }
  //               if ((newAttr.DataType == "Numeric" || newAttr.DataType == "Integer" || newAttr.DataType == "Decimal") && newAttr.UserValue != null && newAttr.UserValue != "") {
  //                 newAttr.Value = parseFloat(newAttr.Value);
  //               }
  //               if (newAttr.Type == 'CheckBox') {
  //                 newAttr.Value = (newAttr.Value == true || newAttr.Value == 'true' || newAttr.Value == 'True');
  //               }
  //             });
  //           }
  //           this.associatedFormData[i].Coverages.push(newCoverage);
  //           break form_data;
  //         }
  //         else if (newCoverage.IsDeleted) {
  //           if (this.associatedFormData[i].Coverages != null) {
  //             return this.deleteExistingCoverage(this.associatedFormData[i], newCoverage.Id);
  //           }
  //         }
  //         if (newCoverage.Id == covrg.Id) {
  //           if (newCoverage.ProductChoicesIndicator) {
  //             covrg.IsSelected = newCoverage.IsSelected;
  //             covrg.IsMandatory = newCoverage.IsMandatory;
  //           }
  //           if (newCoverage.UIRuleIndicator) {
  //             covrg.IsVisible = newCoverage.IsVisible;
  //           }
  //           break form_data;
  //         }
  //       }
  //     }
  //   }
  // }

  // readISolverMessages(messages: any[], curntFormUId: string) {
  //   if (this.ISolverMessages.length == 0) {
  //     this.ISolverMessages = messages;
  //   } else {
  //     this.ISolverMessages = this.updateMessages(this.ISolverMessages, messages);
  //   }
  //   if (messages != null) {
  //     this.dangerMessages = this.ISolverMessages.filter(message => { return message.Type == 'danger' && message.DisplayText !== null && message.DisplayText !== "" })
  //     this.warningMessages = this.ISolverMessages.filter(message => { return message.Type == 'warning' && message.DisplayText !== null && message.DisplayText !== "" })
  //     this.updateDtxInvalidFlag(messages, curntFormUId);
  //   }
  // }

  // updateDtxInvalidFlag(messages: any[], formId: string) {
  //   let flg = false;
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     if (this.associatedFormData[i].UId == formId) {
  //       messages.forEach(message => {
  //         flg = false;
  //         if (this.associatedFormData[i].Fields != null)
  //           flg = this.updateFieldsInvalidFlag(this.associatedFormData[i].Fields, message);
  //         if (!flg) {
  //           if (this.associatedFormData[i].Coverages != null) {
  //             for (let j = 0; j < this.associatedFormData[i].Coverages.length; j++) {
  //               if (this.associatedFormData[i].Coverages[j].Fields != null) {
  //                 if (this.updateFieldsInvalidFlag(this.associatedFormData[i].Coverages[j].Fields, message))
  //                   break;
  //               }
  //             }
  //           }
  //         }
  //       });
  //       break;
  //     }
  //   }
  // }

  // updateFieldsInvalidFlag(fields: any, msg: any) {
  //   for (let cnt = 0; cnt < fields.length; cnt++) {
  //     if (fields[cnt].Id == msg.Id && msg.Type == "danger" && msg.DisplayText !== null && msg.DisplayText !== "") {
  //       fields[cnt].IsDataInvalid = true;
  //       return true;
  //     }
  //     else if (fields[cnt].Id == msg.Id && msg.Type == "danger" && (msg.DisplayText == null || msg.DisplayText == "")) {
  //       fields[cnt].IsDataInvalid = false;
  //       return true;
  //     }
  //   }
  //   return false;
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

  // //#endregion ISolver
  // getUrlWithParameters(url: string) {
  //   url = url.replace(/{formname}/ig, this.selectedForm.Name).replace(/{formtype}/ig, this.selectedForm.Type);
  //   for (let i = 0; i < this.formsConfig.paramsConfig.UriParameters.length; i++) {
  //     url = url.replace("{" + this.formsConfig.paramsConfig.UriParameters[i].Key + "}", this.formsConfig.paramsConfig.UriParameters[i].Value);
  //   }
  //   return url;
  // }

  // //#endregion "Associate Form Data"

  // //#region Form Details  
  // bindSchedulesData(lstFormData: FormDetails) {
  //   if (lstFormData.Schedules != null) {
  //     for (let j = 0; j < lstFormData.Schedules.length; j++) {
  //       if (lstFormData.Schedules[j].ScheduleItems == undefined) {
  //         lstFormData.Schedules[j].ScheduleItems = [];
  //       }
  //       if (lstFormData.Schedules[j].ScheduleData == null) {
  //         lstFormData.Schedules[j].ScheduleData = [];
  //       }

  //       for (let k = 0; k < lstFormData.Schedules[j].ScheduleData.length; k++) {
  //         lstFormData.Schedules[j].ScheduleData[k].Mode = Mode.Update;
  //         lstFormData.Schedules[j].ScheduleFields = lstFormData.Schedules[j].ScheduleData[k].ScheduleFields; //need to do changes in api side to get schedule fields at schedule object level only not in scheduledata
  //         if (lstFormData.Schedules[j].ScheduleData[k].Fields != null)
  //           this.getFields(lstFormData.Schedules[j].ScheduleData[k].Fields);
  //         if (lstFormData.Schedules[j].ScheduleData[k].ScheduleCoverages != null) {
  //           for (let l = 0; l < lstFormData.Schedules[j].ScheduleData[k].ScheduleCoverages.length; l++) {
  //             if (lstFormData.Schedules[j].ScheduleData[k].ScheduleCoverages[l].Fields != null) {
  //               this.getFields(lstFormData.Schedules[j].ScheduleData[k].ScheduleCoverages[j].Fields);
  //             }
  //           }
  //         }
  //         lstFormData.Schedules[j].ScheduleItems.push(this.GetScheduleItemByScheduleFields(lstFormData.Schedules[j].ScheduleData[k]));
  //       }
  //     }
  //   }
  // }

  // Submit(isSave: boolean) {
  //   try {
  //     this.getScheduleMessages();
  //     this.expandAll(true);
  //     if ((this.formDetailsForm.valid && this.scheduleMsgs.length == 0 && this.dangerMessages.length == 0) || isSave) {
  //       this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.SaveFormDetailsUrl + (isSave ? "/true" : "/false")), this.addDeletedFormData(),
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: Details) => {
  //           this.showForms.emit({ forms: (resp != null ? resp.Forms : null), action: (isSave ? 'save' : 'submit'), isSubmit: this.isAllAssociatedFormDataDeleted() });
  //           this.associatedFormData = [];
  //           this.clearFormDataRulesMessages();
  //           this.clearSchRulesMessages();
  //           this.data = [];
  //         },
  //           (error) => {
  //             this.us.Show(error.message, 'error');
  //           });
  //     }
  //     else {
  //       this.vs.Validate(this.formDetailsForm.form);
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // isAllAssociatedFormDataDeleted() {
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     if (this.associatedFormData[i].Mode != Mode.Delete)
  //       return true;
  //   }
  //   return false;
  // }

  // getScheduleMessages() {
  //   this.scheduleMsgs = [];
  //   this.showAssociateValMsg = false;
  //   for (let i = 0; i < this.associatedFormData.length; i++) {
  //     if (this.associatedFormData[i].Schedules != null) {
  //       for (let j = 0; j < this.associatedFormData[i].Schedules.length; j++) {
  //         if (typeof this.associatedFormData[i].Schedules[j].ScheduleItems == "undefined" || this.associatedFormData[i].Schedules[j].ScheduleItems.length == 0)
  //           this.scheduleMsgs.push({ FormDataName: this.associatedFormData[i].Name, ScheduleName: this.associatedFormData[i].Schedules[j].DisplayName });
  //       }
  //     }
  //   }
  // }

  // addDeletedFormData() {
  //   let lstFormData = JSON.parse(JSON.stringify(this.associatedFormData));
  //   for (let i = 0; i < this.deletedFormData.length; i++) {
  //     lstFormData.push(this.deletedFormData[i]);
  //   }
  //   return lstFormData;
  // }

  // //#region Schedules 

  // addScheduleItem(obj: Section, risk: any) {
  //   try {
  //     this.curntSchDetails = { FormId: risk.FormId, CorrelationId: risk.CorrelationId, ScheduleName: obj.Name, Code: obj.Code };
  //     this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.AddScheduleItemUrl), this.curntSchDetails,
  //       { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((x: Section) => {
  //         if (x != null) {
  //           this.curntSchDetails.Code = x.Code;
  //           if (x.Fields != null)
  //             this.getFields(x.Fields);
  //           if (x.ScheduleCoverages != null) {
  //             for (let j = 0; j < x.ScheduleCoverages.length; j++) {
  //               if (x.ScheduleCoverages[j].Fields != null) {
  //                 this.getFields(x.ScheduleCoverages[j].Fields);
  //               }
  //             }
  //           }
  //           this.curntFormId = risk.FormId;
  //           this.curntSchName = obj.DisplayName;
  //           this.curntSchId = obj.Id;
  //           x.Mode = Mode.Add;
  //           this.schObj = x;
  //           this.isFormDataVsble = false;
  //           this.isSchContentVsble = true;
  //         }
  //       },
  //         (error) => {
  //           this.us.Show(error.message, 'error');
  //         });
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // editScheduleItem(schItem, id: string, formId: string) {
  //   this.curntSchItem = new Section();
  //   try {
  //     main_loop:
  //     for (let i = 0; i < this.associatedFormData.length; i++) {
  //       if (formId == this.associatedFormData[i].FormId) {
  //         this.curntFormId = formId;
  //         for (let j = 0; j < this.associatedFormData[i].Schedules.length; j++) {
  //           if (this.associatedFormData[i].Schedules[j].Id == id) {
  //             this.curntSchName = this.associatedFormData[i].Schedules[j].DisplayName;
  //             for (let k = 0; k < this.associatedFormData[i].Schedules[j].ScheduleData.length; k++) {
  //               if (this.associatedFormData[i].Schedules[j].ScheduleData[k].Code == schItem.Code) {
  //                 this.curntSchId = id;
  //                 this.curntSchItem = this.associatedFormData[i].Schedules[j].ScheduleData[k];
  //                 this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.EditScheduleItemUrl), this.curntSchItem,
  //                   { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: Section) => {
  //                     if (resp != null) {
  //                       if (resp.Fields != null)
  //                         this.getFields(resp.Fields);
  //                       if (resp.ScheduleCoverages != null) {
  //                         for (let j = 0; j < resp.ScheduleCoverages.length; j++) {
  //                           if (resp.ScheduleCoverages[j].Fields != null) {
  //                             this.getFields(resp.ScheduleCoverages[j].Fields);
  //                           }
  //                         }
  //                       }
  //                       if (this.curntSchItem.Mode != Mode.Add) {
  //                         resp.Mode = Mode.Update;
  //                       }
  //                       this.isFormDataVsble = false;
  //                       this.schObj = resp;
  //                       this.isEditSchContentVsble = true;
  //                     }
  //                   },
  //                     (error) => {
  //                       this.us.Show(error.message, 'error');
  //                     });
  //                 break main_loop;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // updateScheduleItem(obj: any) {
  //   try {
  //     if (this.schForm.valid && this.schDangerMessages.length == 0) {
  //       main_formdata:
  //       for (let i = 0; i < this.associatedFormData.length; i++) {
  //         if (this.associatedFormData[i].FormId == this.curntFormId) {
  //           for (let j = 0; j < this.associatedFormData[i].Schedules.length; j++) {
  //             if (this.associatedFormData[i].Schedules[j].Id == this.curntSchId) {
  //               //to update data for selected schedule item
  //               for (let k = 0; k < this.associatedFormData[i].Schedules[j].ScheduleData.length; k++) {
  //                 if (this.associatedFormData[i].Schedules[j].ScheduleData[k].Code == obj.Code) {
  //                   this.associatedFormData[i].Schedules[j].ScheduleData[k] = obj;
  //                   break;
  //                 }
  //               }
  //               //to update and show data in grid for selected schedule item
  //               for (let l = 0; l < this.associatedFormData[i].Schedules[j].ScheduleItems.length; l++) {
  //                 if (this.associatedFormData[i].Schedules[j].ScheduleItems[l].Code == obj.Code) {
  //                   for (let m = 0; m < obj.Fields.length; m++) {
  //                     //for (let n = 0; n < obj.ScheduleFields.length; n++) {
  //                     //if (obj.Fields[m].Name == obj.ScheduleFields[n].Field) {
  //                     if (obj.Fields[m].Type == 'DateTime' || obj.Fields[m].Type == 'DatePicker') {
  //                       if (obj.Fields[m].Value != null && obj.Fields[m].Value != "") {
  //                         obj.Fields[m].Value = new Date(obj.Fields[m].Value).toLocaleDateString();
  //                       }
  //                     }
  //                     this.associatedFormData[i].Schedules[j].ScheduleItems[l][obj.Fields[m].Name] = obj.Fields[m].Value;
  //                     //break;
  //                     //}
  //                     //}
  //                   }
  //                   break;
  //                 }
  //               }
  //               this.isEditSchContentVsble = false;
  //               this.isFormDataVsble = true;
  //               this.clearSchRulesMessages();
  //               break main_formdata;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     else {
  //       this.vs.Validate(this.schForm.form);
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // clearSchRulesMessages() {
  //   this.schRulesMessages = [];
  //   this.schDangerMessages = [];
  //   this.schWarningMessages = [];
  // }

  // deleteScheduleItem(schItem, id) {
  //   try {
  //     this.us.Confirmation('Are you sure, do you want to delete?').subscribe(x => {
  //       if (x) {
  //         form_data:
  //         for (let i = 0; i < this.associatedFormData.length; i++) {
  //           for (let j = 0; j < this.associatedFormData[i].Schedules.length; j++) {
  //             if (this.associatedFormData[i].Schedules[j].Id == id) {
  //               //to change the mode of deleted record
  //               for (let k = 0; k < this.associatedFormData[i].Schedules[j].ScheduleData.length; k++) {
  //                 if (this.associatedFormData[i].Schedules[j].ScheduleData[k].Code == schItem.Code) {
  //                   this.associatedFormData[i].Schedules[j].ScheduleData[k].Mode = Mode.Delete;
  //                   break;
  //                 }
  //               }
  //               //to delete the schedule item
  //               for (let k = 0; k < this.associatedFormData[i].Schedules[j].ScheduleItems.length; k++) {
  //                 if (this.associatedFormData[i].Schedules[j].ScheduleItems[k].Code == schItem.Code) {
  //                   this.associatedFormData[i].Schedules[j].ScheduleItems.splice(k, 1);
  //                   break form_data;
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //       else {
  //       }
  //     });
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // saveScheduleItem(obj: any) {
  //   try {
  //     if (this.schForm.valid && this.schDangerMessages.length == 0) {
  //       this.clearSchRulesMessages();
  //       form_data:
  //       for (let i = 0; i < this.associatedFormData.length; i++) {
  //         if (this.associatedFormData[i].FormId == this.curntFormId && this.associatedFormData[i].Schedules != null) {
  //           for (let j = 0; j < this.associatedFormData[i].Schedules.length; j++) {
  //             if (this.associatedFormData[i].Schedules[j].Id == this.curntSchId) {
  //               this.associatedFormData[i].Schedules[j].ScheduleFields = obj.ScheduleFields;
  //               // need to get clarification on data, earlier getting ScheduleFields in scheduledata item 
  //               if (this.associatedFormData[i].Schedules[j].ScheduleItems == undefined) {
  //                 this.associatedFormData[i].Schedules[j].ScheduleItems = [];
  //               }
  //               this.associatedFormData[i].Schedules[j].ScheduleItems.push(this.GetScheduleItemByScheduleFields(obj));
  //               if (this.associatedFormData[i].Schedules[j].ScheduleData == null) {
  //                 this.associatedFormData[i].Schedules[j].ScheduleData = [];
  //               }
  //               this.associatedFormData[i].Schedules[j].ScheduleData.push(obj);
  //               this.isSchContentVsble = false;
  //               this.isFormDataVsble = true;
  //               break form_data;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     else {
  //       this.vs.Validate(this.schForm.form);
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // cancelScheduleItem(actionName: string) {
  //   try {
  //     if (actionName == 'add') {
  //       let obj = { ScheduleId: this.curntSchDetails.Code, CorrelationId: this.curntSchDetails.CorrelationId, FormId: this.curntSchDetails.FormId };
  //       this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.CancelScheduleItemUrl), obj,
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: any) => {
  //           this.clearSchRulesMessages();
  //           this.isSchContentVsble = false;
  //           this.isEditSchContentVsble = false;
  //           this.isFormDataVsble = true;
  //         },
  //           (error) => {
  //             this.us.Show(error.message, 'error');
  //           });
  //     }
  //     else {
  //       this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.CancelEditScheduleItemUrl), this.curntSchItem,
  //         { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: any) => {
  //           this.clearSchRulesMessages();
  //           this.isEditSchContentVsble = false;
  //           this.isFormDataVsble = true;
  //         },
  //           (error) => {
  //             this.us.Show(error.message, 'error');
  //           });
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // GetScheduleItemByScheduleFields(schObj: Section) {
  //   if (schObj.ScheduleFields != null && schObj.Fields != null) {
  //     let obj = {};
  //     for (let i = 0; i < schObj.ScheduleFields.length; i++) {
  //       for (let j = 0; j < schObj.Fields.length; j++) {
  //         if (schObj.ScheduleFields[i].Field == schObj.Fields[j].Name) {
  //           if (schObj.Fields[j].Type == "DateTime" || schObj.Fields[j].Type == "DatePicker") {
  //             obj[schObj.ScheduleFields[i].Field] = new Date(schObj.Fields[j].Value).toLocaleDateString();
  //           }
  //           else {
  //             obj[schObj.ScheduleFields[i].Field] = schObj.Fields[j].Value;
  //           }
  //           break;
  //         }
  //       }
  //     }
  //     obj["Code"] = schObj.Code;
  //     return obj;
  //   }
  // }

  // onSchCtrlChange(fld: Field) {
  //   this.executeScheduleFields({
  //     Id: fld.Id, Name: fld.Name, Value: fld.Value, Type: "Attribute", Parent: this.schObj.FormId, RuleType: fld.RuleType,
  //     ParentName: this.schObj.Name
  //   });
  // }

  // onScheduleCoverageChange(schCov: Coverage) {
  //   this.executeScheduleFields({
  //     Id: schCov.Id, Name: schCov.Name, Value: schCov.IsSelected, Type: "Coverage", Parent: this.schObj.FormId, RuleType: schCov.RuleType,
  //     ParentName: ""
  //   });
  // }

  // executeScheduleFields(schObj: any) {
  //   try {
  //     this.http.post(this.getUrlWithParameters(this.formsConfig.urlConfig.ExecuteFieldsUrl), schObj,
  //       { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: any) => {
  //         if (resp != null) {
  //           this.updateScheduleFields(resp);
  //           if (resp.Forms != null) {
  //             this.updateForms.emit(resp.Forms);
  //           }
  //         }
  //       },
  //         (error) => {
  //           this.us.Show(error.message, 'error');
  //         });
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // updateScheduleFields(data: any) {
  //   if (data.Details != null) {
  //     let curntFld = null;
  //     data.Details.forEach(newFld => {
  //       curntFld = null;
  //       for (let j = 0; j < this.schObj.Fields.length; j++) {
  //         if (newFld.Id == this.schObj.Fields[j].Id) {
  //           curntFld = this.schObj.Fields[j];
  //           break;
  //         }
  //       }
  //       if (curntFld == null && this.schObj.ScheduleCoverages != null) {
  //         main_loop:
  //         for (let l = 0; l < this.schObj.ScheduleCoverages.length; l++) {
  //           if (this.schObj.ScheduleCoverages[l].Fields != null) {
  //             for (let m = 0; m < this.schObj.ScheduleCoverages[l].Fields.length; m++) {
  //               if (newFld.Id == this.schObj.ScheduleCoverages[l].Fields[m].Id) {
  //                 curntFld = this.schObj.ScheduleCoverages[l].Fields[m];
  //                 break main_loop;
  //               }
  //             }
  //           }
  //         }
  //       }
  //       if (curntFld != null) {
  //         if (newFld.UIRuleIndicator) {
  //           curntFld.IsEnabled = newFld.IsEnabled;
  //           curntFld.IsVisible = newFld.IsVisible;
  //         }
  //         if (newFld.ProductChoicesIndicator) {
  //           if (curntFld.Type == 'DateTime' || curntFld.Type == 'DatePicker') {
  //             if (newFld.UserValue != null && newFld.UserValue != "") {
  //               newFld.UserValue = new Date(newFld.UserValue);
  //             }
  //           }
  //           if ((newFld.DataType == "Numeric" || newFld.DataType == "Integer" || newFld.DataType == "Decimal") && newFld.UserValue != null && newFld.UserValue != "" || (isNaN(parseFloat(newFld.UserValue)) == false)) {
  //             newFld.UserValue = parseFloat(newFld.UserValue);
  //           }
  //           if (newFld.Values != null) {
  //             // if (newFld.ControlType == "dropdown") {
  //             //   curntFld.Values = newFld.Values;
  //             // }
  //             curntFld.Values = newFld.Values;
  //             if (newFld.Values.indexOf(curntFld.Value) > -1) {
  //               newFld.UserValue = curntFld.Value;
  //             } else {
  //               curntFld.Value = '';
  //             }
  //           }
  //           if (newFld.UserValue != null && newFld.UserValue != '') {
  //             if (newFld.Type == 'CheckBox') {
  //               newFld.UserValue = (newFld.UserValue == 'true' || newFld.UserValue == 'True');
  //             }
  //             curntFld.Value = newFld.UserValue;
  //           }
  //           if (newFld.Min != null && newFld.Min != '') {
  //             curntFld.Min = newFld.Min;
  //             if (parseFloat(curntFld.Value) < parseFloat(newFld.Min)) {
  //               curntFld.Value = newFld.Min;
  //             }
  //           }
  //           if (newFld.Max != null && newFld.Max != '') {
  //             curntFld.Max = newFld.Max;
  //             if (parseFloat(curntFld.Value) > parseFloat(newFld.Max)) {
  //               curntFld.Value = newFld.Max;
  //             }
  //           }
  //         }
  //       }
  //     });

  //     //update coverages
  //     if (data.Coverages != null && data.Coverages.length > 0) {
  //       data.Coverages.filter(covrg => {
  //         this.updateScheduleCoverages(covrg);
  //       });
  //     }
  //     if (data.Messages != null) {
  //       this.readScheduleISolverMessages(data.Messages);
  //     }
  //   }
  // }

  // updateScheduleCoverages(newCoverage: Coverage) {
  //   for (let i = 0; i < this.schObj.ScheduleCoverages.length; i++) {
  //     if (newCoverage.IsAdded && !this.isScheduleCoverageExists(newCoverage.Id)) {
  //       if (newCoverage.Fields != null) {
  //         newCoverage.Fields.filter(fld => {
  //           if (fld.Type == 'DateTime' || fld.Type == 'DatePicker') {
  //             if (fld.Value != null && fld.Value != "") {
  //               fld.Value = new Date(fld.Value);
  //             }
  //           }
  //           if ((fld.DataType == "Numeric" || fld.DataType == "Integer" || fld.DataType == "Decimal") && fld.UserValue != null && fld.UserValue != "") {
  //             fld.Value = parseFloat(fld.Value);
  //           }
  //           if (fld.Type == 'CheckBox') {
  //             fld.Value = (fld.Value == 'true' || fld.Value == 'True');
  //           }
  //         })
  //       }
  //       this.schObj.ScheduleCoverages.push(newCoverage);
  //       break;
  //     }
  //     else if (newCoverage.IsDeleted) {
  //       this.deleteExistingScheduleCoverage(newCoverage.Id);
  //       break;
  //     }
  //     if (newCoverage.Id == this.schObj.ScheduleCoverages[i].Id) {
  //       if (newCoverage.ProductChoicesIndicator) {
  //         this.schObj.ScheduleCoverages[i].IsSelected = newCoverage.IsSelected;
  //         this.schObj.ScheduleCoverages[i].IsMandatory = newCoverage.IsMandatory;
  //       }
  //       if (newCoverage.UIRuleIndicator) {
  //         this.schObj.ScheduleCoverages[i].IsVisible = newCoverage.IsVisible;
  //       }
  //       break;
  //     }
  //   }
  // }

  // isScheduleCoverageExists(coverageId: String) {
  //   if (this.schObj.ScheduleCoverages != null) {
  //     for (let j = 0; j < this.schObj.ScheduleCoverages.length; j++) {
  //       if (this.schObj.ScheduleCoverages[j].Id == coverageId) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // deleteExistingScheduleCoverage(coverageId: string) {
  //   if (this.schObj.ScheduleCoverages != null) {
  //     for (let j = 0; j < this.schObj.ScheduleCoverages.length; j++) {
  //       if (coverageId == this.schObj.ScheduleCoverages[j].Id) {
  //         this.schObj.ScheduleCoverages.splice(j, 1);
  //         return;
  //       }
  //     }
  //   }
  // }

  // //schedule rules messages start
  // readScheduleISolverMessages(messages: any[]) {
  //   if (this.schRulesMessages.length == 0) {
  //     this.schRulesMessages = messages;
  //   } else {
  //     this.schRulesMessages = this.updateScheduleMessages(this.schRulesMessages, messages);
  //   }
  //   if (messages != null) {
  //     this.schDangerMessages = this.schRulesMessages.filter(message => { return message.Type == 'danger' && message.DisplayText !== null && message.DisplayText !== "" })
  //     this.schWarningMessages = this.schRulesMessages.filter(message => { return message.Type == 'warning' && message.DisplayText !== null && message.DisplayText !== "" })
  //     this.updateScheduleDtxInvalidFlag(messages);
  //   }
  // }

  // updateScheduleDtxInvalidFlag(messages: any[]) {
  //   let fldExists = false;
  //   messages.forEach(message => {
  //     fldExists = false;
  //     if (this.schObj.Fields != null) {
  //       fldExists = this.updateScheduleFieldsInvalidFlag(this.schObj.Fields, message);
  //     }
  //     if (!fldExists) {
  //       if (this.schObj.ScheduleCoverages != null) {
  //         for (let i = 0; i < this.schObj.ScheduleCoverages.length; i++) {
  //           if (this.schObj.ScheduleCoverages[i].Fields != null) {
  //             if (this.updateScheduleFieldsInvalidFlag(this.schObj.ScheduleCoverages[i].Fields, message))
  //               break;
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // updateScheduleFieldsInvalidFlag(fields: any, msg: any) {
  //   for (let cnt = 0; cnt < fields.length; cnt++) {
  //     if (fields[cnt].Id == msg.Id && msg.Type == "danger" && msg.DisplayText != null && msg.DisplayText !== "") {
  //       fields[cnt].IsDataInvalid = true;
  //       return true;
  //     }
  //     else if (fields[cnt].Id == msg.Id && msg.Type == "danger" && (msg.DisplayText == null || msg.DisplayText == "")) {
  //       fields[cnt].IsDataInvalid = false;
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // updateScheduleMessages(oldMessages: any[], newMessages: any[]) {
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
  //schedule rules messages end

  //#endregion Schedules End

  //#endregion
}
