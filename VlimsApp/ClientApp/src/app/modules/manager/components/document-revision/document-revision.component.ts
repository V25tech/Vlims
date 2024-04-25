import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentAdditionalTasks, DocumentRevisionRequest, DocumentTemplateConfiguration, RequestContext } from 'src/app/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { DocumentRevisionService } from 'src/app/modules/services/document-revision.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'document-revision',
  templateUrl: './document-revision.component.html',
  styleUrls: ['./document-revision.component.scss'],
})
export class DocumentRevisionRequestsComponent implements OnInit{
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [1,10, 20, 50];
  access:boolean=false;
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  fileBytes: Uint8Array = new Uint8Array();
  constructor(private router: Router,private spinner: NgxSpinnerService, private commonsvc: CommonService, 
    private documentRevisionService: DocumentRevisionService,
    private modalService: BsModalService, private sanitizer: DomSanitizer,
    private templatesvc:DocumentTemplateServiceService
    ) {}

  navigateToAddRequest(): void {
    this.router.navigate(['/revision/add']);
  }

  revisionDatasource = [];

  ngOnInit() {   
    this.access = this.commonsvc.getUserRoles()?.documentRevison ?? false;
    this.getdocumentRevisions();

  }

  getStatusClass(status: string): string {
    if (status === 'In Progress' || status === 'InProgress') {
      return 'status-in-progress';
    } else if (status === 'REJECTED') {
      return 'status-reject';
    }else if (status === 'In-Progress') {
      return 'status-in-progress';
    } else if (status === 'Re-Initiated') {
      return 'status-under-review';
    }else if (status === 'Approved') {
      return 'status-approved';
    } else {
      return '';
    }
  }

  
  getdocumentRevisions() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.documentRevisionService.getdocumentRevisions(this.commonsvc.req).subscribe((data: any) => {     
      this.revisionDatasource = data.response;
      console.log('revisions',this.revisionDatasource);
      if(this.revisionDatasource.length<10)
      this.currentPage=10;
      this.spinner.hide();
    }, er => {
      console.error('An error occurred:', er);
      this.spinner.hide();
    });
  }

  editdocrevision(revision: DocumentAdditionalTasks) {
    this.commonsvc.revision = revision;
    this.router.navigate(['/revision/edit/'+revision.atid]);
  }
  ExportFiles(fileContent: any, fileType: string, fileName: string, fileExtension?: string) {
    try {
        // Convert base64 string to binary data
        const binaryString = atob(fileContent);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create Blob from binary data
        const blob = new Blob([bytes], { type: fileType || 'application/octet-stream' });

        // Create download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName ? `${fileName}.${fileExtension || 'docx'}` : `${this.GetGUID()}.${fileExtension || 'docx'}`;

        // Trigger download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error exporting file:', error);
        // Handle error as needed
    }
}

  
  hasValue(value:any) {
    let variables = {};
    //  if(value===0)
    // {
    //   return true;
    // }
    // else
    if (value == null || value == undefined || value == "" || value == "NA") {
      return false;
    }
    return true;
  }
  GetGUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  // previewtemplate(objtemp: DocumentRevisionRequest) {
  //   this.spinner.show();
  //   this.templatesvc.getTemplate(objtemp.template,false).subscribe((data: any) => {
  //   this.ExportFiles(data,"docx",objtemp.template,"docx");
  //   this.spinner.hide();
  //   }, (error:any) => {
  //     this.spinner.hide();
  //   });
  // }
  previewtemplate(template: TemplateRef<any>,objtemp: DocumentRevisionRequest) {
    
    this.spinner.show();
    // this.preparation.template=objtemp.Templatename;
    // this.preparation.CreatedDate=objtemp.CreatedDate;
    // this.preparation.ModifiedDate=objtemp.ModifiedDate;
    // //this.preparation.dpnid = objtemp.
    this.templatesvc.getTemplate(objtemp.template,objtemp.prepId,true).subscribe((data: any) => {
    //this.preparationsvc.previewtemplate(Number.parseInt(objtemp.DTID)).subscribe((data: any) => {
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    }, (error:any) => {
      this.spinner.hide();
    });
  }
  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }

  openViewer(template: TemplateRef<any>): void {
    
    // if (this.pdfBytes) {
    //   const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
    //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
    //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    //   debugger
      
    //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
    // }
    this.getUrl(template);
  }
  getUrl(template: TemplateRef<any>):void{
    this.templatesvc.geturl().subscribe((data:any)=>{
      debugger
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data+'#toolbar=0') as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
  }

  // Function to convert base64 to Blob
  private b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

}
