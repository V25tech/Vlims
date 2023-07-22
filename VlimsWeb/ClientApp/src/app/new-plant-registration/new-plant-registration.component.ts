import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { NewPlantRegistrationConfigurationService } from '../Services/new-plant-registration-configuration.service';
import { PlantConfiguration, RequestContext } from '../model/models';

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

    this.doctypeservice.addNewRegistrationconfiguration(adddoc).subscribe((res: any) => {
    });
  }
}

