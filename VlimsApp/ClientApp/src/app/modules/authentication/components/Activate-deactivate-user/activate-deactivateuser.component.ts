import { Component, OnInit } from '@angular/core'; import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { activateDeactivateuser, RequestContext, RoleConfiguration, UserConfiguration } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { ActivateDeactivateService } from '../../../services/activate-deactivate.service';
import { UsersconfigurationService } from '../../../services/usersconfiguration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate-deactivateuser',
  templateUrl: './activate-deactivateuser.component.html'

})
export class ActivateDeactivateuserComponent implements OnInit {
  types: activateDeactivateuser[] = [];
  adduser = new UserConfiguration();
  access:boolean=false;username:string='';
  currentPage = 0;
  itemsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];



   constructor(private commonsvc: CommonService, private doctypeservice: ActivateDeactivateService, 
    private toastr: ToastrService, private userservice: UsersconfigurationService, 
    private loader:NgxSpinnerService,
    private router: Router) { }


  ngOnInit() {
    this.username=this.commonsvc.getUsername();
    this.access = this.commonsvc.getUserRoles()?.Activatestatus ?? false;
    this.get_activate_deactivateuser();
    
  }

  
  // get_activate_deactivateuser() {
  //   this.loader.show();
  //   return this.userservice.getusers(this.commonsvc.req).subscribe((data: any) => {
  //     debugger
  //     this.types = data.Response;
  //     this.loader.hide();
  //   }, er => {

  //   });
  // }





  


    get_activate_deactivateuser() {
      this.loader.show();
      return this.userservice.getusers(this.commonsvc.req).subscribe((data: any) => {
        if(data!=null&&data.Response!=null&&data.Response.length>0){
          data.Response.forEach((item:any)=>{
            item.Doj=this.commonsvc.setDate(item.Doj)
          })
         } 
        this.types = data.Response;
        // Sort the users based on status (Active users first)
        this.types.sort((a, b) => {
          if (a.Status === 'Active' && b.Status === 'IN-ACTIVE') {
            return -1;
          } else if (a.Status === 'IN-ACTIVE' && b.Status === 'Active') {
            return 1;
          } else {
            return 0;
         }
        });
        this.loader.hide();
      }, er => {
  
      });
    }


  /*update(user:UserConfiguration,event: Event){
    debugger
    this.loader.show();
    const checkbox = event.target as HTMLInputElement;
    if(user.UserID!=this.commonsvc.getUsername()){
    user.ModifiedBy=this.commonsvc.getUsername();
    user.Status = checkbox.checked ? 'Active' : 'IN-ACTIVE';
    this.userservice.update(user).subscribe((data:any)=>{
    this.toastr.success('update success');
    this.get_activate_deactivateuser();
    this.loader.hide();
    },((error:any)=>{
      this.toastr.error('update failed');
      this.loader.hide();
    }));
    }
    else{
      this.toastr.error('same user cannot update');
      this.loader.hide();
    }
  }*/


  update(user: UserConfiguration, event: Event) {
    debugger;
    this.loader.show();
    const checkbox = event ? event.target as HTMLInputElement : null;
    
    if (user.UserID !== this.commonsvc.getUsername()) {
      user.ModifiedBy = this.commonsvc.getUsername();
      user.Status = checkbox && checkbox.checked ? 'Active' : 'IN-ACTIVE';
  
      
      const toastMessage = user.Status === 'Active' ? 'User activated' : 'User deactivated';
  
      this.userservice.update(user).subscribe(
        (data: any) => {
          this.toastr.success(toastMessage, 'Update Success');
          this.get_activate_deactivateuser();
          this.loader.hide();
        },
        (error: any) => {
          this.toastr.error('Update failed', 'Error');
          this.loader.hide();
        }
      );
    } else {
      this.toastr.error('Same user cannot be updated', 'Error');
      this.loader.hide();
    }
  }
  



  
  navigateToAddRoles(): void {
    this.router.navigate(['/document-type/add']);
  }
  editdoc(doc: activateDeactivateuser) {
    this.adduser.UCFId = doc.UCFId;
    this.adduser.UserManagementID = "1";
    debugger;
    if (doc.Status == 'Active') {
      this.adduser.Status = 'InActive';     
      this.userservice.update(this.adduser).subscribe((data: any) => {
      });
      this.toastr.success('User  is made InActive!', 'Successfully.!');
    }
    else {
      this.adduser.Status = 'Active';      
      this.userservice.update(this.adduser).subscribe((data: any) => {
      });
      this.toastr.success('User  is made Active!', 'Successfully.!');
    }
    

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
