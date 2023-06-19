import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { UrlConfig, ParametersConfig, Form, UIFormDetails, Details } from './form';
import { FormDetails, EntityType } from '../formriskfilters/formdetails';
// import { FormsConfigService } from '../forms-config.service';
import { SortDescriptor } from '@progress/kendo-data-query';
import { NgControl } from "@angular/forms";

@Component({
  selector: 'forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {
  // fcforms: Array<Form> = [];
  // forms: Array<Form> = [];
  // tmpForms: Array<Form> = [];
  // selForm: Form = null;
  @Input('urlConfig') urlConfig: UrlConfig;
  @Input('paramsConfig') paramsConfig: ParametersConfig;
  @Input('viewMode') viewMode: boolean;
  @Input('editNonPremiumBearingForms') editNonPremiumBearingForms: boolean = false;
  @Input("elementRef") control: NgControl;
  // formType: string = 'mandatory';

  // //FormDetails
  // lstFormDetails: FormDetails[] = [];
  // lstRisks: FormDetails[] = [];
  // associatedFormData: FormDetails[] = [];
  // formsVsble: boolean = true;
  // isFltrVsble: boolean = false;
  // riskTypes: EntityType[] = [];
  // formNumber: string = '';
  // selectedRiskType = new EntityType;
  // viewType: string = 'All Forms';
  // premiumBearing: string = 'Select';
  // pageNumber: number = 0;
  // curntPageNum: number = 0;
  // public sort: SortDescriptor[] = [{
  //   field: 'SequenceNumber',
  //   dir: 'asc'
  // }];
  //End
  // public viewForms = [{ 'text': 'Selected Forms', 'value': 'Selected Forms' }, { 'text': 'Submitted Forms', 'value': 'Submitted Forms' }];
  // public lstPremiumBearing = [{ 'text': 'Yes', 'value': 'Yes' }, { 'text': 'No', 'value': 'No' }];
  constructor(public http: HttpClient, private us: UtilityService) { }

  ngOnInit() {
    // this.formsConfig.urlConfig = this.urlConfig;
    // this.formsConfig.paramsConfig = this.paramsConfig;
    // this.formsConfig.viewMode = this.viewMode;
    // this.formsConfig.editNonPremiumBearingForms = this.editNonPremiumBearingForms;
    // this.selectedRiskType = { DisplayName: "Select", RiskType: "Select" };
    // try {
    //   this.http.get(this.getUrlWithParameters(this.urlConfig.GetFormsUrl),
    //     { headers: new HttpHeaders(this.paramsConfig.HttpHeaders) }).subscribe((res: Form[]) => {
    //       if (res != null && res.length > 0) {
    //         this.fcforms = res;
    //         this.tmpForms = res;
    //         this.getRisktypes();
    //         this.getFormsByFormType('mandatory');
    //       }
    //     }, (error) => {
    //       this.us.Show(error.message, 'error');
    //     });
    // }
    // catch (ex) {
    //   this.us.Show(ex.message, 'error');
    // }
  }
  // showAllForms(obj: any) {
  //   if (obj.forms != null && obj.forms.length > 0) {
  //     this.updateForms(obj.forms);
  //   }
  //   else {
  //     this.filterForms();
  //   }
  //   if ((obj.action == 'submit')) {
  //     for (let i = 0; i < this.fcforms.length; i++) {
  //       if (this.selForm.Id == this.fcforms[i].Id) {
  //         this.fcforms[i].IsSubmit = obj.isSubmit;
  //         break;
  //       }
  //     }
  //   }
  //   if (this.forms.length <= this.curntPageNum)
  //     this.pageNumber = this.curntPageNum - this.paramsConfig.PageSize;
  //   else
  //     this.pageNumber = this.curntPageNum;
  //   this.formsVsble = true;
  // }
  // enterDetails(obj: any) {
  //   try {
  //     this.selForm = obj;
  //     this.http.get(this.getUrlWithParameters(this.urlConfig.GetRiskDetailsUrl, obj.Name, obj.Type),
  //       { headers: new HttpHeaders(this.paramsConfig.HttpHeaders) }).subscribe((resp: UIFormDetails) => {
  //         if (resp != null) {
  //           this.formsVsble = false;
  //           if (resp.FormData != null && resp.FormData.length > 0) {
  //             this.lstRisks = resp.FormData;
  //           }
  //           if (resp.Forms != null) {
  //             this.updateForms(resp.Forms);
  //           }
  //         }
  //       }, (error) => {
  //         this.us.Show(error.message, 'error');
  //       });
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // updateForms(forms: Form[]) {
  //   let j = 0;
  //   for (let i = 0; i < forms.length; i++) {
  //     let k = 0;
  //     let obj = { fmsCount: 0, isFormPush: true, isFormDeleted: false };
  //     for (k; k < this.fcforms.length; k++) {
  //       if (forms[i].Name == this.fcforms[k].Name) {
  //         obj.fmsCount++;
  //         if (obj.fmsCount == 2) break;
  //         if (obj.isFormPush) {
  //           j = k;
  //           obj.isFormPush = false;
  //         }
  //       }
  //     }
  //     //to add the form when IsAdded = true
  //     if (forms[i].IsAdded) {
  //       if (!obj.isFormPush && this.fcforms[j].RiskIds == null) { // && !this.fcforms[j].IsPolicyForm need confirmation
  //         obj.isFormPush = true;
  //         this.fcforms.splice(j, 1);
  //       }
  //       else if (!!forms[i].RiskIds && !obj.isFormPush && !!this.fcforms[j].RiskIds) {
  //         this.addriskids(forms[i], j, obj);
  //         if (obj.isFormDeleted) {
  //           if (obj.fmsCount == 2)
  //             this.addriskids(forms[i], k - 1, obj);
  //           else {
  //             obj.isFormPush = true;
  //           }
  //         }
  //         else if (obj.fmsCount == 2)
  //           this.addriskids(forms[i], k, obj);
  //       }
  //       if (obj.isFormPush && obj.fmsCount < 2) {
  //         this.fcforms.push(forms[i]);
  //       }
  //     }
  //     else if (forms[i].IsDeleted && !obj.isFormPush) { //to delete the form when IsDeleted = true
  //       if (obj.fmsCount == 2) {
  //         if (!!this.fcforms[k].RiskIds) {
  //           let npIds = forms[i].RiskIds.filter(rskId => {
  //             return this.fcforms[k].RiskIds.indexOf(rskId) >= 0;
  //           });
  //           this.deleteForm(k, npIds);
  //         }
  //       }
  //       if (!!this.fcforms[j].RiskIds) {
  //         let presentIds = [];
  //         if (!!forms[i].RiskIds && !obj.isFormPush && !!this.fcforms[j].RiskIds) {
  //           presentIds = forms[i].RiskIds.filter(rskId => {
  //             return this.fcforms[j].RiskIds.indexOf(rskId) >= 0;
  //           });
  //         }
  //         this.deleteForm(j, presentIds);
  //       }
  //       else {
  //         this.deleteForm(j, null);
  //       }
  //     }
  //   }
  //   this.filterForms();
  // }

  // addriskids(forms, j, obj: any) { //forms, j, filteredformsPos, obj: any
  //   let notpresentIds = null, presentIds = null;
  //   notpresentIds = forms.RiskIds.filter(id => {
  //     return this.fcforms[j].RiskIds.indexOf(id) < 0;
  //   });
  //   presentIds = forms.RiskIds.filter(id => {
  //     return this.fcforms[j].RiskIds.indexOf(id) >= 0;
  //   });
  //   if (!!notpresentIds && notpresentIds.length > 0) {
  //     if (forms.Type == this.fcforms[j].Type) {
  //       Array.prototype.push.apply(this.fcforms[j].RiskIds, notpresentIds);
  //     }
  //     if (obj.fmsCount == 1 && forms.Type != this.fcforms[j].Type) {
  //       obj.isFormPush = true;
  //     }
  //   }
  //   if (!!presentIds && presentIds.length > 0) {
  //     if (forms.Type != this.fcforms[j].Type) {
  //       if (presentIds.length != this.fcforms[j].RiskIds.length) {
  //         this.fcforms[j].RiskIds = this.fcforms[j].RiskIds.filter(function (el) {
  //           return presentIds.indexOf(el) < 0;
  //         });
  //       }
  //       else {
  //         this.fcforms.splice(j, 1);
  //       }
  //       obj.isFormDeleted = true;
  //     }
  //   }
  // }

  // deleteForm(j, presentIds) { // j, presentIds, m
  //   if (presentIds && presentIds.length > 0) {
  //     this.fcforms[j].RiskIds = this.fcforms[j].RiskIds.filter(function (el) {
  //       return presentIds.indexOf(el) < 0;
  //     });
  //   }
  //   if (this.fcforms[j].RiskIds == null || this.fcforms[j].RiskIds.length == 0) {
  //     this.fcforms.splice(j, 1);
  //   }
  // }

  // public onPageChange(state: any): void {
  //   this.pageNumber = state.skip;
  //   this.curntPageNum = state.skip;
  // }

  // getRisktypes() {
  //   let isPolicy = false;
  //   this.fcforms.forEach(form => {
  //     let isExists = false;
  //     //to get rsktypes which is used as source for types dropdownlist in filter
  //     if (form.RiskType.length > 0) {
  //       form.RiskType.forEach(type => {
  //         isExists = false;
  //         for (let k = 0; k < this.riskTypes.length; k++) {
  //           if (this.riskTypes[k].RiskType == type.RiskType) {
  //             isExists = true;
  //             break;
  //           }
  //         }
  //         if (!isExists && type != null && type.RiskType != "") {
  //           if (form.IsPolicyForm && !isPolicy) {
  //             this.riskTypes.push({ RiskType: type.RiskType, DisplayName: 'Policy' });
  //             isPolicy = true;
  //           }
  //           else if (!form.IsPolicyForm) {
  //             this.riskTypes.push(type);
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

  // getFormsByFormType(formType: string, isFilterClick?: boolean) {
  //   this.formType = formType;
  //   let flg = false;
  //   if (formType == 'mandatory') {
  //     this.forms = this.tmpForms.filter(x => x.Type.toLowerCase() == formType);
  //     if (isFilterClick) {
  //       if (this.forms.length == 0) {
  //         this.forms = this.tmpForms.filter(x => (x.Type.toLowerCase() == 'optional' || x.Type.toLowerCase() == 'conditional'));
  //         flg = true;
  //       }
  //       if (flg && this.forms.length > 0)
  //         this.formType = "optional";
  //     }
  //   }
  //   else {
  //     this.forms = this.tmpForms.filter(x => (x.Type.toLowerCase() == 'optional' || x.Type.toLowerCase() == 'conditional'));
  //     if (isFilterClick) {
  //       if (this.forms.length == 0) {
  //         this.forms = this.tmpForms.filter(x => x.Type.toLowerCase() == "mandatory");
  //         flg = true;
  //       }
  //       if (flg && this.forms.length > 0)
  //         this.formType = "mandatory";
  //     }
  //   }
  // }

  // formSelect(form: Form) {
  //   try {
  //     if (form.IsSelected) {
  //       if ((!form.RequireAdditionalDetails && form.IsPolicyForm) || (form.IsPolicyForm && form.PremiumBearing.toLowerCase() == 'no')) {
  //         this.http.post(this.getUrlWithParameters(this.urlConfig.SaveFormDetailsUrl, form.Name, form.Type) + (form.PremiumBearing.toLowerCase() == "no" ? "/true" : "/false"), null,
  //           { headers: new HttpHeaders(this.formsConfig.paramsConfig.HttpHeaders) }).subscribe((resp: Details) => {
  //             if (form.PremiumBearing.toLowerCase() != 'no')
  //               form.IsSubmit = true;
  //             if (resp != null && resp.Forms != null) {
  //               this.updateForms(resp.Forms);
  //             }
  //           },
  //             (error) => {
  //               this.us.Show(error.message, 'error');
  //             });
  //       }
  //     }
  //     else {
  //       //to delete the all associated form data for current form
  //       if (form.IsSubmit || (form.IsPolicyForm && form.PremiumBearing.toLowerCase() == 'no')) {
  //         this.us.Confirmation('Are you sure, do you want to unselect?').subscribe(x => {
  //           if (x) {
  //             this.http.get(this.getUrlWithParameters(this.urlConfig.ResetFormDetailsUrl, form.Name, form.Type, form.IsSelected),
  //               { headers: new HttpHeaders(this.paramsConfig.HttpHeaders) }).subscribe((resp: Details) => {
  //                 form.IsSubmit = false;
  //                 if (resp != null && resp.Forms != null) {
  //                   this.updateForms(resp.Forms);
  //                 }
  //               }, (error) => {
  //                 this.us.Show(error.message, 'error');
  //               });
  //           }
  //           else {
  //             form.IsSelected = true;
  //           }
  //         });
  //       }
  //     }
  //   }
  //   catch (ex) {
  //     this.us.Show(ex.message, 'error');
  //   }
  // }

  // //to filter the forms by specified filter criteria
  // filterForms(isFilter?: boolean) {
  //   this.tmpForms = this.fcforms;
  //   this.tmpForms = this.tmpForms.filter(s => {
  //     let flag = true;
  //     if (this.formNumber != "")
  //       flag = (s.DisplayName.toLowerCase().includes(this.formNumber.toLowerCase()) || s.Number.toLowerCase().indexOf(this.formNumber.toLowerCase()) > -1);
  //     if (!flag) return flag;
  //     if (this.viewType != "All Forms") {
  //       if (this.viewType == "Selected Forms") {
  //         flag = (s.IsSelected == true);
  //       }
  //       else {
  //         flag = (s.IsSubmit == true);
  //       }
  //     }
  //     else {
  //       flag = true;
  //     }
  //     if (!flag) return flag;
  //     if (this.premiumBearing != "Select")
  //       flag = (s.PremiumBearing.toLowerCase() == this.premiumBearing.toLowerCase());
  //     if (!flag) return flag;
  //     if (this.selectedRiskType.RiskType != "Select")
  //       flag = (s.RiskType.filter(t => t.RiskType.toLowerCase() == this.selectedRiskType.RiskType.toLowerCase())).length != 0;
  //     if (!flag) return flag;
  //     return flag;
  //   });

  //   this.getFormsByFormType(this.formType, isFilter);
  // }

  // //to clear the filter and show all forms
  // clearFilter() {
  //   this.formNumber = '';
  //   this.selectedRiskType = { DisplayName: "Select", RiskType: "Select" };
  //   this.viewType = "All Forms";
  //   this.premiumBearing = "Select";
  //   this.tmpForms = this.fcforms;
  //   this.getFormsByFormType(this.formType);
  // }

  // getUrlWithParameters(url: string, formname?: string, formtype?: string, isselected?: any) {
  //   url = url.replace(/{formname}/ig, formname).replace(/{formtype}/ig, formtype).replace(/{isselected}/ig, isselected);
  //   for (let i = 0; i < this.paramsConfig.UriParameters.length; i++) {
  //     url = url.replace("{" + this.paramsConfig.UriParameters[i].Key + "}", this.paramsConfig.UriParameters[i].Value);
  //   }
  //   return url;
  // }

  // public validateForms() {
  //   for (let i = 0; i < this.fcforms.length; i++) {
  //     if (this.fcforms[i].IsSelected && this.fcforms[i].PremiumBearing.toLowerCase() == 'yes' && !this.fcforms[i].IsSubmit) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
}
