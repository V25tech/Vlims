import { Injectable } from '@angular/core';
import { DocumentPreperationConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentPreperationService {
  type: string = "manager";

  constructor(private http: HttpbaseService) {
  }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/GetAllDocPrep");
  }
  getdocumentrequestbyId(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/getdocId");
  }
  ManageDocument(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/savedocumentpreparation",this.type);
  }
  preview(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/preview",this.type);
  }
  upload(objrequest: FormData){
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/upload",this.type);
  }
 

}
