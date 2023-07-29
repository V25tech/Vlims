import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalManagament } from '../../../../models/model';
import { ApprovalConfigurationService } from '../../../services/approval-configuration.service';

@Component({
  selector: 'app-approval-configurations',
  templateUrl: './approval-configurations.component.html'
  
})
export class ApprovalConfigurationsComponent implements OnInit {
  tabselect: string = 'type';
  constructor(private router: Router, private appconfigserv: ApprovalConfigurationService) { }

  ngOnInit() {
    debugger
   // this.tabselect = this.router.url.split('/').pop(); 
  }
  addapprovalconfig(newdept: ApprovalManagament) {
    debugger
    //newdept.CreatedBy = "admin";
    //newdept.ModifiedBy = "admin";
    //this.router.navigate(['/products']);
    this.appconfigserv.addapprovalconfiguration(newdept).subscribe((res: any) => {
      this.router.navigate(['/mainpage/hierarchy']);
    });


  }
}
