import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Effective } from '../../models/effective';
import { DocumentEffectiveConfiguration, DocumentPreperationConfiguration, DocumentTemplateConfiguration, RequestContext, UserConfiguration, WorkItemsConfiguration, workflowconiguration } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { DocumentEffectiveService } from 'src/app/modules/services/document-effective.service';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';


@Component({
  selector: 'app-review-effective',
  templateUrl: './review-effective.component.html',
  styleUrls: ['./review-effective.component.scss']
})
export class ReviewEffectiveComponent {
  isButtonDisabled = false;
  effective = new DocumentEffectiveConfiguration();
  workflowsourcedata: workflowconiguration[] = [];
  typeSource = [];
  workflowsSource = [];
  templatesSource: Array<DocumentTemplateConfiguration> = [];
  departmentsSource = [];
  fileBytes: Uint8Array = new Uint8Array();
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  editMode: boolean = false;
  viewMode: boolean = false;
  requestId: number = 0; workId: number = 0; statuss: string = ''; type: string = ''; iscompleted: boolean = false;
  isreview: boolean = false; isapprove: boolean = false; reviewpendingcount = 0;
  username: string = ''
  workitems: Array<WorkItemsConfiguration> = [];
  finalStatus: string = ''
  toastMsg: string | null = null;

  lstusers: UserConfiguration[] = [];
  user: UserConfiguration = new UserConfiguration();
  password: string = '';
  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];
  effectivedate: Date | undefined;
  reviewdate: Date | undefined;
  isworkflow:boolean=false;
  constructor(private location: Location, private router: Router,
    private workitemssvc: WorkitemsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userssvc: UsersconfigurationService,
    private templateService: DocumentTemplateServiceService,
    private modalService: BsModalService, private documentEffectiveService: DocumentEffectiveService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private docPreperationService: DocumentPreperationService,) { }

  ngOnInit() {
    this.getusers();
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
      this.getworkflowinfo();
    }
    else if (this.commonsvc.efffective.deid) {
      this.effective = this.commonsvc.efffective;
      if(this.effective.workflow!='' && this.effective.workflow!=undefined){
        this.isworkflow=true;
      }
      this.getdocttemplate();
      this.getworkflowinfo();
    }
    else this.location.back();
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.documentEffectiveService.getbyId(arg0).subscribe((data: any) => {
      this.effective = data;
      this.spinner.hide();
    });
  }
  getdocttemplate() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.templateService.getdocttemplate(objrequest).subscribe((data: any) => {
      this.templatesSource = data.Response;
    });
  }


  Proceed(template: TemplateRef<any>) {
    // Open the modal
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }





  getusers() {
     
    let objrequest = new RequestContext();
    objrequest.PageNumber = 1; objrequest.PageSize = 50;
    return this.userssvc.getusers(objrequest).subscribe((data: any) => {
      this.lstusers = data.Response;
      //localStorage.setItem("lstusers", this.lstusers.);


    });
  }












  confirmApproval() {
    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {


      this.effective.ModifiedBy = this.username;
      this.effective.Status = this.finalStatus;
      if (this.isapprove && this.reviewpendingcount > 0) {
        this.toastr.error('Reviews Pending');
      }
      else {
        this.toastMsg = this.effective.Status;
        this.saveEffective();
      }

    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }



  }

  confirmReturn() {


    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {

      this.effective.Status = 'Returned'
      this.toastMsg = this.effective.Status;
      this.effective.ModifiedBy = this.commonsvc.getUsername();
      this.saveEffective();
    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }




  }

  confirmReject() {



    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {

      this.effective.Status = 'Rejected'
      this.toastMsg = this.effective.Status;
      this.effective.ModifiedBy = this.commonsvc.getUsername();
      this.saveEffective();


    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }

  }

  saveEffective() {
    let reqObj: any = {}
    this.effectivedate = new Date(this.effective.effectiveDate);
    this.reviewdate = new Date(this.effective.reviewDate);

    if (!this.effectivedate || !this.reviewdate) {
      null;
    }
    if (this.effectivedate >= this.reviewdate) {
      this.toastr.error('Review Date should be greater than effective Date');
      return;
    }
    this.spinner.show();
    reqObj = JSON.parse(JSON.stringify(this.effective));
    debugger
    //if (this.viewMode && (reqObj.Status == 'Rejected' || reqObj.Status == 'Returned')) {
    //  reqObj.ModifiedBy = this.commonsvc.createdBy;
    //  reqObj.Status = "In-Progress";
    //  reqObj.status = "In-Progress";
    //}
    //else
    //if (this.viewMode && reqObj.status != 'Rejected' && reqObj.status != 'Returned') {
    if (this.viewMode && reqObj.status == 'Approved' || reqObj.status == 'Reviewed') {
      reqObj.ModifiedBy = this.commonsvc.createdBy;
      reqObj.Status = this.finalStatus;
    } else if ((!this.viewMode || this.editMode) && ((reqObj.status == 'Rejected' || reqObj.status == "Returned"))) {
      reqObj.ModifiedBy = this.commonsvc.createdBy;
      reqObj.Status = "In-Progress";
    }
    this.toastMsg = this.toastMsg ?? 'Updated'
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      this.documentEffectiveService.ManageDocumentEffective(reqObj).subscribe(res => {
        this.toastr.success(`Document Effective ${this.toastMsg} Successfully!`);
        this.spinner.hide();
        this.location.back();
        this.isButtonDisabled = false;
      }, er => {
        console.log(er);
        this.spinner.hide();
      });
    }
  }

  onCancel() {
    this.location.back();
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
    //    

    //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
    // }
    this.getUrl(template);
  }
  getUrl(template: TemplateRef<any>): void {
    this.templateService.geturl().subscribe((data: any) => {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data + '#toolbar=0') as string;
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
  checkduplicatetemplate(template: TemplateRef<any>) {
    this.templateService.isduplicate(this.effective.template).subscribe((data: any) => {
      // const isduplicate = Boolean(data);
      // if (isduplicate) {
      //   this.toastr.error('Template used in multiple preparations unable to view document');
      // } else {
      //   this.previewtemplate(template);
      // }
      this.previewtemplate(template);
    })
  }
  previewtemplate(template: TemplateRef<any>) {
    let id = 0;
    const obj = this.templatesSource.find(o => o.Templatename === this.effective.template);
    if (obj != null && obj != undefined) {
      id = parseInt(obj.DTID);
    }
    this.templateService.getTemplate(this.effective.template,parseInt(this.effective.documentmanagerid)).subscribe((data: any) => {
      //this.docPreperationService.previewtemplate(id).subscribe((data: any) => {
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
  }
  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 100, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsourcedata = data.Response;
      this.workflowsourcedata = this.workflowsourcedata.filter(o => o.documentstage?.includes("Effective"));
      this.workflowsourcedata = this.workflowsourcedata.filter(o => o.documenttype?.toLocaleLowerCase() === this.effective.documenttype.toLocaleLowerCase());
    });
  }
  getworkflowitems() {
    this.spinner.show();
    const user = localStorage.getItem("username");
    if (user != null && user != undefined) {
      this.commonsvc.createdBy = user;
    }
    return this.workitemssvc.getworkitems(this.commonsvc.req).subscribe((data: any) => {
      this.workitems = data.Response;
      if (this.workitems.length > 0) {
        this.workitems = this.workitems.filter(p => p.ReferenceId == this.requestId && p.TaskType == 'Effective');
        if (this.workitems) {
          this.workitems.sort((a, b) => a.WITId - b.WITId);
          const work = this.workitems.filter(o => o.WITId == this.workId);
          this.statuss = work[0].ActionType;
          this.iscompleted = work[0].IsCompleted;
          const totalreviewcount = this.workitems.filter(o => o.ActionType === this.statuss).length;
          this.reviewpendingcount = this.workitems.filter(o => o.ActionType === 'Review' && o.IsCompleted == false).length;
          const reviewedcount = this.workitems.filter(o => o.ActionType === this.statuss && o.IsCompleted).length;
          const countt = totalreviewcount - reviewedcount;
          if (this.statuss === 'Review') {
            this.isreview = true;
            if (countt === 1) {
              this.finalStatus = 'Reviewed';
            } else if (countt > 1) {
              this.finalStatus = 'Pending Review';
            } else if (countt === totalreviewcount) {
              this.finalStatus = 'Pending Review';
            }
          } else {
            if (countt === 1) {
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
}
