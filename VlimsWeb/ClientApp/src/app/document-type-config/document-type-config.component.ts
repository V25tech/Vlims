import { Component, OnInit } from '@angular/core';
import { DocumentTypeConfiguration, RequestContext } from '../model/models';
import { CommonService } from '../shared/common.service';
import { DefaultGlobalConfig, ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spinner/spinner.service';
import { DocumentTypeServiceService } from '../Services/document-type-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-type-config',
  templateUrl: './document-type-config.component.html',
  styleUrls: ['./document-type-config.component.css']
})
export class DocumentTypeConfigComponent implements OnInit {
  name: string = 'Product Type';
  types: Array<DocumentTypeConfiguration>=[];
  newtype: DocumentTypeConfiguration;
  objProductType: DocumentTypeConfiguration;
  retailId: number;
  header: string;
  actiontype: number;
  pageConfig: any;
  searchstr: string;
  constructor(private commonsvc: CommonService, private doctypeservice: DocumentTypeServiceService  ,private toastr: ToastrService, private loader: SpinnerService,private router: Router) { }

  ngOnInit() {
    //this.tabselect = this.router.url.split('/').pop();
    this.getdocumenttypeconfig();
  }


getdocumenttypeconfig() {
  this.loader.show();
 let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
    return this.doctypeservice.getdoctypeconfig(objrequest).subscribe((data: any) => {
      debugger
      this.types = data.Response;
      this.loader.hide();
      console.log(this.types);
    }, er => {
      this.toastr.error('loading failed');
      this.loader.hide();
    });
}
editdoc(editband: DocumentTypeConfiguration) {
  debugger
  this.commonsvc.docobject=editband;
  this.router.navigate(['/mainpage/documentmaster/editdoctype']);
}
}

