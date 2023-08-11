import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalManagament, RequestContext } from '../../../../models/model';
import { ApprovalConfigurationService } from '../../../services/approval-configuration.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-approval-configurations',
  templateUrl: './approval-configurations.component.html'
  
})
export class ApprovalConfigurationsComponent implements OnInit {
  tabselect: string = 'type';
  editMode:boolean=false;
  viewMode:boolean=false;
  approvalconfig=new ApprovalManagament();
  Approvaltypeservice: any;
  types: ApprovalManagament[] = [];
  access:boolean=false;
  constructor(private router: Router,private toastr: ToastrService, 
    private commonsvc:CommonService,
    private appconfigserv: ApprovalConfigurationService) { }

  ngOnInit() {
    debugger
    this.access = this.commonsvc.getUserRoles()?.approvalConfigs ?? false;
    this.getApproval();
   // this.tabselect = this.router.url.split('/').pop(); 
  }
  addApproval(newApproval: ApprovalManagament) {
    debugger
    //newdept.CreatedBy = "admin";
    //newdept.ModifiedBy = "admin";
    //this.router.navigate(['/products']);   
    this.appconfigserv.addapprovalconfiguration(newApproval).subscribe((res: any) => {
      this.router.navigate(['/mainpage/hierarchy']);
    });


  }

  getApproval() {
    //this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.appconfigserv.getapprovalconfiguration(objrequest).subscribe((data: any) => {
        debugger
        this.types = data;
        this.approvalconfig=data;
        //this.loader.hide();
        console.log(this.types);
      }, er => {
        //this.toastr.error('loading failed');
        //this.loader.hide();
      });
}
 
  submit(newApproval: ApprovalManagament) {
    debugger
    this.appconfigserv.addapprovalconfiguration(newApproval);
  }
 
  onCancel() {
    this.router.navigate(['/admin']);
  }
}
