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
  grid:DocumentTypeConfiguration[]=[];
  departments: DepartmentConfiguration[] = [];
  selectedDepartments: DepartmentConfiguration[] = [];
  viewMode: boolean = false; editMode: boolean = false;
  typeId: number = 0;
  constructor(private toastr: ToastrService,
    private location: Location,
    private deptservice: DepartmentconfigurationService,
    private doctypeservice: DocumentTypeServiceService,
    private spinner: NgxSpinnerService,
    private commonsvc: CommonService,
    private cdr: ChangeDetectorRef,
    //private loader: SpinnerService,
    private router: Router
  ) {
    this.selectedDepartments = [];
  }

  ngOnInit() {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    if (lastSegment == "edit") {
      let id = parseInt(segments[segments.length - 1], 10);
      this.typeId = id;
      this.editMode = true; this.viewMode = false;
      this.getbyId();
      //this.documentType=this.commonsvc.documentType;
    }
    
    else if (lastSegment == "view") {
      this.typeId = parseInt(segments[segments.length - 1], 10);
      this.getbyId();
      this.viewMode = true; this.editMode = false;
      this.documentType = this.commonsvc.documentType;
    }
    this.getdepartments();
    this.getTypes();
    this.cdr.detectChanges();
  }
  onCancel() {
    this.location.back();
  }
  getbyId() {
    
    this.doctypeservice.getbyId(this.typeId).subscribe((data: any) => {
      this.documentType = data;
    }, ((error: any) => {

    }));
  }
  getdepartments() {
    //this.loader.show();
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
   // this.toastr.success('Document type Saved Succesfull!', 'Saved.!');
    return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      
      this.departments = data.Response;
      if (this.departments != null && this.editMode) {
        const myList: string[] = this.documentType.Assigntodepartment.split(",");
        myList.forEach(element => {
          const dept = this.departments.find(o => o.DepartmentName === element);
          if (dept !== undefined)
            this.selectedDepartments.push(dept);
        });
        this.selectedDepartments
      }
      this.spinner.hide();
      console.log(this.departments);
    }, (error: any) => {
      // this.toastr.error('loading failed');
      // this.loader.hide();
    });
  }
  adddoctype(documentType: DocumentTypeConfiguration) {
    if (this.editMode) {
      this.documentType = documentType;
      this.updatetype();
    } else {
      if (!this.isduplicate()) {
        this.addtype(documentType);
      }
    }
  }
  inserttype(documentType: DocumentTypeConfiguration) {

  }
  isduplicate() {
    if (this.grid != null && this.grid.length > 0) {
      const type = this.grid.find(p => p.Documenttypename == this.documentType.Documenttypename);
      if (type != null || type != undefined) {
        this.toastr.error('Duplicate Entity');
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  addtype(documentType: DocumentTypeConfiguration){
    documentType.CreatedBy = this.commonsvc.getUsername();
    documentType.ModifiedBy = this.commonsvc.getUsername();
    documentType.DTCId = "1";
    const dateToSend: Date = new Date();
    const isoDateString: string = dateToSend.toISOString();
    documentType.Status = "pending"
    documentType.Assigntodepartment = this.selectedDepartments.map((obj) => obj.DepartmentName).join(",");
    this.doctypeservice.adddoctypeconfig(documentType).subscribe((res: any) => {
      this.toastr.success('Document Type Saved Succesfull!', 'Saved.!');
      this.location.back();
    });
  }
  updatetype() {
    this.documentType.ModifiedBy=this.commonsvc.getUsername();
    this.doctypeservice.updatedoctypeconfig(this.documentType).subscribe(res => {
      this.commonsvc.documentType = new DocumentTypeConfiguration();
      this.location.back();
      this.spinner.hide();
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }
  closepopup() {

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
  getTypes() {
    this.spinner.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
      return this.doctypeservice.getdoctypeconfig(this.commonsvc.req).subscribe((data: any) => {
        
        this.grid = data.Response;
        this.spinner.hide();
      });
  }
}
