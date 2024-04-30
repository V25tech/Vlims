
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
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { ExistingDocumentRequestService } from 'src/app/modules/services/existing-document-request.service';

interface PrintType {
  label:string;
  value:string;
}

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
  isButtonDisabled = false;
  print = new DocumentPrintConfiguration();
  public workflowsSource: any[] = [];
  editMode: boolean = false;
  viewMode: boolean = false;
  preparations: any[] = [];
  username: string = ''
  requestId: number = 0; workId: number = 0; statuss: string = ''; iscompleted: boolean = false; type: string = ''; finalStatus: string = '';
  isapprove: boolean = false; reviewpendingcount = 0;
  workitems: Array<WorkItemsConfiguration> = [];
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  toastMsg: string | null = null;
  printType = 'single';
  preparations1: string[] = []; // Array to hold document numbers
  isworkflow:boolean=false;

  stageSource:PrintType[] = [
    { label: 'Master Copy', value: 'Master Copy' },
    { label: 'Controlled Copy', value: 'Controlled Copy' },
    { label: 'Uncontrolled Copy', value: 'Uncontrolled Copy' },
    { label: 'Reference Copy', value: 'Reference Copy' },
    { label: 'Display Copy', value: 'Display Copy' },
    { label: 'Discontinued Copy', value: 'Discontinued Copy' },
    { label: 'Obsoluted Copy', value: 'Obsoluted Copy' },
    { label: 'Validation Batch', value: 'Validation Batch' },
    { label: 'Stability Batch', value: 'Stability Batch' },
    { label: 'MLT Batch', value: 'MLT Batch' },
    { label: 'Hold Time study', value: 'Hold Time study' },
  ];
  selectedStage:PrintType[]=[];
  constructor(private commonsvc: CommonService, private location: Location,
    private route: ActivatedRoute,
    private workitemssvc: WorkitemsService,
    private existingDocReqservice: ExistingDocumentRequestService,
    private modalService: BsModalService, private sanitizer: DomSanitizer,
    private templatesvc:DocumentTemplateServiceService,
    private toastr: ToastrService, private spinner: NgxSpinnerService, private docprintservice: NewPrintRequestService, private docPreperationService: DocumentPreperationService, private router: Router, private wfservice: WorkflowServiceService, private docservice: DocumentPreperationService) { }

  ngOnInit() {

    this.getDocumentRequest();
    const user = localStorage.getItem("username");
    
    if (user != null && user != undefined) {
      this.commonsvc.createdBy = user;
      this.username = user;
    }
    this.route.params.subscribe(params => {
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
      //this.workflowsSource = [{ workflowName: this.print.workflow }];
      this.preparations = [{ documentno: this.print.documentNumber }];
      if(this.print.workflow!=null && this.print.workflow!=undefined){
        this.isworkflow=true;
      }
    }    
    this.getworkflowinfo();
    this.getdocumentpreparations();
  }


  getDocumentRequest() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.existingDocReqservice.GetExistingDocumentAll(objrequest).subscribe((data: any) => {
      // Extracting document numbers from the response data
      this.preparations1 = data.response.map((doc: any) => doc.documentno);
    }, er => {
      console.error('An error occurred:', er);
    });
  }

  getbyId(arg0: number) {
    this.spinner.show();
    return this.docprintservice.getbyId(arg0).subscribe((data: any) => {
      console.log(data);
      this.print = data;
      this.spinner.hide();
    });


    
  }
  approve() {
    debugger
    this.print.Status = this.finalStatus;
    this.print.ModifiedBy = this.username;
    
    if (this.isapprove && this.reviewpendingcount > 0) {
      this.toastr.error('Reviews Pending');
    }
    else{
      this.toastMsg = this.print.Status;
    this.updateRequest();
    }
  }
  reinitiative() {
    //this.effective.Status='Re-Initiated'
    //this.toastMsg = this.print.Status;
    //this.updateRequest();
    this.location.back();
  }
  reject() {
    //this.effective.Status='Rejected'
    //this.toastMsg = this.print.Status;
    //this.saveEffective();
    this.location.back();
  }
  getdocumentpreparations() {
    //let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docPreperationService.getdocumentpreparations(this.commonsvc.req).subscribe((data: any) => {
      console.log(data[0]);
      this.preparations = data.response;
      this.preparations=this.preparations.filter(o=>o.status.toLowerCase() === 'approved' && o.isEffectiveApproved);
      this.preparations = this.preparations.filter(p => 
        p.documentno);
    });
  }
  

  documentNumberChange(event: any) {
    debugger
    let preps = this.preparations.filter(p => p.documentno === event.value);
    if (preps && preps.length > 0) {
      this.print.documenttitle = preps[0].documenttitle;
      this.print.printtype = preps[0].documenttype;
      this.print.template=preps[0].template;
      this.print.prepId=parseInt(preps[0].dpnid);
      this.workflowsSource=this.workflowsSource.filter(o=>o.documentstage?.includes("Print"));
      this.workflowsSource=this.workflowsSource.filter(o=>o.documenttype?.toLocaleLowerCase()===preps[0].documenttype.toLocaleLowerCase());
    }
  }


  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsSource = data.Response;
      debugger
      this.workflowsSource=this.workflowsSource.filter(o=>o.documentstage?.includes("Print"));
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

    this.print.CreatedBy =  this.username;
    this.print.ModifiedBy = this.username;
    this.print.Status = 'In-Progress';
    this.print.CreatedDate = new Date();
    this.print.ModifiedDate = new Date();
    this.print.printCount='0';
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      this.spinner.show();
    this.docprintservice.AddNewPrintRequest(this.print).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration(); this.spinner.hide();
      this.location.back();
      this.toastr.success('Document print request saved succesfull!', 'Saved.!');
      this.isButtonDisabled=false;
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }
  }

  updateRequest() {
    this.spinner.show();    
    this.toastMsg = this.toastMsg ?? 'Updated'
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      let reqObj = JSON.parse(JSON.stringify(this.print))
      reqObj.modifiedDate = new Date(reqObj.modifiedDate)
      reqObj.ModifiedDate = reqObj.modifiedDate

      this.docprintservice.UpdatePrintRequest(reqObj).subscribe(res => {
      this.commonsvc.printConfig = new DocumentPrintConfiguration();
      this.spinner.hide();
      this.location.back();
      this.toastr.success(`Document print request ${this.toastMsg}  succesfull!`, 'Updated.!');
      this.isButtonDisabled=false;
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }
  }
  UpdatePrintCount()
  {
    debugger;
    let reqObj = JSON.parse(JSON.stringify(this.print))
    this.docprintservice.UpdatePrintRequestCount(reqObj).subscribe(res => {
      //this.toastr.success(`Document print request ${this.toastMsg}  succesfull!`, 'Updated.!');
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
    
  }

  onCancel() {
this.location.back();
    //this.router.navigate(['/print']);
  }
  getworkflowitems() {
    debugger
    this.spinner.show();
    const user = localStorage.getItem("username");
    if (user != null && user != undefined) {
      this.commonsvc.createdBy = user;
    }
    return this.workitemssvc.getworkitems(this.commonsvc.req).subscribe((data: any) => {
      debugger
      this.workitems = data.Response;
      if (this.workitems.length > 0) {
        this.workitems = this.workitems.filter(p => p.ReferenceId == this.requestId && p.TaskType == 'Print');
        if (this.workitems) {
          this.workitems.sort((a, b) => a.WITId - b.WITId);
          const work = this.workitems.filter(o => o.WITId == this.workId);
          this.statuss = work[0].ActionType;
          this.iscompleted = work[0].IsCompleted;
          const totalreviewcount = this.workitems.filter(o => o.ActionType === this.statuss).length;
          const totalapprovecount = this.workitems.filter(o => o.ActionType === this.statuss).length;
          this.reviewpendingcount = this.workitems.filter(o => o.ActionType === 'Review' && o.IsCompleted == false).length;
          const reviewedcount = this.workitems.filter(o => o.ActionType === this.statuss && o.IsCompleted).length;
          const approvedcount = this.workitems.filter(o => o.ActionType === this.statuss && o.IsCompleted).length;
          const countt = totalreviewcount - reviewedcount;
          const approvecountt = totalapprovecount - approvedcount;
          if (this.statuss === 'Review') {
            //this.isreview = true;
            if (countt === 1 || countt==0) {
              this.finalStatus = 'Reviewed';
            } else if (countt > 1) {
              this.finalStatus = 'Pending Review';
            } else if (countt === totalreviewcount) {
              this.finalStatus = 'Pending Review';
            }
          } else {
            if (approvecountt === 1 || approvecountt==0) {
              this.isapprove = true;
              this.finalStatus = 'Approved';
            } else if (countt > 1) {
              this.finalStatus = 'Pending Approve';
            } else if (countt === totalreviewcount) {
              this.finalStatus = 'Pending Approve';
            }
          }
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
    
    // if (this.pdfBytes) {
    //   const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
    //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
    //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    //   debugger
      
    //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
    // }
    this.getUrl(template);
  }
  getUrl(template: TemplateRef<any>):void{
    this.templatesvc.geturl().subscribe((data:any)=>{
      debugger
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data+'#toolbar=0') as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
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
  checkduplicatetemplate(template: TemplateRef<any>){
    this.templatesvc.isduplicate(this.print.template).subscribe((data:any)=>{
      // const isduplicate=Boolean(data);
      // if(isduplicate){
      //   this.toastr.error('Template used in multiple preparations unable to view document');
      // }else{
      //   this.previewprint(template);
      //   this.UpdatePrintCount();
      // }
      this.previewprint(template);
      this.UpdatePrintCount();
    })
  }
  previewprint(template: TemplateRef<any>) {    
    debugger
    this.spinner.show();    
    //this.docPreperationService.preview(this.print.template).subscribe((data: any) => {
      this.templatesvc.getTemplate(this.print.template,this.print.prepId).subscribe((data: any) => {
        //this.preparationsvc.previewtemplate(Number.parseInt(objtemp.DTID)).subscribe((data: any) => {
          this.pdfBytes = data;
          //this.pdfBytes = this.fileBytes;
          this.spinner.hide();
          this.openViewer(template);
        }, (error:any) => {
          this.spinner.hide();
        });
    //   this.docPreperationService.getTemplate(this.print.template).subscribe((data: any) => {
    //   this.pdfBytes = data;
    //   this.spinner.hide();
    //   this.openViewer(template);
    // }, er => {
    //   this.spinner.hide();
    // });
  }

}


