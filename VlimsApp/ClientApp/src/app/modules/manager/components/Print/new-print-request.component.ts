
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentPrintConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { NewPrintRequestService } from '../../../services/new-print-request.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';


@Component({
  selector: 'app-new-print-request.component',
  templateUrl: './new-print-request.component.html'
})
export class NewPrintRequestComponent implements OnInit {
  types: DocumentPrintConfiguration[] = [];
  print = new DocumentPrintConfiguration();
  workflowsSource = [];
  editMode: boolean = false;
  viewMode: boolean = false;
  constructor(private commonsvc: CommonService,  private docprintservice: NewPrintRequestService, private router: Router, private wfservice: WorkflowServiceService) { }

  ngOnInit() {
    this.GetNewPrintRequest();
    this.getworkflowinfo();
  }
  GetNewPrintRequest() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.docprintservice.GetNewPrintRequest(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);

    });
  }
  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.wfservice = data.Response;
      console.log(this.workflowsSource);
    });
  }
  savePrintRequest() {
    if (this.editMode) {
      this.updateRequest();
    }
    else {
      this.addRequest();
    }
  }

  addRequest() {
    this.print.CreatedBy = 'admin';
    this.print.ModifiedBy = 'admin';
    this.print.Status = 'In-Progress';
    this.print.CreatedDate = new Date();
    this.print.ModifiedDate = new Date();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.docprintservice.AddNewPrintRequest(objrequest).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();
      //this.location.back();
      //this.spinner.hide();
    //}, er => {
    //  console.log(er);
    //  this.spinner.hide();
    });
  }

  updateRequest() {
    //this.documentRequestService.updatedocreqconfig(this.request).subscribe(res => {
    //  this.commonsvc.request = new DocumentRequestConfiguration();
    //  this.location.back();
    //  this.spinner.hide();
    //}, er => {
    //  console.log(er);
    //  this.spinner.hide();
    //});
  }

  onCancel() {
    //this.location.back();
  }
  navigateToAddPrint(): void {
    this.router.navigate(['/print/add']);
  }
}


