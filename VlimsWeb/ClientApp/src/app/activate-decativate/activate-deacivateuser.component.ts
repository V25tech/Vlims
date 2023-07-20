import { Component, OnInit } from '@angular/core';
import { acticateDeactivateuser, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { ActivateDeactivateService } from '../Services/activate-deactivate.service';

@Component({
  selector: 'app-activate-deacivateuser',
  templateUrl: './activate-deacivateuser.component.html',
  styleUrls: ['./activate-deacivateuser.component.css']
})
export class ActivateDeacivateuserComponent implements OnInit {
  types: Array<acticateDeactivateuser>=[];
  constructor(private commonsvc: CommonService, private doctypeservice: ActivateDeactivateService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.get_activate_deactivateuser();
  }
  get_activate_deactivateuser() {
    this.loader.show();
   let objrequest: RequestContext={
       PageNumber: 1, PageSize: 1,
       Id: 0
   };
      return this.doctypeservice.get_activate_deactivateuser(objrequest).subscribe((data: any) => {
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

