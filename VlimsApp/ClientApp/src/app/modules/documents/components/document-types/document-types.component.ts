import { Component } from '@angular/core';

import { Router } from '@angular/router';



import { CommonService } from 'src/app/shared/common.service';
import { DocumentTypeConfiguration } from '../../models/DocumentTypeConfiguration';
import { RequestContext } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.scss'],
})
export class DocumentTypesComponent {
  docTypesDatasource = [];
  //docs:DocumentTypeConfiguration[]=[];
  types:DocumentTypeConfiguration[]=[];
  constructor(private router:Router, private documenttypeService: DocumentTypeServiceService,private commonsvc: CommonService) {}

  ngOnInit() {
    debugger
    this.getdocumenttypeconfig();
  }

  getdocumenttypeconfig() {
    //this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
      return this.documenttypeService.getdoctypeconfig(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        //this.loader.hide();
        console.log(this.types);
      },
      (error: any) => {
        console.error('An error occurred:', error);
      });
  }

  navigateToAddDocumentType(): void {
    this.router.navigate(['/document-type/add']);
  }
  editdoc(editband: DocumentTypeConfiguration) {
    debugger
    this.commonsvc.documentType=editband;
    this.router.navigate(['/document-type/edit']);
  }
  getStatusClass(status: string): string {
    debugger
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    }else if (status === 'Pending') {
      return 'status-in-progress'; 
    }else {
      return '';
    }
  }
}
