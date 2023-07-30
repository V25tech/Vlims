import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateForm} from '../../models/templates';
import { DocumentTemplateConfiguration } from '../../models/DocumentTemplateConfiguration';
import { RequestContext } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
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
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.templatesvc.getdocttemplate(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.commonsvc.templateCount=this.types.length;
        this.spinner.hide();
        console.log(this.types);
      }, (error:any) => {
       
      });
  }
  editdoc(editband: DocumentTemplateConfiguration) {
    debugger
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
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    }else if (status === 'Pending') {
      return 'status-in-progress'; 
    } else {
      return '';
    }
  }
}