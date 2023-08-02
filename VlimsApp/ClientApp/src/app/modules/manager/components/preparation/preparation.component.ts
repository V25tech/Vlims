import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DocumentPreperationConfiguration, RequestContext } from 'src/app/models/model';
import { DocumentPreperationService } from 'src/app/modules/services/document-preperation.service';
import { CommonService } from 'src/app/shared/common.service';

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

  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private docPreperationService: DocumentPreperationService) { }

  navigateToAddPreparation(docPreperation: DocumentPreperationConfiguration): void {
    this.commonsvc.preperation = docPreperation;
    this.router.navigate(['/preparation/review']);
  }

  ngOnInit() {
    this.spinner.show();
    let request: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.docPreperationService.getdocumentpreparations(request).subscribe((data: any) => {
      this.preparationsDatasource = data.response;
      if(this.preparationsDatasource.length<10)
      this.currentPage=10;
      this.totalCount = data.rowCount;
      console.log('prep',data);
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
    } else {
      return '';
    }
  }
}
