import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Router } from '@angular/router';
import { PlantConfiguration, RequestContext } from '../../../../models/model';
import { PlantmanagementService } from '../../../services/plantmanagement.service';
import { CommonService } from '../../../../shared/common.service';

@Component({
  selector: 'app-plantmanagement',
  templateUrl: './plantmanagement.component.html',
  styleUrls: ['./plantmanagement.component.css']
})
export class PlantComponent implements OnInit {
  types: Array<PlantConfiguration> = [];
  constructor(private commonsvc: CommonService, private doctypeservice: PlantmanagementService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.getplantconfiguration();
  }
  getplantconfiguration() {
    let objrequest: RequestContext = {
      PageNumber: 1, PageSize: 50,
      Id: 0
    };
    return this.doctypeservice.getplantconfiguration(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;     
    });
  }
}
