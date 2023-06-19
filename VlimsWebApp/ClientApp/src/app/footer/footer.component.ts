import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UtilityService } from 'src/app/utility.service';
import { ValidatorService } from 'src/app/core/validator.service';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate-guard.service';
import { CustomFunctionService } from 'src/app/customfunction.service';
import { Subscription } from "rxjs";
import { ApplicationContextService } from 'src/app/application-context.service';


declare var $: any;
@Component({
  selector: 'exp-container-Footer',
  templateUrl: './Footer.component.html'
})
export class FooterComponent implements OnInit, CanComponentDeactivate 
{
  validationMessages : string[] = [];
  subscription: Subscription = new Subscription();
   canDeactivate(): boolean {
    return !this.FooterForm.dirty; //this.FooterForm.valid &&
 
  }
  @ViewChild('FooterForm', null) FooterForm: NgForm;
  
  
  constructor(public vs: ValidatorService,public cfs:CustomFunctionService,public us: UtilityService, public apiServc: ApiService,public appContext: ApplicationContextService, private router: Router, private route: ActivatedRoute){       
	
  }  
  ngOnInit(){
   
  }
  
  
  
  
  
}