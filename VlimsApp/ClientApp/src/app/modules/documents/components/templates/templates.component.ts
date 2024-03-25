import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateForm} from '../../models/templates';
import { DocumentTemplateConfiguration } from '../../models/DocumentTemplateConfiguration';
import { DocumentPreperationConfiguration, RequestContext } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  pdfUrl: string | null = null;
  preparation: DocumentPreperationConfiguration = new DocumentPreperationConfiguration();
  fileBytes: Uint8Array = new Uint8Array();
  currentPage = 10;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  docTypesDatasource = [];
  access:boolean=false;
  templatesDatasource: TemplateForm[] = [];
  types:DocumentTemplateConfiguration[]=[];
  constructor(private router:Router,private templatesvc: DocumentTemplateServiceService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService, private sanitizer: DomSanitizer,
    private preparationsvc:DocumentPreperationService,
    private commonsvc: CommonService) {}

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentTemplateConfig ?? false;
    this.getdocumenttypeconfig();
  }
  getdocumenttypeconfig() {
    this.spinner.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:100,Id:0};
      return this.templatesvc.getdocttemplate(this.commonsvc.req).subscribe((data: any) => {
        if(data!=null&&data.Response!=null&&data.Response.length>0){
          data.Response.forEach((item:any)=>{
            item.CreatedDate=this.commonsvc.setDate(item.CreatedDate)
          })
         } 
        this.types = data.Response;
        this.commonsvc.templateCount=this.types.length;
        this.spinner.hide();
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

  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }
  openViewer(template: TemplateRef<any>): void {
    
    if (this.pdfBytes) {
      const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
  }
  previewtemplate(template: TemplateRef<any>,objtemp: DocumentTemplateConfiguration) {
    
    this.spinner.show();
    // this.preparation.template=objtemp.Templatename;
    // this.preparation.CreatedDate=objtemp.CreatedDate;
    // this.preparation.ModifiedDate=objtemp.ModifiedDate;
    // //this.preparation.dpnid = objtemp.
    this.templatesvc.getTemplate(objtemp.Templatename,true).subscribe((data: any) => {
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
