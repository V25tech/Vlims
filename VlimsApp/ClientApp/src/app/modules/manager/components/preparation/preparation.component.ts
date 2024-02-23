import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DocumentPreperationConfiguration, DocumentTemplateConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentTemplateServiceService } from '../../../services/document-template-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  preparationsDatasource: DocumentPreperationConfiguration[] = [];
  totalCount = 0;
  access: boolean = false;
  //document preview
  templatesSource: Array<DocumentTemplateConfiguration> = [];
  preparation: DocumentPreperationConfiguration = new DocumentPreperationConfiguration();
  fileBytes: Uint8Array = new Uint8Array();
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  modalRef: BsModalRef | undefined;

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private docPreperationService: DocumentPreperationService
    , private templateService: DocumentTemplateServiceService, private sanitizer: DomSanitizer, private modalService: BsModalService,) { }

  navigateToAddPreparation(docPreperation: DocumentPreperationConfiguration): void {
    this.commonsvc.preperation = docPreperation;
    this.router.navigate(['/preparation/review']);
  }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentPreperation ?? false;
    this.spinner.show();
    this.getdocttemplate();
    let request: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.docPreperationService.getdocumentpreparations(this.commonsvc.req).subscribe((data: any) => {
      this.preparationsDatasource = data.response;
      let ids: number[] = [];
      this.preparationsDatasource.forEach(p=>{
        if(ids.includes(p.referenceId)){
          p.isrevision=true;
        }
        else{
          ids.push(p.referenceId);
        }
      })
      console.log(this.preparationsDatasource);
      if(this.preparationsDatasource.length<10)
      {
      this.currentPage=10;
      this.totalCount = data.rowCount;
      }
      this.spinner.hide();
    }, er => {
      console.log(er);
      this.spinner.hide();
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
    } else if (status === 'Pending') {
      return 'status-pending';
    }else if (status === 'REVIEWED') {
      return 'status-in-progress';
    } else {
      return '';
    }
  }
  islocked(status:string): boolean{
    switch (status) {
      case 'Reviewed':
        return true;
        case 'Approved':
        return true;
        case 'REVIEWED':
        return true;
        case 'APPROVED':
        return true;
      default:
        return false;
    }
  }
  getdocttemplate() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.templateService.getdocttemplate(objrequest).subscribe((data: any) => {
      this.templatesSource = data.Response;
      //this.templatesSource = this.templatesSource.filter(o => o.documenttype.toLocaleLowerCase() === this.preparation.documenttype.toLocaleLowerCase());
    });
  }

  previewtemplate(template: TemplateRef<any>, templateName: string): void {
    this.spinner.show(); let id = 0;
    let obj = this.templatesSource.find(o => o.Templatename === templateName);
    if (obj != null && obj != undefined) {
      id = parseInt(obj.DTID);
    }
    this.templateService.getTemplate(templateName).subscribe((data: any) => {
      // this.docPreperationService.previewtemplate(id).subscribe((data: any) => {
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
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
