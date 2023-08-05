
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ExistingDocumentRequest, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentRequestService } from '../../../services/existing-document-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DepartmentconfigurationService } from 'src/app/modules/services/departmentconfiguration.service';
import { DocumentTypeServiceService } from 'src/app/modules/services/document-type-service.service';
@Component({
  selector: 'existing-document-request',
  templateUrl: './review-existing-document-request.component.html',
  styleUrls: ['./review-existing-document-request.component.scss']
})
export class ReviewExistingDocumentRequestComponent implements OnInit {
  existingDocReq: ExistingDocumentRequest = new ExistingDocumentRequest();
  editMode = false;
  viewMode = false;
  fileUploadLink = '';
  id: string = '';
  selectedFile: any;
  isUploaded: boolean = false;
  @ViewChild("fileInput", { static: false })
  InputVar: ElementRef | undefined;
  fileBytes: Uint8Array = new Uint8Array();
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  effectiveDate: string | undefined;
  reviewDate: string | undefined;
  departmentsSource= [];
  typeSource = [];


  constructor(private commonsvc: CommonService, private location: Location, private spinner: NgxSpinnerService, private modalService: BsModalService, private sanitizer: DomSanitizer, private existingDocReqservice: ExistingDocumentRequestService, private route: ActivatedRoute,
    private deptservice: DepartmentconfigurationService, private doctypeserv: DocumentTypeServiceService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getdepartments();
    this.getdocumenttypeconfig();
    if (this.id) { //edit mode
      this.editMode = true;
      if (this.commonsvc.existingDocReq) {
        this.existingDocReq = this.commonsvc.existingDocReq;        
        this.effectiveDate = this.toDate(this.existingDocReq.effectiveDate);
        this.reviewDate = this.toDate(this.existingDocReq.reviewDate);
      }
      else
        this.getExistingDocument(this.id);
    }
  }

  adddExistingDocument() {
    this.spinner.show();
    this.existingDocReqservice.adddExistingDocument(this.existingDocReq).subscribe(res => {
      this.spinner.hide();
      this.location.back();
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }

  getExistingDocument(id: string) {
    this.spinner.show();
    this.existingDocReqservice.GetExistingDocumentById(id).subscribe((res: any) => {
      this.existingDocReq = res;      
      this.effectiveDate = this.toDate(this.existingDocReq.effectiveDate);
      this.reviewDate = this.toDate(this.existingDocReq.reviewDate);
      this.spinner.hide();
    }, er => {
      this.spinner.hide();
      console.log(er);
    });
  }

  getdepartments() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.deptservice.getdepartments(objrequest).subscribe((data: any) => {
      this.departmentsSource = data.Response;
    });
  }
  getdocumenttypeconfig() {
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 1, Id: 0 };
    this.doctypeserv.getdoctypeconfig(objrequest).subscribe((data: any) => {
      this.typeSource = data.Response;
    });
  }

  Save() {
    if (this.editMode) {      
      this.Update();
    }
    else {
      this.Add();
    }
  }

  Add() {
    if (!this.viewMode) {
      this.existingDocReq.createdBy = 'admin';
      this.existingDocReq.modifiedBy = 'admin';
      this.existingDocReq.createdDate = new Date();
      this.existingDocReq.modifiedDate = new Date();
      this.spinner.show();

      this.existingDocReqservice.adddExistingDocument(this.existingDocReq).subscribe(res => {
        this.location.back();
        this.spinner.hide();
      }, er => {
        console.log(er);
        this.spinner.hide();
      });
    }
  }

  Update() {
    this.existingDocReqservice.UpdateExistingDocument(this.existingDocReq).subscribe(res => {
      this.commonsvc.existingDocReq = new ExistingDocumentRequest();
      this.location.back();
      this.spinner.hide();
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }

  toDate(pdate: Date | undefined) {
    if (pdate == undefined) return undefined;
    const yyyy = pdate.getFullYear();
    let mm = pdate.getMonth() + 1;
    let dd = pdate.getDate();
    return yyyy + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  }
  getAsDate(event: any) {
    return event.target.valueAsDate;
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
    this.existingDocReqservice.upload(formData)
      .subscribe(
        (response: any) => {
          this.existingDocReq.document = response.filePath;
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
    this.existingDocReq.document = '';
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
    this.existingDocReqservice.preview(this.existingDocReq).subscribe((data: any) => {
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


