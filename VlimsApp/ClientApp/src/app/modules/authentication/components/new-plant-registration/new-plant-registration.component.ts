import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantConfiguration } from '../../../../models/model';
import { NewPlantRegistrationConfigurationService } from '../../../services/new-plant-registration-configuration.service';
import { CommonService } from '../../../../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-plant-registration',
  templateUrl: './new-plant-registration.component.html'
})
export class NewPlantRegistrationComponent implements OnInit {
  types: Array<PlantConfiguration> = [];
  adddoc = new PlantConfiguration();
  editMode:boolean=false;
  viewMode: boolean = false;
  plantid: number = 0;
  title: string = 'New Plant Registration';

  constructor(private commonsvc: CommonService,private toastr: ToastrService, private doctypeservice: NewPlantRegistrationConfigurationService, private router: Router, private cdr: ChangeDetectorRef) { }

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
      this.adddoc = this.commonsvc.plantConfig;
      this.title = "View Plan Configuration";
    }
    //this.get();
    this.cdr.detectChanges();
  }

  submit(adddoc: PlantConfiguration) {
    debugger;
    adddoc.Status = 'In Progress';
    adddoc.CreatedDate = new Date();
    adddoc.ModifiedDate = new Date();
    this.doctypeservice.addNewRegistrationconfiguration(adddoc).subscribe((res: any) => {
      //this.toastr.success('Added');
      this.toastr.success('New Plant Registered Succesfull!', 'Saved.!');
      this.router.navigate(['/admin/plant']);
    });
  }
  closepopup() {
    this.router.navigate(['/admin/plant']);
  }
  onCancel() {
    this.router.navigate(['/admin/plant']);
  }
  getbyId() {
    debugger
    this.doctypeservice.getbyId(this.plantid).subscribe((data: any) => {
      this.adddoc = data;
    }, ((error: any) => {

    }));
  }
}

