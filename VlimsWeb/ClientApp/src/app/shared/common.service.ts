import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Retailer } from '../model/Retailer'
import { PageConfig } from '../model/pageConfig';
import { SpinnerService } from '../spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { DocumentEffectiveConfiguration, DocumentPreperationConfiguration, DocumentRequestConfiguration, DocumentTypeConfiguration } from '../model/models';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //private retailer = new BehaviorSubject<Retailer>(null);
  //retaileR = this.retailer.asObservable();
  createdBy = 'admin';
  retaileR: Retailer;
  billId: number;
  retailerId: number = 0;
  userId: number = 0;
  baseurl: string;
  documenttypeId:string;
  docobject: DocumentTypeConfiguration;
  docPreperation: DocumentPreperationConfiguration;
  docEffecConfig: DocumentEffectiveConfiguration;
  docrequest: DocumentRequestConfiguration;
  private _searchBS = new BehaviorSubject<string>('');

  private _sliderToggleBS = new BehaviorSubject<boolean>(false);
  public _token=new BehaviorSubject<string>(null);
  private sliderStatus: boolean;
  slider = this._sliderToggleBS.asObservable();
  token=this._token.asObservable();

  private _cartsCountBS = new BehaviorSubject<number>(0);
  public _cartsCount: number = 0;
  public cartsCount = this._cartsCountBS.asObservable();

  pageConfig: PageConfig = { itemsPerPage: 5, currentPage: 1, maxSize: 7, autoHide: true };

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

  pushSearchStr(val: string) {
    this._searchBS.next(val);
  }

  pullSearchStr() {
    return this._searchBS.asObservable();
  }

  setRetailer(objretailer: Retailer) {
    this.retaileR = objretailer;
  }

  sliderToggle() {
    if (this.sliderStatus)
      this.sliderClose();
    else
      this.sliderOpen();
  }

  sliderOpen() {
    this.sliderStatus = true;
    this._sliderToggleBS.next(true);
  }
  sliderClose() {
    this.sliderStatus = false;
    this._sliderToggleBS.next(false);
  }

  modifyCartsCount(cnt: number) {
    this._cartsCount += cnt;
    this._cartsCountBS.next(this._cartsCount);
  }

  getretailId() {
    if (this.retailerId == 0 || undefined || null) {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user != null) {
        this.retailerId = user.RetailId;
        this.userId = user.UserId;
      }
    }

    if (this.retaileR == null || undefined) {
      var retailer = JSON.parse(localStorage.getItem('retail'));
      this.retaileR = new Retailer();
      this.retaileR = retailer;
    }

    return this.retailerId;
  }

  clearlocalStorage() {
    localStorage.clear();
  }

  setCurrentPage(cpageConfig: PageConfig, deletedItemIndex: number, totalItems: number) {
    debugger
    deletedItemIndex += 1;
    let reminder = deletedItemIndex % cpageConfig.itemsPerPage;
    if (cpageConfig.currentPage > 1 &&
      totalItems == deletedItemIndex && reminder == 1) {
      return cpageConfig.currentPage - 1;
    }
    return cpageConfig.currentPage;
  }


  downloadAsExcel(data: any, fileName: string, loader: SpinnerService, toaster: ToastrService) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
    let downloadUrl = URL.createObjectURL(blob);
    if (navigator.appVersion.toString().indexOf('.net') > 0) { // for ie browser
      //window.navigator.msSaveBlob(data.body, fileName);
      loader.hide();
      toaster.success('Filed Downloaded');
    } else {
      var downloadlink = document.createElement("a");
      downloadlink.setAttribute("download", fileName);
      downloadlink.setAttribute("href", downloadUrl);
      document.body.appendChild(downloadlink);
      downloadlink.click();
      document.body.removeChild(downloadlink);
      loader.hide();
      toaster.success('Filed Downloaded');
    }
  }

  fileUpload(files: any, successCB: Function) {
    try {
      let file = files[0];
      let fileTypestr = this.fileuploadConfig.import.accept;
      let fileTypes = (fileTypestr == null || fileTypestr == undefined) ? null : fileTypestr.split(',').map(item => item.trim());
      if (fileTypes == null || fileTypes.indexOf(file.type.toString()) > -1) {
        let formData = new FormData();
        formData.append(file.name, file);
        //here calling success call back funtion
        successCB(formData);
      }
      else {
        //file type error
        alert('unsupported file format');
      }
    }
    catch{ /* throw error here */ }
  }


  confirmDelete() {
    var result = confirm("Confirm to delete?");
    if (result) {
      return true;
    }
    return false;
  }

}
