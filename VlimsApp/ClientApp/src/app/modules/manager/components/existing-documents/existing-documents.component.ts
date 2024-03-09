import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../../shared/common.service';
import { ExistingDocumentsService } from '../../services/existing-documents.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { RequestContext, RequestContext1 } from '../../../../models/model';

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

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private existdocService: ExistingDocumentsService,) {

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
  editdoc(doc:any) {

  }
}
