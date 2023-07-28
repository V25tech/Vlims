import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { PlantConfiguration } from '../../../../models/model';
import { NewPlantRegistrationConfigurationService } from '../../../services/new-plant-registration-configuration.service';
import { CommonService } from '../../../../shared/common.service';

@Component({
  selector: 'app-new-plant-registration',
  templateUrl: './new-plant-registration.component.html',
  styleUrls: ['./new-plant-registration.component.css']
})
export class NewPlantRegistrationComponent implements OnInit {
  types: Array<PlantConfiguration> = [];
  adddoc = new PlantConfiguration();

  constructor(private commonsvc: CommonService, private doctypeservice: NewPlantRegistrationConfigurationService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    //this.getNewRegistrationconfiguration();
  }

  submit(adddoc: PlantConfiguration) {
    adddoc.Status = 'In Progress';
    this.doctypeservice.addNewRegistrationconfiguration(adddoc).subscribe((res: any) => {
      this.toastr.success('Added');
      this.router.navigate(['/mainpage/plant']);
    });
  }
  closepopup() {
    this.router.navigate(['/mainpage/plant']);
  }
}

