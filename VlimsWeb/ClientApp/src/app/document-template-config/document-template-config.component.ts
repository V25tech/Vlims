import { Component, OnInit } from '@angular/core';
import { DocumentTemplateConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { DocumentTemplateServiceService } from '../Services/document-template-service.service';

type NewType = ToastrService;

@Component({
  selector: 'app-document-template-config',
  templateUrl: './document-template-config.component.html',
  styleUrls: ['./document-template-config.component.css']
})
export class DocumentTemplateConfigComponent implements OnInit {
  name: string = 'Product Type';
  types: Array<DocumentTemplateConfiguration>=[];
  newtype: DocumentTemplateConfiguration;
  objProductType: DocumentTemplateConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTemplateServiceService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    this.getdocumenttypeconfig();
  }
  getdocumenttypeconfig() {
    this.loader.show();
   let objrequest: RequestContext={PageNumber:1,PageSize:1,Id:0};
      return this.doctypeservice.getdocttemplate(objrequest).subscribe((data: any) => {
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
