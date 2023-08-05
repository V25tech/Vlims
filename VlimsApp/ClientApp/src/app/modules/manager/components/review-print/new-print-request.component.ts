
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DocumentPreperationConfiguration, DocumentPrintConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { NewPrintRequestService } from '../../../services/new-print-request.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-print-request.component',
  templateUrl: './new-print-request.component.html',
  styles: [`
  .form-control, .form-select {
      max-width: 350px;
    }
    .w-150{
      width: 150px;
    }
    `]
})
export class NewPrintRequestComponent implements OnInit {
  types: DocumentPrintConfiguration[] = [];
  print = new DocumentPrintConfiguration();
  workflowsSource = [];
  editMode: boolean = false;
  viewMode: boolean = false;
  preparations: DocumentPreperationConfiguration[] = [];
  constructor(private commonsvc: CommonService,private location: Location,private toastr: ToastrService, private spinner: NgxSpinnerService, private docprintservice: NewPrintRequestService, private docPreperationService: DocumentPreperationService, private router: Router, private wfservice: WorkflowServiceService, private docservice: DocumentPreperationService) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if (segments.slice(-1).toString() == 'edit' && this.commonsvc.printConfig) {
      this.editMode = true;
      this.print = this.commonsvc.printConfig;
    }
    this.GetNewPrintRequest();
    this.getworkflowinfo();
    this.getdocumentpreparations();
  }
  getdocumentpreparations() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docPreperationService.getdocumentpreparations(objrequest).subscribe((data: any) => {
      this.preparations = data.response;
      this.preparations = this.preparations.filter(p => p.documentno);
    });
  }

  documentNumberChange(event: any) {
    console.log(event.value);
    let preps = this.preparations.filter(p => p.documentno === event.value);
    if (preps && preps.length > 0) {
      this.print.documenttitle = preps[0].documenttitle;
      this.print.printtype = preps[0].documenttype;
    }
  }

  GetNewPrintRequest() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docprintservice.GetNewPrintRequest(objrequest).subscribe((data: any) => {
      this.types = data.Response;
      console.log(this.types);

    });
  }
  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsSource = data.Response;
      this.workflowsSource = this.workflowsSource.filter((p: any) => p.workflowName);
      
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
    this.docprintservice.AddNewPrintRequest(this.print).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();this.spinner.hide();
      this.location.back();      
      this.toastr.success('Document Print Request Saved Succesfull!', 'Saved.!');
    }, er =>{
      this.spinner.hide();
      console.log(er);
    });
  }

  updateRequest() {
    this.spinner.show();
    this.docprintservice.UpdatePrintRequest(this.print).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();
      this.spinner.hide();
      this.location.back();      
      this.toastr.success('Document Print Request updated Succesfull!', 'Updated.!');
    }, er =>{
      this.spinner.hide();
      console.log(er);
    });
  }

  onCancel() {
    this.router.navigate(['/print']);
  }

}


