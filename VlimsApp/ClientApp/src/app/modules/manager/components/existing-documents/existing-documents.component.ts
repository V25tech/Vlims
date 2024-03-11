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

  constructor(private router: Router, private activate:ActivatedRoute, private spinner: NgxSpinnerService, private commonsvc: CommonService, private existdocService: ExistingDocumentsService
    , private modalService: BsModalService, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.docrepository ?? false;
    this.getExistingDocuments();
  }
  getExistingDocuments() {
    try {
      this.spinner.show();
      let objrequest: RequestContext1 = { PageNumber: 1, PageSize: 50, UserName: "admin", Id:0 };

      this.existdocService.getAllDocuments(objrequest).subscribe(data => {
        this.documents = data;
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
    this.router.navigate(["", { querParams: { id: doc.id }, relativeTo: this.access }]);
  }
  previewtemplate(template: TemplateRef<any>): void {
    this.spinner.show();
    //this.existingDocReqservice.preview(docInfo).subscribe((data: any) => {
    //  this.pdfBytes = data;
    //  this.spinner.hide();
    //  this.openViewer(template);
    //}, er => {
    //  this.spinner.hide();
    //});
  }
  openViewer(template: TemplateRef<any>): void {

    if (this.pdfBytes) {
      const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
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
