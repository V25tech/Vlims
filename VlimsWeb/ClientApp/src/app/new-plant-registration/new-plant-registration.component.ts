import { Component, OnInit } from '@angular/core';
import { NewPlantRegistration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { NewPlantRegistrationConfigurationService } from '../Services/new-plant-registration-configuration.service';

@Component({
  selector: 'app-new-plant-registration',
  templateUrl: './new-plant-registration.component.html',
  styleUrls: ['./new-plant-registration.component.css']
})
export class NewPlantRegistrationComponent implements OnInit {
  types: Array<NewPlantRegistration>=[];
  constructor(private commonsvc: CommonService, private doctypeservice:  NewPlantRegistrationConfigurationService ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getNewRegistrationconfiguration();
  }
  getNewRegistrationconfiguration() {
    this.loader.show();
   let objrequest: RequestContext={
       PageNumber: 1, PageSize: 1,
       Id: 0
    };
    debugger
      return this.doctypeservice.getNewRegistrationconfiguration(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        this.loader.hide();
        console.log(this.types);
      }, er => {
        this.toastr.error('loading failed');
        this.loader.hide();
      });
  }
  submit_new_plant() {
    debugger;
  }
}

