import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DocumentTypeConfiguration, PlantConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { PlantmanagementService } from '../../../services/plantmanagement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plantmanagement',
  templateUrl: './plantmanagement.component.html'  
})
export class PlantComponent implements OnInit {
  types: PlantConfiguration[] = [];
  constructor(private commonsvc: CommonService, private doctypeservice: PlantmanagementService,  private toas: ToastrService,private router: Router) { }
  @ViewChild('dt') dataTable!: Table; // ViewChild to get reference to the p-table component
  @ViewChild('paginator') dataPaginator!: Paginator; // ViewChild to get reference to the p-paginator component
  // Pagination properties
  currentPage = 0;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  access:boolean=false;
  ngOnInit() {
    this.access = this.commonsvc.getUserRoles()?.plantMgmt ?? false;
    this.getplantconfiguration();
  }
  getplantconfiguration() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      if(data!=null&&data.Response!=null&&data.Response.length>0){
        data.Response.forEach((item:any)=>{
          item.ModifiedDate=this.commonsvc.setDate(item.ModifiedDate)
        })
       } 
      debugger
      this.types = data.Response;
      console.log(this.types);
    }, er => {
     
    });
  }


navigateToAddPlant() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      if(data != null && data.Response != null && data.Response.length > 0){
        // At least one item is present, restrict navigation and show toastr message
        this.toas.error('Only one plant can be added. You cannot add more than one plant.');

      } else {
        // No items, allow navigation
        this.router.navigate(['/admin/addplant']);
      }
    }, er => {
      console.error('Error fetching data:', er);
      // Optionally, show an error toastr message
      this.toas.error('Error fetching data. Please try again later.');
    });
}

  editdoc(editband: PlantConfiguration) {
    debugger
    this.commonsvc.plantConfig = editband;
    this.router.navigate(['/admin/plant/edit', editband.PMId]);
  }
  getStatusClass(status: string): string {
    
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
