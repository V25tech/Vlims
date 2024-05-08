import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentEffectiveService } from 'src/app/modules/services/document-effective.service';
import { DocumentEffectiveConfiguration, RequestContext } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-effectives',
  templateUrl: './effectives.component.html',
  styleUrls: ['./effectives.component.scss'],
})
export class EffectivesComponent {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  effectivesDatasource: DocumentEffectiveConfiguration[]  = [];
  access:boolean=false;
  constructor(private router: Router, private documentEffectiveService: DocumentEffectiveService,private spinner: NgxSpinnerService, private commonsvc: CommonService) {}

  
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.documentEffective ?? false;
    this.spinner.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50, Id: 0 };
    this.documentEffectiveService.getdocumenteffective(objrequest).subscribe((data: any) => {
      this.effectivesDatasource = data.response;
      let ids: number[] = [];
      this.effectivesDatasource.forEach(p=>{
        if(ids.includes(p.referenceId)){
          p.isrevision=true;
        }
        else{
          ids.push(p.referenceId);
        }
      })
      console.log('effectives',this.effectivesDatasource);
      if(this.effectivesDatasource.length<10)
      {
      this.currentPage=10;
      }
      this.spinner.hide();
    }, er =>{
      console.log(er);
      this.spinner.hide();
    });
  }

  navigateToReviewEffective(effective: DocumentEffectiveConfiguration): void {
    this.commonsvc.efffective = effective;
    this.router.navigate(['/effectives/review']);
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
  islocked(status:string): boolean{
    switch (status) {
      case 'Reviewed':
        return true;
        case 'Approved':
        return true;
        case 'REVIEWED':
        return true;
        case 'APPROVED':
        return true;
        case 'Returned':
        return false;
        case 'RETURNED':
        return false;
        case 'Rejected':
        return true;
        case 'REJECTED':
        return true;
      default:
        return false;
    }
  }
}
