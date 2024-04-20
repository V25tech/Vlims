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
  isButtonDisabled = false;
  isSubmitting = false;

  documentType = new DocumentTypeConfiguration();
  grid: DocumentTypeConfiguration[] = [];
  departments: string[] = [];
  isSubmiting = false;
  title:string='New Document Type Configuration';
  viewMode: boolean = false; editMode: boolean = false;
  selectedDepartments: string[] = [];
  showAllDepartments = false;

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
      this.title='Modify Document Type Configuration';
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

  removeDepartment(department: string, event: Event): void {
    event.stopPropagation();
    const index = this.selectedDepartments.indexOf(department);
    if (index !== -1) {
      this.selectedDepartments.splice(index, 1);
    }
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
    // Update mode
    this.documentType = documentType;
    this.updatetype();
  } else {
    // Add mode
    if (!this.isduplicateDocumentType() && !this.isduplicatePrefix()) {
      // If both name and prefix are not duplicate, proceed to add
      this.addtype(documentType);
    } else {
      // If name or prefix is duplicate, show error message or handle as needed
      if (this.isduplicateDocumentType()) {
        this.toastr.error('Document Type Name must be unique.');
      }
      if (this.isduplicatePrefix()) {
        this.toastr.error('Document Type Prefix must be unique.');
      }
      this.isSubmiting = false;
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






  isduplicatePrefix() {
    let isDuplicate = false;
    if (this.grid != null && this.grid.length > 0) {
      isDuplicate = this.grid.some(p => p.documenttypeprefix === this.documentType.documenttypeprefix);
    }
    return isDuplicate;
  }
  isduplicateDocumentType() {
    let isDuplicate = false;
    if (this.grid != null && this.grid.length > 0) {
      isDuplicate = this.grid.some(p => p.Documenttypename === this.documentType.Documenttypename);
    }
    return isDuplicate;
  }
  



  
  addtype(documentType: DocumentTypeConfiguration) {
    documentType.CreatedBy = this.commonsvc.getUsername();
    documentType.ModifiedBy = this.commonsvc.getUsername();
    documentType.DTCId = "1";
    if (!this.isSubmitting) {
      this.isButtonDisabled = true;
      this.isSubmitting = true;
    this.doctypeservice.adddoctypeconfig(documentType).subscribe((res: any) => {
      this.toastr.success('Document Type Registered Successfully!', 'Saved.!');
      this.location.back();
      this.isButtonDisabled = false;
      this.isSubmitting = false;
    }, er => {
      console.log(er);
      this.toastr.error('Document type adding failed', 'Internal server error', {
        timeOut: 3000,
      });
      this.isSubmiting = false;
    });
  }
  }
  updatetype() {
    debugger
    this.documentType.ModifiedBy = this.commonsvc.getUsername();
    if (!this.isSubmitting) {
      this.isButtonDisabled = true;
      //this.isSubmitting = true;
    
      this.documentType.ModifiedDate = new Date().toISOString();
      // If the document type name is unique, proceed with updating
      this.doctypeservice.updatedoctypeconfig(this.documentType).subscribe(res => {
        this.commonsvc.documentType = new DocumentTypeConfiguration();
        this.toastr.success('Document Type Updated Successfully!', 'Updated.');
        this.spinner.hide();
        this.location.back();
      }, er => {
        console.log(er);
        this.isSubmiting = false;
        this.isButtonDisabled = false;
        this.spinner.hide();
        this.toastr.error('Document type update failed', 'Internal server error', {
          timeOut: 3000,
        });
      });
    }
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
