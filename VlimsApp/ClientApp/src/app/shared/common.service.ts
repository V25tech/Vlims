import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentTypeConfiguration } from '../modules/documents/models/DocumentTypeConfiguration';
import { DocumentTemplateConfiguration } from '../modules/documents/models/DocumentTemplateConfiguration';
import { DepartmentConfiguration, UserConfiguration, Usergroupconfiguration } from '../models/model';
import { DepartmentComponent } from '../modules/authentication/components/Department/department.component';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  documentType=new DocumentTypeConfiguration();
  template=new DocumentTemplateConfiguration();
  templateCount: number = 0;
  userGroupConfig = new Usergroupconfiguration();
  userConfig = new UserConfiguration();
  departConfig = new DepartmentConfiguration();
  //private retailer = new BehaviorSubject<Retailer>(null);
  //retaileR = this.retailer.asObservable();
  createdBy = 'admin';
  
  retailerId: number = 0;
  userId: number = 0;
  baseurl: string='';
  documenttypeId:string='';
  objname:string='';
  //pdfBytes: Uint8Array;
  private _searchBS = new BehaviorSubject<string>('');

  private _sliderToggleBS = new BehaviorSubject<boolean>(false);
  public _token=new BehaviorSubject<string>('');
  token=this._token.asObservable();

  private _cartsCountBS = new BehaviorSubject<number>(0);
  public _cartsCount: number = 0;
  public cartsCount = this._cartsCountBS.asObservable();

  

  //gloabl file upload config
  fileuploadConfig: any = {
    import: {
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      btnName: 'Import'
    }
  };

  constructor() {

    //this.retaileR = new Retailer();
    //this.retaileR.RetailId = 1;

  }

  
  

  
}
