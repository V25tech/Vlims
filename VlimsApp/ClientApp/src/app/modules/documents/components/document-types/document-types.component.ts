import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentTypeConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';


@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.scss'],
})
export class DocumentTypesComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  docTypesDatasource = [];
  access:boolean=false;
  //docs:DocumentTypeConfiguration[]=[];
  types:DocumentTypeConfiguration[]=[];
  constructor(private router:Router, private documenttypeService: DocumentTypeServiceService,
    private spinner: NgxSpinnerService,
    private commonsvc: CommonService) {}

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentTypeConfig ?? false;
    console.log('access',this.access);
    this.getdocumenttypeconfig();
  }

  getdocumenttypeconfig() {
    this.spinner.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
      return this.documenttypeService.getdoctypeconfig(objrequest).subscribe((data: any) => {
        if(data!=null&&data.Response!=null&&data.Response.length>0){
          data.Response.forEach((item:any)=>{
            item.ModifiedDate=this.commonsvc.setDate(item.ModifiedDate)
          })
         } 
        this.types = data.Response;
        this.spinner.hide();
      },
      (error: any) => {
        console.error('An error occurred:', error);
      });
  }

  navigateToAddDocumentType(): void {
    this.router.navigate(['/document-type/add']);
  }
  editdoc(editband: DocumentTypeConfiguration) {
    
    this.commonsvc.documentType=editband;
    this.router.navigate(['/document-type/edit',editband.DTCId]);
  }
  getStatusClass(status: string): string {
    
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    }else if (status === 'Under Review') {
      return 'status-under-review';
    }else if (status === 'Pending') {
      return 'status-in-progress'; 
    }else {
      return '';
    }
  }
}
