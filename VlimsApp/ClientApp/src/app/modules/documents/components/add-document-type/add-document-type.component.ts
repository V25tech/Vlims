import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { DocumentType } from '../../models/document-type';
import { DepartmentConfiguration, DocumentTypeConfiguration, RequestContext } from 'src/app/models/model';

import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss'],
})
export class AddDocumentTypeComponent {
  documentType = new DocumentTypeConfiguration();
  grid: DocumentTypeConfiguration[] = [];
  departments: string[] = [];
  isSubmiting = false;
  viewMode: boolean = false; editMode: boolean = false;
  selectedDepartments: string[] = [];

  constructor(private toastr: ToastrService,
    private location: Location,
    private deptservice: DepartmentconfigurationService,
    private doctypeservice: DocumentTypeServiceService,
    private spinner: NgxSpinnerService,
    private commonsvc: CommonService,
    private cdr: ChangeDetectorRef,
    //private loader: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    this.getdepartments();
    if (lastSegment == "edit") {
      let id = parseInt(segments[segments.length - 1], 10);
      this.editMode = true;
      if (this.commonsvc.documentType.DTCId) {
        this.selectedDepartments = this.commonsvc.documentType?.Assigntodepartment?.split(',');
        this.documentType = this.commonsvc.documentType;
      }
      else
        this.getbyId(id);
    }
    else if (lastSegment == "view") {
      let id = parseInt(segments[segments.length - 1], 10);
      this.viewMode = true;
      this.getbyId(id);
    }
    this.getDocTypes();
    this.cdr.detectChanges();
  }

  onCancel() {
    this.location.back();
  }

  getbyId(id: number) {
    this.doctypeservice.getbyId(id).subscribe((data: any) => {
      this.selectedDepartments = data?.Assigntodepartment?.split(',');
      this.documentType = data;
      this.getdepartments();
    }, ((error: any) => {
      console.log(error);
    }));
  }
  getdepartments() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      this.departments = data.Response;
      this.spinner.hide();
    }, (error: any) => {
      console.log(error);
    });
  }

  saveDocType(documentType: DocumentTypeConfiguration) {
    this.isSubmiting = true;
    this.documentType.Assigntodepartment = this.selectedDepartments.join(',');
    if (this.editMode) {
      this.documentType = documentType;
      this.updatetype();
    } else {
      if (!this.isduplicate()) {
        this.addtype(documentType);
      }
    }
  }

  isduplicate() {
    let isDuplicate = false;
    if (this.grid != null && this.grid.length > 0) {
      let dtypes = this.grid.filter(p => p.Documenttypename === this.documentType.Documenttypename);
      if (dtypes != null && dtypes.length > 0) {
        for (let i = 0; i < dtypes.length; i++) {
          if (!isDuplicate && dtypes[i].Assigntodepartment == this.documentType.Assigntodepartment) {
            this.toastr.error('Duplicate Entity');
            this.isSubmiting = false;
            isDuplicate = true
          }
        }
      }
    }
    return isDuplicate;
  }

  addtype(documentType: DocumentTypeConfiguration) {
    documentType.CreatedBy = this.commonsvc.getUsername();
    documentType.ModifiedBy = this.commonsvc.getUsername();
    documentType.DTCId = "1";
    this.doctypeservice.adddoctypeconfig(documentType).subscribe((res: any) => {
      this.toastr.success('Document type saved succesfull!', 'Saved.!');
      this.location.back();
    }, er => {
      console.log(er);
      this.toastr.error('Document type adding failed', 'Internal server error', {
        timeOut: 3000,
      });
      this.isSubmiting = false;
    });
  }
  updatetype() {
    this.documentType.ModifiedBy = this.commonsvc.getUsername();
    this.doctypeservice.updatedoctypeconfig(this.documentType).subscribe(res => {
      this.commonsvc.documentType = new DocumentTypeConfiguration();
      this.toastr.success('Document type update succesfull!', 'Updated.!');
      this.spinner.hide();
      this.location.back();
    }, er => {
      console.log(er);
      this.isSubmiting = false;
      this.spinner.hide();
      this.toastr.error('Document type adding failed', 'Internal server error', {
        timeOut: 3000,
      });
    });
  }


  approve() {
    this.documentType.Status = 'Approved'
    this.updatetype();
  }
  reinitiative() {
    this.documentType.Status = 'Re-Initiated'
    this.updatetype();
  }
  reject() {
    this.documentType.Status = 'Rejected'
    this.updatetype();
  }
  getDocTypes() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.doctypeservice.getdoctypeconfig(this.commonsvc.req).subscribe((data: any) => {

      this.grid = data.Response;
      this.spinner.hide();
    });
  }
}
