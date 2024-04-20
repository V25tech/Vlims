import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../shared/common.service';
import { DocumentRevisionService } from '../../modules/services/document-revision.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-track-search',
  templateUrl: './tracksearch.component.html',
  styleUrls: ['./tracksearch.component.scss']
})

export class TrackSearchComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  searchResults: any = [];
  searchTerm:any;
  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private activate: ActivatedRoute, private trackService: DocumentRevisionService) {
    this.searchTerm = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit() {
    this.getTrackSearchDocuments();
  }

  getTrackSearchDocuments() {
    try {
      this.spinner.show();
      this.trackService.getTrackSearchInfo(this.searchTerm,'admin').subscribe((data: any) => {
        if (data != null && data.length > 0) {
          this.searchResults = data;
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      })
      this.spinner.hide();
    } catch (e) {
      this.spinner.hide();
    }
  }
  getStatusClass(status: string): string {
    if (status.toLowerCase() === 'inprogress' || status.toLowerCase() === 'in-progress') {
      return 'status-in-progress';
    } else if (status.toLowerCase() === 'approved') {
      return 'status-completed';
    } else if (status.toLowerCase() === 'rejected') {
      return 'status-under-review';
    } else {
      return '';
    }
  }

  getStageClass(stage: string): string {
    if (stage === 'In Progress') {
      return 'stage-in-progress';
    } else if (stage === 'Completed') {
      return 'stage-completed';
    } else if (stage === 'Under Review') {
      return 'stage-under-review';
    } else {
      return '';
    }
  }
  viewDetails(data:any) {
    this.router.navigate(['/search-view'], { state: data });

  }

}
