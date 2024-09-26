
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExistingDocumentRequest, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentRequestService } from '../../../services/existing-document-request.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-request',
  templateUrl: './existing-document-request.component.html',
  styleUrls: ['./existing-document-request.component.scss']
})
export class ExistingDocumentRequestComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  access: boolean = false;

  //document preview
  fileBytes: Uint8Array = new Uint8Array();
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  modalRef: BsModalRef | undefined;
  daterev: string | null | undefined;

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private existingDocReqservice: ExistingDocumentRequestService
    , private sanitizer: DomSanitizer, private modalService: BsModalService) { }

  navigateToAddRequest(): void {
    this.router.navigate(['/existingdoc/add']);
  }

  existingDocDatasource: ExistingDocumentRequest[] = [];

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.docrepository ?? false;
    this.getdocumentrequest();    
   // this.existingDocDatasource = this.getDummyData();
    this.currentPage = 10;
  }

  getdocumentrequest() {
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    return this.existingDocReqservice.GetExistingDocumentAll(objrequest).subscribe((data: any) => {
      if (data != null && data.response.length > 0 && data != undefined) {
        data.response.forEach((item: any) => {
          item.effectiveDateValue = this.commonsvc.setDate(item.effectiveDate);
          this.daterev=this.commonsvc.setDate(item.reviewDate);
          if(this.daterev=='31/12/9999'||this.daterev=='01/01/1900')
          {
            item.reviewDateValue = 'NA';
          }
          else
          {
            item.reviewDateValue = this.commonsvc.setDate(item.reviewDate);
          }
        })
      }       
      this.existingDocDatasource = data.response;
      if (this.existingDocDatasource.length < 10)
        this.currentPage = 10;
      this.spinner.hide();
    }, er => {
      console.error('An error occurred:', er);
      this.spinner.hide();
    });
  }

  editExistingDoc(existingDocReq: ExistingDocumentRequest) {
    this.commonsvc.existingDocReq = existingDocReq;
    this.router.navigate(['/existingdoc/edit/' + existingDocReq.edrId]);
  }

  getDummyData() {
    let estdoc = new ExistingDocumentRequest();
    estdoc.edrId = 0;
    estdoc.documenttitle = 'SOP for DMS';
    estdoc.documentno = 'QA/SAP/023';
    estdoc.documenttype = "SOP";
    estdoc.department = "QA"
    estdoc.effectiveDate = new Date()
    estdoc.reviewDate = new Date()
    return [estdoc];
  }

 
  previewtemplate(docInfo: ExistingDocumentRequest): void {
   // debugger
    this.spinner.show();
    this.existingDocReqservice.preview(docInfo).subscribe((data: any) => {
      this.pdfBytes = data;
      this.spinner.hide();
      this.openViewer();
    }, er => {
      this.spinner.hide();
    });
  }
  openViewer(): void {
    
    // if (this.pdfBytes) {
    //   const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
    //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
    //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    //   debugger
      
    //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
    // }
    this.getUrl();
  }
  getUrl():void{
    this.existingDocReqservice.geturl().subscribe((data:any)=>{
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data+'#toolbar=0') as string;
      //this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
  }
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
  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }
}


