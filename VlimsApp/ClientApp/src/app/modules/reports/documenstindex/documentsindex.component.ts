import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestContext1 } from '../../../models/model';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { ExistingDocumentsService } from '../../manager/services/existing-documents.service';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

@Component({
  selector: 'app-doc-index',
  templateUrl: './documentsindex.component.html',
  //  styleUrls: ['./document-manager-home.component.scss']
})
export class DocumentsIndexComponent implements OnInit {
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
  documents: any = [];
  cols: any[] | undefined;
  exportColumns: any[] | undefined;

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private ducomentSrvc: ExistingDocumentsService
    , private sanitizer: DomSanitizer, private modalService: BsModalService) { }

  ngOnInit() {
    this.cols = [
      //{ field: 'id', header: 'S No.'},
      { field: 'documentNo', header: 'Document No.' },
      { field: 'documentName', header: 'Document Name' },
      { field: 'documentType', header: 'Document Type' },
      { field: 'department', header: 'Department' },
      { field: 'effectiveDate', header: 'Effective Date' },
      { field: 'reviewDate', header: 'Review Date' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.getdocuments();
  }

  getdocuments() {
    this.spinner.show();
    let objrequest: RequestContext1 = {
        PageNumber: 1, PageSize: 1000, UserName: localStorage.getItem("username"), Id: 0,
        type: null
    };
    this.ducomentSrvc.getAllDocuments(objrequest).subscribe((data: any) => {
      if (data != null && data.exisitingDocuments.length > 0 && data != undefined) {
        data.exisitingDocuments.forEach((item: any) => {
          delete item.createdBy;
          delete item.createdOn;
          delete item.modifiedOn;
          delete item.modifiedBy;
          delete item.entityName;
          delete item.id;
          delete item.status;
          delete item.template;
          delete item.document;
          delete item.prepId;
          item.effectiveDate = this.commonsvc.setDate(item.effectiveDate);
          item.reviewDate = (item.reviewDate != null || item.reviewDate != 'NA') ? this.commonsvc.setDate(item.reviewDate) : 'NA';
        })
        this.documents = data;
        if (this.documents.length < 10)
          this.currentPage = 10;
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }
  navigateToAddRequest(): void {
    this.router.navigate(['/existingdoc/add']);
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.documents.exisitingDocuments);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "Documents");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
     
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
  }

  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    const columnWidths = [100, 150, 100, 100, 100, 100]; // Adjust the width of each column as needed
  
    const styles: any = {}; // Define an empty object to hold column styles
  
    for (let i = 0; i < columnWidths.length; i++) {
      styles[i.toString()] = { columnWidth: columnWidths[i] }; // Assign column widths to styles object
    }
  
    // Adjust the width of the date columns
    styles['1'] = { columnWidth: 95}; // Effective Date
    styles['2'] = { columnWidth: 95 }; // Effective Date
    styles['3'] = { columnWidth: 95}; // Effective Date
    styles['4'] = { columnWidth: 95 }; // Effective Date
    styles['5'] = { columnWidth: 95 }; // Review Date
  
    autoTable(doc, {
      columns: this.exportColumns,
      body: this.documents.exisitingDocuments,
      didDrawPage: (dataArg) => {
        doc.text('Documents', dataArg.settings.margin.bottom, 1);
      },
      columnStyles: styles // Assign column styles to columnStyles property
    });
    doc.save('documents.pdf');
  }
  

}
