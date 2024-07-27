import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { DocumentTemplateServiceService } from '../../modules/services/document-template-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  visible: boolean = false;
  @Input() gridConfig: any = {};
  @Input() module: any = '';
  @Input() entityName: any = '';
  @Input() title: any = '';
  @Input() fieldsToShow: any = [];
  @Input() filedsofActivity: any = [];
  data: string = '<base64-encoded-data>';
  pdfUrl: string | null = null;
  modalRef: BsModalRef | undefined;
  pdfBytes: Uint8Array | undefined;
  fileBytes: Uint8Array = new Uint8Array();
  iscompleteheader: boolean = true;
  
  constructor(public commonsrvc: CommonService, private templateService: DocumentTemplateServiceService, private sanitizer: DomSanitizer, private modalService: BsModalService,
 private spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    console.log('fieldsToShow:', this.fieldsToShow); // Log the initial value of fieldsToShow
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  ngOnChanges() {
    if (this.entityName.toLowerCase() != 'preparation' && this.entityName.toLowerCase() != 'effective'  && this.entityName.toLowerCase() != 'print' )
    this.gridConfig = this.gridConfig.reverse();
    console.log(this.module);
    console.log(this.entityName); 
    console.log(this.gridConfig);
  }
  showDialog() {
    this.visible = true;
  }
  groupedRecordsKeys(): number[] {
    
    return Object.keys(this.gridConfig).map(Number);
  }

  getUrl(template: TemplateRef<any>): void {
    this.templateService.geturl().subscribe((data: any) => {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data + '#toolbar=0') as string;
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    })
  }
  closeModel() {
    if (this.modalRef)
      this.modalRef.hide();
  }
  viewprint(template: TemplateRef<any>, data: any) {
    console.log(data);
    this.spinner.hide();
    this.previewtemplate(template, data);
  }
  previewtemplate(template: TemplateRef<any>, data:any) {


    this.templateService.getTemplate(data.template, parseInt(data.DPNID), true).subscribe((data: any) => {
      //this.docPreperationService.previewtemplate(id).subscribe((data: any) => {
      this.iscompleteheader = true;
      this.fileBytes = data;
      this.pdfBytes = this.fileBytes;
      this.spinner.hide();
      this.openViewer(template);
    }, er => {
      this.spinner.hide();
    });
  }
  openViewer(template: TemplateRef<any>): void {

    this.getUrl(template);
  }
  setLabelName(docType: string): string {
    switch (docType.toUpperCase()) {
      case "STANDARD TESTING SPECIFICATION":
        return "STS No.";
        break;
      case "STANDARD TESTING PROCEDURE":
        return "STP No.";
        break;
      case "STANDARD OPERATING PROCEDURE":
        return "SOP No.";
        break;
      case "BATCH PACKING RECORD":
        return "BPR No.";
        break;
      case "BATCH MANUFACTURING RECORD":
        return "BMR No.";
        break;
      case "Validation Protocol":
        return "STP No.";
        break;
      default:
        return "STP No.";
        break;
    }
  }
  //trackByFn(index: number, item: any): number {
  //  return item.id; // or item.RevisionNumber if id is not available
  //}

}
