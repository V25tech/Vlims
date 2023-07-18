import { Component, OnInit } from '@angular/core';
import { DocumentAdditionalTasks, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentAdditionalTasksService } from '../Services/document-additional-tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-additionaltasks',
  templateUrl: './document-additionaltasks.component.html',
  styleUrls: ['./document-additionaltasks.component.css']
})
export class DocumentAdditionaltasksComponent implements OnInit {

  name: string = 'Product Type';
  requests: Array<DocumentAdditionalTasks> = [];
  newtype: DocumentAdditionalTasks;
  objProductType: DocumentAdditionalTasks;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentAdditionalTasksService, private toastr: ToastrService, private loader: SpinnerService, private router: Router) { }

  ngOnInit() {
    debugger;
    //this.tabselect = this.router.url.split('/').pop();
    this.getdocumentrequest();
  }


  getdocumentrequest() {
    this.loader.show();
    let objrequest: RequestContext = { PageNumber: 1, PageSize: 50,Id:0 };
    return this.doctypeservice.getdocumentrequest(objrequest).subscribe((data: any) => {
      debugger
      this.requests = data.response;
      this.loader.hide();
      console.log(this.requests);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
  }

}
