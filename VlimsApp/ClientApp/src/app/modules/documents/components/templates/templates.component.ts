import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateForm} from '../../models/templates';
import { DocumentTemplateConfiguration } from '../../models/DocumentTemplateConfiguration';
import { RequestContext } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  docTypesDatasource = [];

  templatesDatasource: TemplateForm[] = [];
  types:DocumentTemplateConfiguration[]=[];
  constructor(private router:Router,private templatesvc: DocumentTemplateServiceService,
    private spinner: NgxSpinnerService,
    private commonsvc: CommonService) {}

  ngOnInit() {
    this.getdocumenttypeconfig();
  }
  getdocumenttypeconfig() {
    this.spinner.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:100,Id:0};
      return this.templatesvc.getdocttemplate(this.commonsvc.req).subscribe((data: any) => {
        
        this.types = data.Response;
        this.commonsvc.templateCount=this.types.length;
        this.spinner.hide();
        console.log(this.types);
      }, (error:any) => {
       
      });
  }
  editdoc(editband: DocumentTemplateConfiguration) {
    
    this.commonsvc.template=editband;
    //this.router.navigate(['/templates/view',editband.Templatename]);
    this.router.navigate(['/templates/edit',editband.DTID]);
  }
  navigateToAddTemplate(): void {
    const count = this.types.length;
    this.router.navigate(['/templates/add', count]);
  }

  filterTable(event:any) {
    // Filter the data based on the templateName column
   const filterValue = event?.target.value
    this.templatesDatasource = this.templatesDatasource.filter(item => item.templateName.toLowerCase().includes(filterValue.toLowerCase()));
  }



  getStatusClass(status: string): string {
    
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'In-Progress') {
      return 'status-in-progress';
    }else if (status === 'Completed') {
      return 'status-completed';
    }else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    }else if (status === 'Pending') {
      return 'status-in-progress'; 
    }else if (status === 'APPROVED') {
      return 'status-approved';
    }else if (status === 'Approved') {
      return 'status-approved';
    }else {
      return '';
    }
  }
}
