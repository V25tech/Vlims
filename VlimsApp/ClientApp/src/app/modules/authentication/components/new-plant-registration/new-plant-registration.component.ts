import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantConfiguration } from '../../../../models/model';
import { NewPlantRegistrationConfigurationService } from '../../../services/new-plant-registration-configuration.service';
import { CommonService } from '../../../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

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

  constructor(private commonsvc: CommonService,
    private loader:NgxSpinnerService,
    private location: Location,
    private toastr: ToastrService,
     private plantservice: NewPlantRegistrationConfigurationService,
      private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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
    
    if(this.editMode)
    {
      debugger
      this.updateplant(newplant);
    }
    else{
      
      this.addplant(newplant);
    }
    
    //this.location.back();
  }
  updateplant(newplant: PlantConfiguration) {
    
    this.loader.show();
    newplant.ModifiedBy=this.commonsvc.getUsername();
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
    this.newplant = new PlantConfiguration(); // Resetting adddoc to an empty object
    //this.router.navigate(['/admin/plant']);
  }
  getbyId() {
    debugger
    this.plantservice.getbyId(this.plantid).subscribe((data: any) => {
      this.newplant = data;
    }, ((error: any) => {

    }));
  }
}

