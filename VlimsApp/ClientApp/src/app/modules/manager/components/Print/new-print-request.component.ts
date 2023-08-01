
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentPrintConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { NewPrintRequestService } from '../../../services/new-print-request.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';


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
  requestsInfo : DocumentPrintConfiguration[]=[];
  constructor(private commonsvc: CommonService, private docprintservice: NewPrintRequestService, private router: Router, private wfservice: WorkflowServiceService, private docservice: DocumentPreperationService) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if (segments.slice(-1).toString() == 'edit' && this.commonsvc.printConfig) {
      this.editMode = true;
      this.print = this.commonsvc.printConfig;
    }
    this.GetNewPrintRequest();
    this.getworkflowinfo();
    this.getdocumentrequest();
  }
  getdocumentrequest() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docservice.getdocumentpreparations(objrequest).subscribe((data: any) => {
      debugger
      this.requestsInfo = data.response;
    });
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
    debugger;
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsSource = data.Response;
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
    debugger;
    this.print.CreatedBy = 'admin';
    this.print.ModifiedBy = 'admin';
    this.print.Status = 'In-Progress';
    this.print.CreatedDate = new Date();
    this.print.ModifiedDate = new Date();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.docprintservice.AddNewPrintRequest(this.print).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();
    });
    this.router.navigate(['/print']);
  }

  updateRequest() {
    this.docprintservice.UpdatePrintRequest(this.print).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();

    });
  }

  onCancel() {
    this.router.navigate(['/print']);
  }

}


