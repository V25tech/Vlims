import { Component, OnInit } from '@angular/core';
import { WorkItemsConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { WorkitemsService } from '../Services/workitems.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrls: ['./workitems.component.css']
})
export class WorkitemsComponent implements OnInit {
  name: string = 'Product Type';
  types: Array<WorkItemsConfiguration> = [];
  newtype: WorkItemsConfiguration;
  objProductType: WorkItemsConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;

  constructor(private commonsvc: CommonService, private doctypeservice: WorkitemsService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    //this.tabselect = this.router.url.split('/').pop();
    this.getworkflowitems();
  }

  getworkflowitems() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50 ,Id:0};
    return this.doctypeservice.getworkitems(objrequest).subscribe((data: any) => {
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

