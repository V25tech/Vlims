import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Effective } from '../../models/effective';
import { DocumentEffectiveConfiguration, DocumentPreperationConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { DocumentEffectiveService } from 'src/app/modules/services/document-effective.service';

@Component({
  selector: 'app-review-effective',
  templateUrl: './review-effective.component.html',
  styleUrls: ['./review-effective.component.scss']
})
export class ReviewEffectiveComponent {

  effective = new DocumentEffectiveConfiguration();

  typeSource = [];
  workflowsSource = [];
  templatesSource = [];
  departmentsSource = [];
  fileBytes: Uint8Array = new Uint8Array();
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  editMode: boolean = false;
  viewMode: boolean = false;
  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];

  constructor(private location: Location, private router: Router, private modalService: BsModalService, private documentEffectiveService: DocumentEffectiveService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private docPreperationService: DocumentPreperationService,) { }

  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if(segments[segments.length-2].toString()=='view')
    {
      this.viewMode=true;
      this.getbyId(parseInt(segments[segments.length-1],10))
    }
    else if (this.commonsvc.efffective) {      
      this.effective = this.commonsvc.efffective;
    }
    else this.location.back();
    console.log(this.effective);
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.documentEffectiveService.getbyId(arg0).subscribe((data:any)=>{
      this.effective=data;
      this.spinner.hide();
      console.log('request',data);
    });
  }
  approve(){
    this.effective.Status='Approved'
    this.saveEffective();
  }
  reinitiative(){
    this.effective.Status='Re-Initiated'
    this.saveEffective();
  }
  reject(){
    this.effective.Status='Rejected'
    this.saveEffective();
  }

  saveEffective() {
    console.log(this.effective);
    this.spinner.show();
    this.documentEffectiveService.ManageDocumentEffective(this.effective).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.location.back();
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }

  onCancel() {
    this.location.back();
  }



  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }

  openViewer(template: TemplateRef<any>): void {
    if (this.pdfBytes) {
      console.log("safePdfDataUrl" + "-" + this.pdfBytes);
      const pdfBlob = this.b64toBlob(this.pdfBytes.toString(), 'application/pdf');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob)) as string;
      console.log("safePdfDataUrl" + "-" + this.safePdfDataUrl);
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
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
  previewtemplate(template: TemplateRef<any>) {
    this.spinner.show();
    let preparation = new DocumentPreperationConfiguration();
    preparation.path = this.effective.document;
    preparation.document = this.effective.document;
    preparation.CreatedDate = null;
    preparation.ModifiedDate = null;
    preparation.template = this.effective.template ?? 'Annexure3';
    this.docPreperationService.preview(preparation).subscribe((data: any) => {
      debugger
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
  }
}
