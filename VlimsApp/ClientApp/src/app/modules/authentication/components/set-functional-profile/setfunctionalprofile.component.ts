

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestContext, RoleConfiguration, functionalprofile } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { setfunctionalprofileconfigurationservice } from '../../../services/setfunctionalprofile.service';
import { RolesconfigurationService } from 'src/app/modules/services/rolesconfiguration.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-setfunctionalprofile',
  templateUrl: './setfunctionalprofile.component.html'

})
export class SetfunctionalprofileComponent implements OnInit {
  private storage:any = localStorage;

  isButtonDisabled = false;
  types: functionalprofile[] = [];
  roleTypes: RoleConfiguration[] = [];
  selectedRoles = new RoleConfiguration();
  profile = new functionalprofile()
  editMode: boolean = false;
  viewMode: boolean = false;
  access: boolean = false;
  selectAllDocumentMasterChecked: boolean = false; 
  selectAllDocumentManagerChecked: boolean = false;
  selectAllWorkAssignedChecked: boolean = false; 
  selectAllusermanagementchecked: boolean = false; 
  stateselectAllhierarachychecked: boolean = false; 
  stateselectAllplantarachychecked: boolean = false; 





  constructor(private commonsvc: CommonService, private doctypeservice: RolesconfigurationService,
    private setprofileservice: setfunctionalprofileconfigurationservice,
    private toaster: ToastrService,
    private location: Location,
    private loader: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.access = this.commonsvc.getUsername().toLocaleLowerCase() === 'admin' ? true : false;
    this.getsetfunctionalprofile();
    this.getroles();
  }
  getsetfunctionalprofile() {
    this.loader.show();
    return this.setprofileservice.getsetfunctionalprofileconfiguration(this.commonsvc.req).subscribe((data: any) => {
      this.types = data.Response;
      this.loader.hide();
      console.log(this.types);
    }, er => {

    });
  }
  getroles() {
    this.loader.show();
    return this.doctypeservice.getroles(this.commonsvc.req).subscribe((data: any) => {
      this.roleTypes = data.Response;
      this.loader.hide();
    });
  }
  onSubmit(profileinfo: functionalprofile) {
    debugger
    profileinfo.modifiedby = this.commonsvc.getUsername();

    this.loader.show();
    if (profileinfo.sfpid > 0) {
      // profileinfo.modifiedby=this.commonsvc.getUsername();
      if (profileinfo.createdby == null || undefined) {
        profileinfo.createdby = this.commonsvc.getUsername();
      }
      if (!this.isButtonDisabled) {
        this.isButtonDisabled = true;
        this.setprofileservice.update(profileinfo).subscribe((data: any) => {
          this.toaster.success('role permissions updated');
          if (JSON.parse(this.storage.getItem("roles")).role.toLowerCase() == profileinfo.role.toLowerCase()) {
            this.commonsvc.userEntityPermissions$.next(profileinfo);
          }
          this.commonsvc.userEntityPermissions$.next(profileinfo);
          this.loader.hide();
          this.isButtonDisabled = false;
          this.location.back();
        })
      }
    }
    else {
      profileinfo.createdby = this.commonsvc.getUsername();
      profileinfo.modifiedby = this.commonsvc.getUsername();
      //profileinfo.role=this.selectedRoles.Role;
      if (!this.isButtonDisabled) {
        this.isButtonDisabled = true;
        this.setprofileservice.addsetfunctionalprofileconfiguration(profileinfo).subscribe((res: any) => {
          this.toaster.success('role permissions added');
          this.loader.hide();
          this.isButtonDisabled = false;
          this.location.back();
        });
      }
    }
  }
  async binddata(rolename: string) {
    debugger
    await this.getsetfunctionalprofile();
    let roleinfo: any;
    roleinfo = this.types.find(o => o.role == rolename);
    this.profile = new functionalprofile();
    if (roleinfo) {
      this.profile = roleinfo;
    }
    this.profile.role = rolename;
  }
  onCancel() {
    this.location.back();
  }

  selectAllDocumentMaster(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectAllDocumentMasterChecked = checked;
    
    if (checked) {
     
       this.profile.documentTypeConfig = true;
       this.profile.documentTemplateConfig = true;
       this.profile.workflowConfig = true;
    } else {
      
      this.profile.documentTypeConfig = false;
       this.profile.documentTemplateConfig = false;
       this.profile.workflowConfig = false;
    }
  }



  selectAllDocumentManager(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectAllDocumentMasterChecked = checked;
   
    if (checked) {
      
       this.profile.documentRequest = true;
       this.profile.documentPreperation = true;
       this.profile.documentEffective = true;
       this.profile.additionalTasks = true;
       this.profile.downloadPrint = true;
       this.profile.docrepository = true;

    } else {
     
      this.profile.documentRequest = false;
      this.profile.documentPreperation = false;
      this.profile.documentEffective = false;
      this.profile.additionalTasks = false;
      this.profile.downloadPrint = false;
      this.profile.docrepository = false;

      
    }
  }



  selectAllWorkAssigned(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectAllDocumentMasterChecked = checked;
    
    if (checked) {
       this.profile.documentTypeConfig = true;
       
    } else {
      this.profile.documentTypeConfig = false;
      
    }
  }



  selectAllusermanagement(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectAllusermanagementchecked = checked;
   
    if (checked) {
       this.profile.userMgmt = true;
       this.profile.Activatestatus = true;
       
    } else {
      this.profile.userMgmt = false;
      this.profile.Activatestatus = false;
      
    }
  }



  selectAllhierarachy(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.stateselectAllhierarachychecked = checked;
   
    if (checked) {
       this.profile.roleConfig = true;
       this.profile.deptConfig = true;
       
    } else {
      this.profile.roleConfig = false;
      this.profile.deptConfig = false;
      
    }
  }

  selectAllplantarachy(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.stateselectAllplantarachychecked = checked;
    if (checked) {
       this.profile.plantMgmt = true;
    } else {
      this.profile.plantMgmt = false;
    }
  }



  workassigned(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.stateselectAllplantarachychecked = checked;
   
    if (checked) {
       this.profile.workItemsassigned = true;
    } else {
      this.profile.workItemsassigned = false;
    }
  }



  adminmanagement(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.stateselectAllplantarachychecked = checked;
    if (checked) {
       this.profile.securityMgmt = true;
    } else {
      this.profile.securityMgmt = false;
     
      
    }
  }


  
}
