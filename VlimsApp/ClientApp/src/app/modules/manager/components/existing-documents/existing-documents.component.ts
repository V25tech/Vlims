import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentsService } from '../../services/existing-documents.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { RequestContext1 } from '../../../../models/model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';

@Component({
  selector: 'app-exisitngdocuments',
  templateUrl: './existing-documents.component.html'
})

export class ExistingDocumentsComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  access: boolean = false;
  documents: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];

  //document preview
  fileBytes: Uint8Array = new Uint8Array();
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  modalRef: BsModalRef | undefined;
  daterev: string | null | undefined;

  constructor(private router: Router, private activate:ActivatedRoute, private spinner: NgxSpinnerService, private commonsvc: CommonService, private existdocService: ExistingDocumentsService
      ,private templatesvc:DocumentTemplateServiceService
    , private modalService: BsModalService, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.docrepository ?? false;
    this.getExistingDocuments();
  }
  getExistingDocuments() {
    try {
      this.spinner.show();
      let objrequest: RequestContext1 = {
          PageNumber: 1, PageSize: 1000, UserName: localStorage.getItem("username"), Id: 0,
          type: null
      };

      this.existdocService.getAllDocuments(this.commonsvc.req).subscribe((data: any) => {
        if (data != null && data.exisitingDocuments.length > 0 && data != undefined) {
          data.exisitingDocuments.forEach((item: any) => {
            item.effectiveDateValue = this.commonsvc.setDate(item.effectiveDate);
            this.daterev=this.commonsvc.setDate(item.reviewDate);
            //debugger;
            if(this.daterev=='31/12/9999'||this.daterev=='01/01/1900')
              {
                item.reviewDateValue = 'NA';
              }
              else
              {
                item.reviewDateValue = this.commonsvc.setDate(item.reviewDate);
              }
            //item.reviewDateValue = (item.reviewDate != null || item.reviewDate != 'NA') ? this.commonsvc.setDate(item.reviewDate): 'NA';
          })
          this.documents = data;
        }       
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        console.log(err);
      })
    } catch (e) {
      this.spinner.hide();
    }
  }
  editdoc(doc: any) {
    this.router.navigate(["revision/edit/" + doc.id], { queryParams: { entityName: doc.entityName } });
  }
  // checkduplicatetemplate(template: TemplateRef<any>){
  //   this.templatesvc.isduplicate(this.preparation.template).subscribe((data:any)=>{
  //     const isduplicate=Boolean(data);
  //     if(isduplicate){
  //       this.toastr.error('Template used in multiple preparations unable to view document');
  //     }else{
  //       this.previewtemplate(template);
  //     }
  //   })
  // }
  previewDocument(template: TemplateRef<any>, docInfo: any) {
    if (docInfo.entityName.toLowerCase() == 'new document') {
      this.previewRevisionDocument(template, docInfo,true)
    } else {
      this.previewtemplate(template, docInfo);
    }
  }

  previewtemplate(template: TemplateRef<any>, docInfo: any): void {
    this.spinner.show();
    docInfo.edrId = docInfo.id;
    this.existdocService.preview(docInfo).subscribe((data: any) => {
      this.pdfBytes = data;
      this.spinner.hide();
      this.openViewer(template,false);
    }, er => {
      this.spinner.hide();
    });
  }
  openViewer(template: TemplateRef<any>,istempcont:boolean): void {
    
    // if (this.pdfBytes) {
    //   const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
    //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
    //   this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    //   debugger
      
    //   this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:7157/pdfs/DocumentWithHeaderTable.pdf"+'#toolbar=0') as string;
    // }
    if(!istempcont){
    this.getUrl(template);
    }else{
      this.getUrl1(template);
    }
  }
  getUrl(template: TemplateRef<any>):void{
    this.existdocService.geturl().subscribe((data:any)=>{
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data+'#toolbar=0') as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
  }
  getUrl1(template: TemplateRef<any>):void{
    this.templatesvc.geturl().subscribe((data:any)=>{
      this.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data+'#toolbar=0') as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
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
  previewRevisionDocument(template: TemplateRef<any>, docInfo: any,istempcont:boolean) {
    this.spinner.show();
    this.existdocService.getTemplate(docInfo.template,docInfo.prepId).subscribe((data: any) => {
      this.pdfBytes = data;
      this.spinner.hide();
      this.openViewer(template,istempcont);
    }, (error: any) => {
      this.spinner.hide();
    });
  }
}
