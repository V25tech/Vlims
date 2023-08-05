import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentAdditionalTasks, RequestContext } from 'src/app/models/model';
import { ToastrService } from 'ngx-toastr';
import { DocumentRevisionService } from 'src/app/modules/services/document-revision.service';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';

@Component({
  selector: 'app-review-revision',
  templateUrl: './review-revision.component.html',
  styleUrls: ['./review-revision.component.scss']
})
export class ReviewRevisionComponent {

  revision = new DocumentAdditionalTasks();
  editMode: boolean = false;
  viewMode: boolean = false;
  id: string = '';
  effectiveDate: string | undefined;
  reviewDate: string | undefined;
  departmentsSource = [];
  typeSource = [];


  constructor(private router: Router, private location: Location, private toastr: ToastrService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private commonsvc: CommonService, private documentRevisionService: DocumentRevisionService,
    private deptservice: DepartmentconfigurationService, private doctypeserv: DocumentTypeServiceService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getdepartments();
    this.getdocumenttypeconfig();
    if (this.id) { //edit mode
      this.editMode = true;
      if (this.commonsvc.revision) {
        this.revision = this.commonsvc.revision;
        this.effectiveDate = this.toDate(this.revision.effectiveDate);
        this.reviewDate = this.toDate(this.revision.reviewDate);
      }
      else
        this.getDocumentRevision(this.id);
    }
  }

  toDate(pdate: Date | undefined) {
    if (pdate == undefined) return undefined;
    const yyyy = pdate.getFullYear();
    let mm = pdate.getMonth() + 1;
    let dd = pdate.getDate();
    return yyyy + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  }
  getAsDate(event: any) {
    return event.target.valueAsDate;
  }

  getDocumentRevision(id: string) {
    this.spinner.show();
    return this.documentRevisionService.getbyId(id).subscribe((data: any) => {
      this.reviewDate = data;
      this.effectiveDate = this.toDate(this.revision.effectiveDate);
      this.reviewDate = this.toDate(this.revision.reviewDate);
      this.spinner.hide();
    });
  }
  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      this.departmentsSource = data.Response;
    });
  }
  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      this.typeSource = data.Response;
    });
  }

  saveRequest() {
    if (this.editMode) {
      this.updateRequest();
    }
    else {
      this.addRequest();
    }
  }

  addRequest() {
    if (!this.viewMode) {
      this.revision.createdBy = 'admin';
      this.revision.modifiedBy = 'admin';
      this.revision.status = 'In-Progress';
      this.revision.createdDate = new Date();
      this.revision.modifiedDate = new Date();
      this.spinner.show();

      this.documentRevisionService.adddocrevconfig(this.revision).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Document Request Saved Succesfull!', 'Saved.!');
        this.location.back();
      }, er => {
        console.log(er);
        this.spinner.hide();
      });
    }
  }

  updateRequest() {
    if (this.viewMode) {
      this.revision.modifiedBy = this.commonsvc.createdBy;
      //this.revision.status = this.finalStatus;
    }
    this.spinner.show();
    this.documentRevisionService.updatedocrevconfig(this.revision).subscribe(res => {
      this.commonsvc.revision = new DocumentAdditionalTasks();
      this.spinner.hide();
      this.location.back();
      this.toastr.success('Document Request Saved Succesfull!', 'Saved.!');
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }

  onCancel() {
    this.location.back();
  }

}
