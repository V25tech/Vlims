import { Component, OnInit, ViewChild } from '@angular/core';


import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DocumentTypeConfiguration, PlantConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { PlantmanagementService } from '../../../services/plantmanagement.service';

@Component({
  selector: 'app-plantmanagement',
  templateUrl: './plantmanagement.component.html'  
})
export class PlantComponent implements OnInit {
  types: PlantConfiguration[] = [];
  constructor(private commonsvc: CommonService, private doctypeservice: PlantmanagementService,  private router: Router) { }
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  ngOnInit() {
    this.getplantconfiguration();
  }
  getplantconfiguration() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {
     
    });
  }
  navigateToAddPlant(): void {
    debugger;
    this.router.navigate(['/admin/addplant']);
  }
  editdoc(editband: DocumentTypeConfiguration) {
    debugger
    this.commonsvc.documentType = editband;
    this.router.navigate(['/document-type/edit', editband.DTCId]);
  }
  getStatusClass(status: string): string {
    debugger
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return '';
    }
  }
}
