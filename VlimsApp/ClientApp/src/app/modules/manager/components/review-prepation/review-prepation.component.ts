import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentPreperationConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
import { WorkflowServiceService } from 'src/app/modules/services/workflow-service.service';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common.service';
import { DocumentTemplateServiceService } from 'src/app/modules/services/document-template-service.service';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-review-prepation',
  templateUrl: './review-prepation.component.html',
  styleUrls: ['./review-prepation.component.scss']
})
export class ReviewPrepationComponent {

  preparation: DocumentPreperationConfiguration = new DocumentPreperationConfiguration();
  selectedFile: any;
  isUploaded: boolean = false;
  departmentsSource = [];
  typeSource = [];
  workflowsSource = [];
  docNoType = 'User Defined';
  @ViewChild("fileInput", { static: false })
  InputVar: ElementRef | undefined;
  fileBytes: Uint8Array = new Uint8Array();
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  viewMode:boolean=false;
  editMode:boolean=false;

  stageSource = [
    { label: 'Select Stage', value: '' },
    { label: 'Stage 1', value: 'option2' },
    { label: 'Stage 2', value: 'option3' },
  ];

  templatesSource = [];

  constructor(private location: Location, private router: Router, private modalService: BsModalService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private docPreperationService: DocumentPreperationService, private commonsvc: CommonService, private deptservice: DepartmentconfigurationService, private wfservice: WorkflowServiceService, private doctypeserv: DocumentTypeServiceService, private templateService: DocumentTemplateServiceService) { }

  ngOnInit() {
    debugger
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    if(segments[segments.length-2].toString()=='view')
    {
      this.viewMode=true;
      this.getbyId(parseInt(segments[segments.length-1],10))
    }
    else if (this.commonsvc.preperation.dpnid) {
      this.preparation = this.commonsvc.preperation;
      debugger;
      console.log('rr',this.preparation);
      if (this.InputVar)
        this.InputVar.nativeElement.value = 'rst.docx';
      console.log(this.preparation);
    }
    else {
      this.location.back();
    }
    this.getdocttemplate();
  }
  getbyId(arg0: number) {
    this.spinner.show();
    return this.docPreperationService.getbyId(arg0).subscribe((data:any)=>{
      this.preparation=data;
      this.spinner.hide();
      console.log('request',this.preparation);
    });
  }
  approve(){
    this.preparation.status='Approved'
    this.savePreparation();
  }
  reinitiative(){
    this.preparation.status='Re-Initiated'
    this.savePreparation();
  }
  reject(){
    this.preparation.status='Rejected'
    this.savePreparation();
  }
  savePreparation() {
    this.spinner.show();
    this.docPreperationService.ManageDocument(this.preparation).subscribe(res => {
      this.commonsvc.preperation = new DocumentPreperationConfiguration();
      console.log(res);
      this.spinner.hide();
      this.location.back();
    }, er => {
      console.log(er);
      this.spinner.hide();
    })
  }

  onCancel() {
    this.location.back();
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.isUploaded = false; // Reset upload status when a new file is selected
  }
  onUpload(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.spinner.show();
    this.docPreperationService.upload(formData)
      .subscribe(
        (response: any) => {

          this.preparation.path = response.filePath;
          this.preparation.document = response.filePath;
          this.commonsvc.preperation = this.preparation;
          this.isUploaded = true; // Set upload status to true after successful upload
          this.spinner.hide();
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.spinner.hide();
        }
      );
  }
  onDeleteFile(): void {
    this.selectedFile = null;
    this.isUploaded = false;
    this.preparation.document = '';
    this.preparation.path = '';
    if (this.InputVar) this.InputVar.nativeElement.value = "";
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
      this.modalRef = this.modalService.show(template,{ class: 'modal-lg' });
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
    this.docPreperationService.preview(this.preparation).subscribe((data: any) => {
      debugger
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    },er => {
      this.spinner.hide();
    });
  }

  getdocttemplate() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.templateService.getdocttemplate(objrequest).subscribe((data: any) => {
      this.templatesSource = data.Response;
    });
  }
}
