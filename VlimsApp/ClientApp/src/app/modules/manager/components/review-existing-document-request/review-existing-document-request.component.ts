  
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
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'existing-document-request',
  templateUrl: './review-existing-document-request.component.html',
  styleUrls: ['./review-existing-document-request.component.scss'],
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
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  safePdfDataUrl: SafeResourceUrl | undefined;
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  effectiveDate: string | undefined;
  isFileUploadError: boolean = false;
  reviewDate: string | undefined;
  departmentsSource = [];
  typeSource = [];
  printType = 'single';

  constructor(private commonsvc: CommonService, private location: Location, private spinner: NgxSpinnerService, private modalService: BsModalService, private sanitizer: DomSanitizer, private existingDocReqservice: ExistingDocumentRequestService, private route: ActivatedRoute,
    private deptservice: DepartmentconfigurationService, private doctypeserv: DocumentTypeServiceService, private toastr: ToastrService,) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getdepartments();
    this.getdocumenttypeconfig();
    if (this.id) { //edit mode
      this.editMode = true;
      if (this.commonsvc.existingDocReq.edrId > 0) {
        let data:any = this.commonsvc.existingDocReq;
        data.effectiveDate = this.toDate(data.effectiveDate);
        data.reviewDate = this.toDate(data.reviewDate);
        this.existingDocReq = data;
        //this.effectiveDate = this.toDate(this.existingDocReq.effectiveDate);
        //this.reviewDate = this.toDate(this.existingDocReq.reviewDate);
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
      if (res) {
        res.effectiveDate = this.toDate(res.effectiveDate);
        res.reviewDate = this.toDate(res.reviewDate);
        this.existingDocReq = res;
      }      
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
      if (this.printType == 'bulk') {
        this.importBulkFile();
      } else {
        this.Add();
      }
    }
  }

  Add() {

    if (!this.viewMode) {
      let reqObj = JSON.parse(JSON.stringify(this.existingDocReq));
      reqObj.createdBy = 'admin';
      reqObj.modifiedBy = 'admin';
      reqObj.createdDate = new Date();
      reqObj.modifiedDate = new Date();
      reqObj.effectiveDate = new Date(reqObj.effectiveDate);
      reqObj.reviewDate = new Date(reqObj.reviewDate);
      if (!this.selectedFile || !this.existingDocReq.document) {
        console.error('No file selected.');
        this.isFileUploadError = true;
        return;
      }
      this.spinner.show();
      this.existingDocReqservice.adddExistingDocument(reqObj).subscribe(res => {
        this.location.back();
        this.spinner.hide();
        this.toastr.success('Document details saved suscessfully','Saved.!');
      }, er => {
        console.log(er);
        this.spinner.hide();
      });
    }
  }

  Update() {
    if (!this.existingDocReq.document) {
      console.error('No file selected.');
      this.isFileUploadError = true;
      return;
    }
    let reqObj = JSON.parse(JSON.stringify(this.existingDocReq))
    reqObj.effectiveDate = (reqObj.effectiveDate)
    reqObj.reviewDate = new Date(reqObj.reviewDate)
    this.existingDocReqservice.UpdateExistingDocument(reqObj).subscribe(res => {
      this.commonsvc.existingDocReq = new ExistingDocumentRequest();
      this.location.back();
      this.spinner.hide();
      this.toastr.success('Document details update suscessfully','Updated.!');
    }, er => {
      console.log(er);
      this.spinner.hide();
    });
  }

  toDate(pdate: Date | undefined) {
    if (pdate == undefined) return undefined;
    pdate = new Date(pdate);
    const yyyy = pdate.getFullYear();
    let mm = pdate.getMonth() + 1;
    let dd = pdate.getDate();
    return yyyy + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  }
  //getAsDate(event: any) {
  //  return event.target.value;
  //}

  onCancel() {
    this.location.back();
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.isUploaded = false; // Reset upload status when a new file is selected
    this.isFileUploadError = false;
  }
  onUpload(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.isFileUploadError = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.spinner.show();
    this.existingDocReqservice.upload(formData)
      .subscribe(
        (response: any) => {
          this.existingDocReq.document = response.uniqueFileName;
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
    this.isFileUploadError = true;
    this.existingDocReq.document = '';
    if (this.InputVar) this.InputVar.nativeElement.value = "";
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
      this.pdfBytes = data;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
  }

  importBulkFile() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.isFileUploadError = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.spinner.show();
    this.existingDocReqservice.import(formData)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.toastr.success('Import!', 'Successfully.!');
          this.location.back();
        },
        (error: any) => {
          debugger;
          console.log('Error uploading file:', error);
          this.toastr.error(error.error);          
          this.spinner.hide();
        }
      );
  }

  dataK: AOA = [['DocumentType','Department','DocumentTitle','DocumentNo','EffectiveDate','ReviewDate','UploadDocument']];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'template.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.dataK = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataK);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}


