import { Injectable } from '@angular/core';
import { DocumentTypeConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeServiceService {
type:string="master";
  constructor(private http: HttpbaseService) { }

  getdoctypeconfig(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/getalldoctypeconfig",this.type);
}
getdoctypeconfigbyname(objname: string) {
  
  return this.http.getwithheader("api/documenttypeconfiguration/getbyName"+"?name="+objname,this.type);
}
adddoctypeconfig(objrequest: DocumentTypeConfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/savedocumenttypeconfiguration",this.type);
}
updatedoctypeconfig(objrequest: DocumentTypeConfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/updatedocumenttypeconfiguration",this.type);
  }
  getdocrequestbyname(docreq: string) {
    
    return this.http.getwithheader("api/documentpreparation/GetDocumentRequestbyName" + "?name=" + docreq, this.type);
  }
  getworkflowInfo(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/getalldoctypeconfig", this.type);
  }
}
