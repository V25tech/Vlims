
import { Component, OnInit } from '@angular/core';
import { PrintRequest, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { NewPrintRequestService } from '../Services/new-print-request.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class NewPrintRequestComponent implements OnInit {
  types: Array<PrintRequest>=[];
  constructor(private commonsvc: CommonService, private doctypeservice:  NewPrintRequestService ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.GetNewPrintRequest();
  }
  GetNewPrintRequest() {
    this.loader.show();
   let objrequest: RequestContext={
     PageNumber: 1, PageSize: 1,
     Id: 0
   };
      return this.doctypeservice.GetNewPrintRequest(objrequest).subscribe((data: any) => {
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


