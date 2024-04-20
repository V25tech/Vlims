import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentRequestConfiguration, DocumentTypeConfiguration, RequestContext, UserConfiguration, WorkItemsConfiguration, workflowconiguration } from 'src/app/models/model';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { DocumentRequestService } from 'src/app/modules/services/document-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { WorkitemsService } from 'src/app/modules/services/workitems.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent {
  isButtonDisabled = false;
  departmentsSource = []; type: string = ''
  requestId: number = 0; workId: number = 0; statuss: string = ''; iscompleted: boolean = false;
  username: string = ''; isreview: boolean = false; isapprove: boolean = false; reviewpendingcount = 0;
  workitems: Array<WorkItemsConfiguration> = [];
  finalStatus: string = ''
  typeSource: DocumentTypeConfiguration[] = [];
  workflowsSource: workflowconiguration[] = [];
  request = new DocumentRequestConfiguration();
  editMode: boolean = false;
  viewMode: boolean = false;
  toastMsg: string = '';
  modalRef: BsModalRef | undefined;
  lstusers: UserConfiguration[] = [];
  user: UserConfiguration = new UserConfiguration();
  password: string = '';
  isSubmit = false;
  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];


  constructor(private router: Router, private location: Location, private toastr: ToastrService,
    private workitemssvc: WorkitemsService,
    private userssvc: UsersconfigurationService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private documentRequestService: DocumentRequestService) { }

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
    }
    else if (segments.slice(-1).toString() == 'edit') {
      if (this.commonsvc.request.status == 'Rejected' || this.commonsvc.request.status == 'Returned') {
        this.editMode = false;
      }
      else {
        this.editMode = true;
      }
      if (this.commonsvc.request == null) {
        this.location.back();
      }
      this.request = this.commonsvc.request;
    }
    this.getdepartments();
    this.getdocumenttypeconfig();
    this.getworkflowinfo();
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.documentRequestService.getbyId(arg0).subscribe((data: any) => {
      this.request = data;
      this.spinner.hide();
    });
  }




  getusers() {
    debugger

    let objrequest = new RequestContext();
    objrequest.PageNumber = 1; objrequest.PageSize = 50;
    return this.userssvc.getusers(objrequest).subscribe((data: any) => {
      this.lstusers = data.Response;
      //localStorage.setItem("lstusers", this.lstusers.);


    });
  }




  confirmApproval() {
    debugger
    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {

      this.request.modifiedBy = username;
      this.request.status = this.finalStatus;
      if (this.isapprove && this.reviewpendingcount > 0) {
        this.toastr.error('Reviews Pending');
      } else {

        this.toastMsg = this.finalStatus;
        this.updateRequest();
      }

    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }
  }

  confirmReturn() {
    debugger
    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {

      this.request.modifiedBy = this.commonsvc.getUsername();
      this.request.status = 'Returned'
      this.toastMsg = this.request.status;
      this.updateRequest();
      this.location.back();
      //this.updateRequest();
    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }
  }

  confirmReject() {
    debugger
    const username = localStorage.getItem('username') || '';
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const userExists = this.lstusers.find(user => user.UserID === username && user.Password === password);
    if (userExists) {

      this.request.modifiedBy = this.commonsvc.getUsername();
      this.request.status = 'Rejected'
      this.toastMsg = this.request.status;
      this.updateRequest();

    } else {// Username or password is invalid, display error message
      this.toastr.error('Invalid Username or Password');
    }
  }
  // approve() {
    
  //   this.request.modifiedBy = this.username;
  //   this.request.status = this.finalStatus;
  //   if (this.isapprove && this.reviewpendingcount > 0) {
  //     this.toastr.error('Reviews Pending');
  //   }
  //   else {
  //     this.toastMsg = this.finalStatus;
  //     this.updateRequest();
  //   }
  // }
  return(form: any) {    
    this.isSubmit = true;
    if(!form?.valid)
      return;
    this.request.modifiedBy = this.commonsvc.getUsername();
    this.request.status = 'Returned'
    this.toastMsg = this.request.status;
    this.updateRequest();
    this.location.back();
    //this.updateRequest();
  }
  reject(form: any) {
    this.isSubmit = true;
    if(!form?.valid)
      return;
    this.request.modifiedBy = this.commonsvc.getUsername();
    this.request.status = 'Rejected'
    this.toastMsg = this.request.status;
    this.updateRequest();   
  }



  approve(template: TemplateRef<any>) {
    debugger
    // Open the modal
    this.modalRef = this.modalService.show(template, { class: 'custom-modal' });

  }




  saveRequest() {
    debugger
    if (this.editMode || this.request.status == 'Rejected' || this.request.status == 'Returned') {
      this.toastMsg = 'Updated';
      this.request.status = 'In-Progress';
      this.updateRequest();
    }
    else {
      this.addRequest();
    }
  }

  addRequest() {
    if (!this.viewMode) {
      this.request.createdBy = this.commonsvc.getUsername();
      this.request.modifiedBy = this.commonsvc.getUsername();
      this.request.status = 'In-Progress';
      this.request.createdDate = new Date().toISOString();
      this.request.modifiedDate = new Date().toISOString();
      this.spinner.show();
      if (!this.isButtonDisabled) {
        this.isButtonDisabled = true;
        this.documentRequestService.adddocreqconfig(this.request).subscribe(res => {
          this.commonsvc.request = new DocumentRequestConfiguration();
          this.location.back();
          this.spinner.hide();
          this.toastr.success('Document Request Saved Succesfull!', 'Saved.!');
          this.isButtonDisabled = false;
        }, er => {
          console.log(er);
          this.spinner.hide();
        });
      }
    }
  }

  updateRequest() {
    
    if (this.viewMode && this.request.status != 'Rejected' && this.request.status != 'Returned') {
      this.request.modifiedBy = this.commonsvc.createdBy;
      this.request.status = this.finalStatus;
    }
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
      this.spinner.show();
      this.documentRequestService.updatedocreqconfig(this.request).subscribe(res => {
        this.commonsvc.request = new DocumentRequestConfiguration();
        this.toastr.success(`Document Request ${this.toastMsg} Succesfull!`, 'Saved.!');
        this.location.back();
        this.spinner.hide();
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


  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      this.typeSource = data.Response;
    });
  }
  getworkflowinfo() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.wfservice.getworkflow(objrequest).subscribe((data: any) => {
      this.workflowsSource = data.Response;
      this.workflowsSource = this.workflowsSource.filter(o => o.documentstage?.includes("Request"));
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
        this.workitems = this.workitems.filter(p => p.ReferenceId == this.requestId && p.TaskType == 'Request');
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
  onChange() {
    const type = this.typeSource.filter(o => o.Documenttypename.toLocaleLowerCase() === this.request.documenttype.toLocaleLowerCase());
    this.request.department = type[0].Assigntodepartment;
    const filtersource = this.workflowsSource.filter(o => o.documenttype?.toLocaleLowerCase() === this.request.documenttype.toLocaleLowerCase());
    this.workflowsSource = filtersource;
  }
  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      this.departmentsSource = data.Response;
    });
  }
}

