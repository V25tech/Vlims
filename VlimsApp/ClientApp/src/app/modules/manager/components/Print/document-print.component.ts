import { Component, OnInit } from '@angular/core';
import { RequestContext } from '../../../../models/model';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { DocumentPrintConfiguration, DocumentRequestConfiguration } from '../../../../models/model';
import { DocumentPrintService } from '../../../services/document-print.service';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';

@Component({
  selector: 'app-document-print',
  templateUrl: './document-print.component.html',
  styleUrls:['./document-print.component.scss']
})
export class DocumentPrintComponent implements OnInit {
  name: string = 'Product Type';
  requests: DocumentPrintConfiguration[] = [];
  newtype = new DocumentPrintConfiguration();
  objProductType = new DocumentPrintConfiguration();
  requestsInfo: DocumentRequestConfiguration[] = [];
  retailId: number = 0;
  header: string = '';
  actiontype: number = 0;
  pageConfig: any;
  searchstr: string = '';
  access: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentPrintService, 
    private templatesvc:DocumentTemplateServiceService,
    private docservice: DocumentPreperationService, private router: Router) { }

  navigateToAddPrint(): void {
    this.router.navigate(['/print/add']);
  }
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentRevison ?? false;
    this.GetDocumentPrint();
  }

  GetDocumentPrint() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.GetDocumentPrint(objrequest).subscribe((data: any) => {
      if(data!=null&&data.response!=null&&data.response.length>0){
        data.response.forEach((item:any)=>{
          item.modifiedDate=this.commonsvc.setDate(item.modifiedDate)
        })
        this.requests = data.response;
       } 
      // this.requests = data.response;
      console.log(this.requests);
    });
  }
  getdocumentrequest() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.docservice.getdocumentpreparations(objrequest).subscribe((data: any) => {
      this.requestsInfo = data.response;
    });
  }
  getStatusClass(status: string): string {
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Approved') {
      return 'status-approved';
    } else if (status === 'Active') {
      return 'status-Active';
    }
    else {
      return '';
    }
  }
  editdoc(request: DocumentPrintConfiguration) {
    this.commonsvc.printConfig = request;
    this.router.navigate(['/print/edit']);
  }
  print(request: DocumentPrintConfiguration){
    this.templatesvc.getTemplate(request.template,false).subscribe((data:any)=>{
      debugger
      this.exportFiles(data,"docx",request.template,"docx");
    });
  }
  exportFiles(
    fileContent: any,
    fileType: string,
    fileName: string,
    fileExtension?: string
  ) {
    // Convert base64 content to Uint8Array
    const binary_string = window.atob(fileContent);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
  
    // Create a Blob from the bytes
    const blob = new Blob([bytes], {
      type: fileType ? fileType : 'application/octet-stream'
    });
  
    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + (fileExtension ? '.' + fileExtension : '');
  
    // Trigger the download
    link.click();
  }
  
  
}

