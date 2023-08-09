
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DocumentPreperationConfiguration, DocumentPrintConfiguration, RequestContext, WorkItemsConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { NewPrintRequestService } from '../../../services/new-print-request.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
  username: string = ''
  requestId: number = 0; workId: number = 0; statuss: string = ''; iscompleted: boolean = false; type: string = ''; finalStatus: string = '';
  workitems: Array<WorkItemsConfiguration> = [];
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  
  constructor(private commonsvc: CommonService, private location: Location,
    private route: ActivatedRoute,
    private workitemssvc: WorkitemsService,
    private modalService: BsModalService, private sanitizer: DomSanitizer,
    private toastr: ToastrService, private spinner: NgxSpinnerService, private docprintservice: NewPrintRequestService, private docPreperationService: DocumentPreperationService, private router: Router, private wfservice: WorkflowServiceService, private docservice: DocumentPreperationService) { }

  ngOnInit() {
    const user = localStorage.getItem("username");
    if (user != null && user != undefined) {
      this.commonsvc.createdBy = user;
      this.username = user;
    }
    this.route.params.subscribe(params => {
      debugger
      this.requestId = params['requestId'];
      this.workId = params['workId'];
      this.type = params['type'];
    });
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if (this.type == 'view') {
      this.viewMode = true;
      this.getbyId(this.requestId);
      this.getworkflowitems();
    }
    else if (segments.slice(-1).toString() == 'edit' && this.commonsvc.printConfig) {
      this.editMode = true;
      this.print = this.commonsvc.printConfig;
    }
    this.GetNewPrintRequest();
    this.getworkflowinfo();
    this.getdocumentpreparations();
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.docprintservice.getbyId(arg0).subscribe((data: any) => {
      this.print = data;
      this.spinner.hide();
      console.log('request', data);
    });
  }
  approve() {
    this.print.Status = this.finalStatus;
    this.print.ModifiedBy = this.username;
    this.savePrintRequest();
  }
  reinitiative() {
    //this.effective.Status='Re-Initiated'
    //this.saveEffective();
    this.location.back();
  }
  reject() {
    //this.effective.Status='Rejected'
    //this.saveEffective();
    this.location.back();
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
    if (this.editMode || this.viewMode) {
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
      this.commonsvc.printConfig = new DocumentPrintConfiguration(); this.spinner.hide();
      this.location.back();
      this.toastr.success('Document Print Request Saved Succesfull!', 'Saved.!');
    }, er => {
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
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }

  onCancel() {
    this.router.navigate(['/print']);
  }
  getworkflowitems() {
    this.spinner.show();
    const user = localStorage.getItem("username");
    if (user != null && user != undefined) {
      this.commonsvc.createdBy = user;
    }
    return this.workitemssvc.getworkitems(this.commonsvc.req).subscribe((data: any) => {
      debugger
      this.workitems = data.Response;
      if (this.workitems.length > 0) {
        this.workitems = this.workitems.filter(p => p.ReferenceId == this.requestId);
        if (this.workitems) {
          this.workitems.sort((a, b) => a.WITId - b.WITId);
          const work = this.workitems.filter(o => o.WITId == this.workId);
          this.statuss = work[0].ActionType;
          this.iscompleted = work[0].IsCompleted;
          const totalreviewcount = this.workitems.filter(o => o.ActionType === this.statuss).length;
          const reviewedcount = this.workitems.filter(o => o.ActionType === 'Review' && o.IsCompleted).length;
          const countt = totalreviewcount - reviewedcount;
          if (this.statuss === 'Review') {
            if (countt === 1) {
              this.finalStatus = 'Reviewed';
            } else if (countt > 1) {
              this.finalStatus = 'Pending Review';
            } else if (countt === totalreviewcount) {
              this.finalStatus = 'Pending Review';
            }
          } else {
            if (countt === 1) {
              this.finalStatus = 'Approved';
            } else if (countt > 1) {
              this.finalStatus = 'Pending Approve';
            } else if (countt === totalreviewcount) {
              this.finalStatus = 'Pending Approve';
            }
          }
          console.log('status', this.finalStatus);
        }
      }
      this.spinner.hide();
    });
  }

  
  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }

  openViewer(template: TemplateRef<any>): void {
    if (this.pdfBytes) {
      const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;      
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
  }

  // Function to convert base64 to Blob
  private b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  previewprint(template: TemplateRef<any>) {
    this.spinner.show();
    this.docprintservice.preview(this.print).subscribe((data: any) => {      
      this.pdfBytes = data;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
  }

}


