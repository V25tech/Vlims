import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../shared/common.service';
import { DocumentRevisionService } from '../../modules/services/document-revision.service';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-search-view',
  templateUrl: './searchview.component.html',
  styleUrls: ['./searchview.component.scss']
})

export class SearchViewComponent implements OnInit {
  data: any;
  constructor(private router: Router, private spinner: NgxSpinnerService, private commonsvc: CommonService, private activate: ActivatedRoute, private trackService: DocumentRevisionService) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit() {
  }


  //getStatusClass(status: string): string {
  //  if (status === 'InProgress' || status === 'In-Progress') {
  //    return 'status-in-progress';
  //  } else if (status === 'Completed') {
  //    return 'status-completed';
  //  } else if (status === 'Under Review') {
  //    return 'status-under-review';
  //  } else {
  //    return '';
  //  }
  //}

  //getStageClass(stage: string): string {
  //  if (stage === 'In Progress') {
  //    return 'stage-in-progress';
  //  } else if (stage === 'Completed') {
  //    return 'stage-completed';
  //  } else if (stage === 'Under Review') {
  //    return 'stage-under-review';
  //  } else {
  //    return '';
  //  }
  //}

}
