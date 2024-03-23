import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DocumentTypeConfiguration, PlantConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { PlantmanagementService } from '../../../services/plantmanagement.service';
import { NewPlantRegistrationComponent } from '../New-plant-registration/new-plant-registration.component';

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
  navigateToAddPlant(): void {
    debugger;
    this.router.navigate(['/admin/addplant']);
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
