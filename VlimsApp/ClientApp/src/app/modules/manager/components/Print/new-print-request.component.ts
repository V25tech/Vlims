
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DocumentPrintConfiguration, RequestContext } from '../../../../models/model';
import { CommonService } from '../../../../shared/common.service';
import { NewPrintRequestService } from '../../../services/new-print-request.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class NewPrintRequestComponent implements OnInit {
  types: DocumentPrintConfiguration[]=[];
  constructor(private commonsvc: CommonService, private doctypeservice:  NewPrintRequestService ,private router: Router) { }

  ngOnInit() {
    this.GetNewPrintRequest();
  }
  GetNewPrintRequest() {
   let objrequest: RequestContext={
     PageNumber: 1, PageSize: 1,
     Id: 0
   };
      return this.doctypeservice.GetNewPrintRequest(objrequest).subscribe((data: any) => {
        debugger
        this.types = data.Response;
        console.log(this.types);
     
      });
  }
}


