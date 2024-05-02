import { Component,TemplateRef, OnInit, ViewChild } from '@angular/core';
import { RequestContext } from '../../../../models/model';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DocumentPrintConfiguration, DocumentRequestConfiguration } from '../../../../models/model';
import { DocumentPrintService } from '../../../services/document-print.service';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentPreperationService } from '../../../services/document-preperation.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Paginator } from 'primeng/paginator';
import { Table } from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-print',
  templateUrl: './document-print.component.html',
  styleUrls:['./document-print.component.scss']
})
export class DocumentPrintComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  fileBytes: Uint8Array = new Uint8Array();
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
    private modalService: BsModalService, private sanitizer: DomSanitizer,
    private spinner:NgxSpinnerService,
    private toastr: ToastrService,
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
        debugger;
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
    this.templatesvc.getTemplate(request.template,request.prepId,false).subscribe((data:any)=>{
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
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data) as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
  }
  checkduplicatetemplate(template: TemplateRef<any>,objtemp: DocumentPrintConfiguration){
    this.templatesvc.isduplicate(objtemp.template).subscribe((data:any)=>{
      const isduplicate=Boolean(data);
      if(objtemp.printCount>=objtemp.noofcopies)
        {          
          this.toastr.error('Cannot Print the document as Print Count is more than No of Copies requested');
          return;
        }
      // if(isduplicate){
      //   this.toastr.error('Template used in multiple preparations unable to view document');
      // }else{
      //   this.UpdatePrintCount(objtemp);
      //   this.previewtemplate(template,objtemp);
      // }
      this.UpdatePrintCount(objtemp);
      this.previewtemplate(template,objtemp);
    })
  }
  previewtemplate(template: TemplateRef<any>,objtemp: DocumentPrintConfiguration) {    
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
  UpdatePrintCount(objtemp: DocumentPrintConfiguration)
  {
    let reqObj = JSON.parse(JSON.stringify(objtemp))
    reqObj.modifiedDate = new Date(reqObj.ModifiedDate)
    reqObj.modifiedDate = reqObj.ModifiedDate    
    this.doctypeservice.UpdatePrintRequestCount(reqObj).subscribe(res => {
    this.GetDocumentPrint();
      //this.toastr.success(`Document print request ${this.toastMsg}  succesfull!`, 'Updated.!');
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
    
  }
}

