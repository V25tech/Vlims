import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UtilityService } from 'src/app/utility.service';
import { ValidatorService } from 'src/app/core/validator.service';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate-guard.service';
import { CustomFunctionService } from 'src/app/customfunction.service';
import { Subscription } from "rxjs";
import { ApplicationContextService } from 'src/app/application-context.service';import { Title } from '@angular/platform-browser';


declare var $: any;
@Component({
  selector: 'exp-container-AddDocumentRequest',
  templateUrl: './AddDocumentRequest.component.html'
})
export class AddDocumentRequestComponent implements OnInit, CanComponentDeactivate
{
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.AddDocumentRequestForm.dirty; //this.AddDocumentRequestForm.valid &&

  }
  @ViewChild('AddDocumentRequestForm', null) AddDocumentRequestForm: NgForm;@ViewChild('formsec4338431244c3bca382dd', null) public formsec4338431244c3bca382dd:NgModelGroup;
  DocumentNav: string = "Add Document Request";
  btnProductText="Add"
  get UploadSaveUrlfileupload702a76c73d55549d0515():string{return this.apiServc.serverconfig.getBaseUrl('')+ ''} removeUrlfileupload702a76c73d55549d0515:string=this.apiServc.serverconfig.getBaseUrl('') +'';
  constructor(public vs: ValidatorService,public us: UtilityService, public apiServc: ApiService,public cfs:CustomFunctionService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute,private title: Title){
	title.setTitle('Add Document Request');
  }
  ngOnInit(){

  }
  Document_Cancel_Click(e) {
    this.router.navigate(["DocumentRequest"], { queryParamsHandling: "merge" });

  }





}
