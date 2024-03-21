import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { WorkitemsService } from '../../../services/workitems.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestContext1, WorkItemsConfiguration } from '../../../../models/model';

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
  workItemsCount = 0;
  constructor(private router: Router, private loader: NgxSpinnerService, private workitemssvc: WorkitemsService) {
    this.userRole = JSON.parse(this.storage['user']).Role.toLowerCase();
    this.userName = this.storage['username'].toLowerCase();
  }

  ngOnInit() {
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
      this.workItemsCount = this.workItems.filter(item => item.Status.toLowerCase() == 'inprogress').length;
      this.loader.hide();
 
    }, er => {
      // this.toastr.error('loading failed');
      this.loader.hide();
    });

  }

}
