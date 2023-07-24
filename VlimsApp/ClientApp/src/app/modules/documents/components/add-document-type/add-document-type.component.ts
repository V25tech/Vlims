import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { DocumentType } from '../../models/document-type';
import { DepartmentConfiguration, DocumentTypeConfiguration, RequestContext } from 'src/app/models/model';

import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss'],
})
export class AddDocumentTypeComponent {
  documentType = new DocumentTypeConfiguration();
  departments:DepartmentConfiguration[]=[];
  selectedDepartments:DepartmentConfiguration[] = [];
  viewMode:boolean=false;editMode:boolean=false;
  constructor(
    private location: Location,
    private deptservice: DepartmentconfigurationService,
    private doctypeservice: DocumentTypeServiceService,
    private spinner: NgxSpinnerService,
    private commonsvc:CommonService,
    private cdr: ChangeDetectorRef,
    //private loader: SpinnerService,
    private router: Router
  ) {
    this.selectedDepartments = [];
  }

  ngOnInit()
  {
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    if(lastSegment=="edit")
    {
      this.editMode=true;this.viewMode=false;
      this.documentType=this.commonsvc.documentType;
    }
    else if(lastSegment=="view") {
      this.viewMode=true;this.editMode=false;
      this.documentType=this.commonsvc.documentType;
    }
    this.getdepartments();
    this.cdr.detectChanges();
  }
  onCancel() {
    this.location.back();
  }

  getdepartments() {
    //this.loader.show();
    this.spinner.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
        debugger
        this.departments = data.Response;
        if(this.departments!=null && this.editMode)
        {
          const myList: string[] = this.documentType.Assigntodepartment.split(",");
          myList.forEach(element => {
            const dept=this.departments.find(o=>o.DepartmentName===element);
            if(dept!==undefined)
            this.selectedDepartments.push(dept);    
          });
          this.selectedDepartments
        }
         this.spinner.hide();
        console.log(this.departments);
      }, (error:any) => {
        // this.toastr.error('loading failed');
        // this.loader.hide();
      });
  }
  adddoctype(documentType: DocumentTypeConfiguration) {
    debugger
    documentType.CreatedBy="admin";
    documentType.ModifiedBy = "admin";
    documentType.DTCId="1";
    const dateToSend: Date = new Date();
    const isoDateString: string = dateToSend.toISOString();
    //documentType.ModifiedDate=isoDateString;
    documentType.Status="pending"
    documentType.Assigntodepartment=this.selectedDepartments.map((obj)=>obj.DepartmentName).join(",");
    //documentType.SelectedDepartments=this.selectedDepartments;
    if(this.selectedDepartments!=null && this.selectedDepartments.length>0)
    {
    this.doctypeservice.adddoctypeconfig(documentType).subscribe((res:any)=>{
     
      this.location.back();
    });
  }
  else
  {

  }
  }

}
