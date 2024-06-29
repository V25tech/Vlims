import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantConfiguration, RequestContext } from '../../../../models/model';
import { NewPlantRegistrationConfigurationService } from '../../../services/new-plant-registration-configuration.service';
import { CommonService } from '../../../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { PlantmanagementService } from 'src/app/modules/services/plantmanagement.service';

@Component({
  selector: 'app-new-plant-registration',
  templateUrl: './new-plant-registration.component.html'
})
export class NewPlantRegistrationComponent implements OnInit {


  isButtonDisabled = false;
  griddata:PlantConfiguration[]=[];
  viewMode: boolean = false;
  editMode: boolean = false;
  newplant = new PlantConfiguration();
  plantid: number = 0;
  title: string = 'New Plant Registration';
  types: PlantConfiguration[] = [];

  constructor(private commonsvc: CommonService,
    private loader:NgxSpinnerService,
    private location: Location,
    private toastr: ToastrService,
     private plantservice: NewPlantRegistrationConfigurationService,private doctypeservice: PlantmanagementService,
      private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getplantconfiguration();
    const urlPath = this.router.url;
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 2];
    if (lastSegment == "edit") {
      let id = parseInt(segments[segments.length - 1], 10);
      this.plantid = id;
      this.editMode = true; this.viewMode = false;
      this.getbyId();
      this.title = "Modify Plant Configuration";
      //this.documentType=this.commonsvc.documentType;
    }
    else if (lastSegment == "view") {
      this.viewMode = true; this.editMode = false;
      this.newplant = this.commonsvc.plantConfig;
      this.title = "View Plan Configuration";
    }
    //this.get();
    this.cdr.detectChanges();
  }








  submit(newplant: PlantConfiguration) {
    debugger
    
    if(this.editMode)
    {
      debugger
      this.updateplant(newplant);
    }
    else{
      if (!this.isduplicate(newplant.PlantCode)) {
        this.addplant(newplant);
      } else {
        this.toastr.error('Plant Code already exists. Please use a different code.');
      }  
      
    }
    
    //this.location.back();
  }




  
  updateplant(newplant: PlantConfiguration) {
    
    this.loader.show();
    newplant.ModifiedBy=this.commonsvc.getUsername();
    this.newplant.RevisionNumber++;
    if (!this.isButtonDisabled) {
      this.isButtonDisabled = true;
    return this.plantservice.updateNewRegistrationconfiguration(newplant).subscribe((response)=>{
      this.toastr.success('Plant Updated Successfully','Saved!');
      this.loader.hide();
      this.location.back();
      this.isButtonDisabled=false;
    })
  }else{
    return false;
  }
  }

  addplant(newplant: PlantConfiguration) {
    
    this.loader.show();
    newplant.CreatedBy = this.commonsvc.getUsername();
    newplant.ModifiedBy = this.commonsvc.getUsername();
    newplant.CreatedDate = new Date();
    newplant.ModifiedDate = new Date();
    newplant.RevisionNumber = 0;
    
    if (!this.isButtonDisabled) {
        this.isButtonDisabled = true;
        this.plantservice.addNewRegistrationconfiguration(newplant).subscribe((res: any) => {
            this.toastr.success('Plant Registered Successfully!', 'Saved!');
            this.loader.hide();
            this.location.back();
            this.isButtonDisabled = false;
        });
    }
}







  
  closepopup() {
    this.router.navigate(['/admin/plant']);
  }
  onCancel() {
   this.location.back();
  }
  getbyId() {
    debugger
    this.plantservice.getbyId(this.plantid).subscribe((data: any) => {
      this.newplant = data;
    }, ((error: any) => {

    }));
  }


  getplantconfiguration() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      if (data != null && data.Response != null && data.Response.length > 0) {
        data.Response.forEach((item: any) => {
          item.ModifiedDate = this.commonsvc.setDate(item.ModifiedDate)
        })
      }
      this.types = data.Response;
      console.log(this.types);
    }, er => {
 
    });
  }
  isduplicate(plantCode:string) {
    if (this.types != null && this.types.length > 0) {
      return this.types.some(p => p.PlantCode.toLocaleLowerCase() == plantCode.toLocaleLowerCase());
    } else {
      return false;
    }
  }
  
}

