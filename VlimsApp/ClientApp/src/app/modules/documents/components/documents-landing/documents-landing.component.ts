import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { WorkitemsService } from '../../../services/workitems.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExistingDocumentRequest, RequestContext, RequestContext1, WorkItemsConfiguration } from '../../../../models/model';
import { ExistingDocumentsService } from 'src/app/modules/manager/services/existing-documents.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-documents-landing',
  templateUrl: './documents-landing.component.html',
  styleUrls: ['./documents-landing.component.scss']
})
export class DocumentsLandingComponent implements OnInit {
  public userRole: string;
  public storage = localStorage;
  public userName: string;
  requestObj = new RequestContext1();
  public workItems : Array<WorkItemsConfiguration> = [];
  public reminderDocs: any[] = [];
  viewreminderDocs = false;
  workItemsCount = 0;
  reviewCount = '';
  approveCount = '';  
  constructor(private router: Router, private loader: NgxSpinnerService, private workitemssvc: WorkitemsService,public commonsvc: CommonService, private existdocService: ExistingDocumentsService) {
    this.userRole = JSON.parse(this.storage['user']).Role.toLowerCase();
    this.userName = this.storage['username'].toLowerCase();
  }

  ngOnInit() {
    this.existingDocumentAll()
    this.getworkflowitems();    
  }

  navigateTo(navTo: any) {
    if(navTo === 'assigned'){
      this.router.navigate(['/assigned']); 
    } else if (navTo === 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else if (navTo === 'document-master') {
      this.router.navigate(['/document-master']);
    } else if (navTo === 'document-manager') {
      this.router.navigate(['/document-manager']);
    } else if (navTo === 'admin') {
      this.router.navigate(['/admin']);
    } else if (navTo === 'reports') {
      this.router.navigate(['/reports']);
    }

  }

  getworkflowitems() {
    this.loader.show();
    this.requestObj.PageNumber = 1;
    this.requestObj.PageSize = 1000;
    this.requestObj.Id = 0;
    this.requestObj.UserName = this.userName;    
    return this.workitemssvc.getworkitems(this.requestObj, this.userName).subscribe((data: any) => {
      this.workItems = data.Response;
      this.workItemsCount = 0;
      if(this.workItems)
      {
        let approveCnt = this.workItems.filter(item => item.Status.toLowerCase() == 'in-progress' && item.ActionType.toLowerCase() == 'approve').length;
        let reviewCnt = this.workItems.filter(item => item.Status.toLowerCase() == 'in-progress' && item.ActionType.toLowerCase() == 'review').length;
        if(approveCnt > 0)
           this.approveCount = approveCnt < 10 ? '0' + approveCnt : '' + approveCnt;
        if(reviewCnt > 0)
          this.reviewCount = reviewCnt < 10 ? '0' + reviewCnt : '' + reviewCnt;
      }
      this.workItemsCount = this.workItems.filter(item => item.Status.toLowerCase() == 'inprogress').length;
      this.loader.hide();
 
    }, er => {
      // this.toastr.error('loading failed');
      this.loader.hide();
    });

  }

  existingDocumentAll(){
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.existdocService.getAllDocuments(objrequest).subscribe((data: any) =>{
      //console.log(data?.response); 
      let filterdbyreviewDate:any[] = [];
      if (data != null && data.exisitingDocuments.length > 0 && data != undefined) {        
        filterdbyreviewDate = data?.exisitingDocuments.filter((p:any) => p.reviewDate && p.reviewDate != 'NA');
      }
      filterdbyreviewDate = filterdbyreviewDate.filter((item:any) => {
        const currentDate = new Date();
        const reviewDatePlus15Days = new Date();
        reviewDatePlus15Days.setDate(currentDate.getDate() + 15);
  
        currentDate.setDate(currentDate.getDate() - 0);
        // Parse reviewDate string to Date object
        const reviewDate = new Date(item.reviewDate??'');
  
        return (reviewDate > currentDate && reviewDate < reviewDatePlus15Days);        
      });
      filterdbyreviewDate.forEach((item: any) => {    
        const reviewDate:Date = new Date(item.reviewDate??'');
        item.reviewCountDownValue = this.calculateDiff(reviewDate)
      })
      this.reminderDocs = filterdbyreviewDate;  
      if(this.reminderDocs && this.reminderDocs.length >0){
         this.viewreminderDocs = true;
      }
    });
  }

  calculateDiff(dateSent: Date){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    let Difference_In_Time =
    dateSent.getTime() - currentDate.getTime();
 
    // Calculating the no. of days between
    // two dates
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));

    //return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

}
