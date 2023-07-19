import { Component, OnInit } from '@angular/core';
import { PlantConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { PlantmanagementService } from '../Services/plantmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantmanagement',
  templateUrl: './plantmanagement.component.html',
  styleUrls: ['./plantmanagement.component.css']
})
export class PlantComponent implements OnInit {
  types: Array<PlantConfiguration> = [];
  constructor(private commonsvc: CommonService, private doctypeservice: PlantmanagementService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    this.getplantconfiguration();
  }
  getplantconfiguration() {
    this.loader.show();
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      this.loader.hide();
      console.log(this.types);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }
}
