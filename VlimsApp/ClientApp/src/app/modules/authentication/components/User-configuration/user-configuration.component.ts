import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { RequestContext, RoleConfiguration, UserConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html'
  
})
export class UserConfigurationComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 0;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  types: UserConfiguration[] = [];
  name: string = 'Product Type';
  newtype: UserConfiguration | undefined;
  objProductType: UserConfiguration | undefined;
  retailId: number=0;
  header: string='';
  actiontype: number=0;
  pageConfig: any;
  searchstr: string='';
  access:boolean=false;
  constructor(private commonsvc: CommonService, private doctypeservice: UsersconfigurationService,
    private loader:NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.userMgmt ?? false;
    this.getusers();
  }
  getusers() {
    this.loader.show();
      return this.doctypeservice.getusers(this.commonsvc.req).subscribe((data: any) => {
        this.types = data.Response;
        
        console.log('users',this.types);
        this.loader.hide();
      }, er => {
       
      });
  }
  editdoc(doc: UserConfiguration) {
    
    this.commonsvc.userConfig = doc;
    this.router.navigate(['/admin/usermanagement/users/edit', doc.UCFId]);
  }

  navigateToAddUser(): void {
    this.router.navigate(['/admin/usermanagement/users/add']);
  }
  
  getStatusClass(status: string): string {
    
    if (status === 'In Progress') {
      return 'status-in-progress';
    } else if (status === 'Completed') {
      return 'status-completed';
    }else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Active') {
      return 'status-completed';
    } else if (status === 'Under Review') {
      return 'status-under-review';
    } else if (status === 'Pending') {
      return 'status-in-progress';
    } else {
      return '';
    }
  }
  addusergroup()
  {
    
  }

}
