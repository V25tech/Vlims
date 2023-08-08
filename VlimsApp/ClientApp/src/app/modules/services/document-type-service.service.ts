import { Injectable } from '@angular/core';




import { HttpbaseService } from 'src/app/shared/httpbase.service';

import { DocumentTypeConfiguration, RequestContext } from 'src/app/models/model';


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
getbyId(objname: number) {
  
  return this.http.getwithheader("api/documenttypeconfiguration/getbyId"+"?dTCId="+objname,this.type);
}
adddoctypeconfig(objrequest: DocumentTypeConfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/savedocumenttypeconfiguration",this.type);
}
updatedoctypeconfig(objrequest: DocumentTypeConfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/updatedocumenttypeconfiguration",this.type);
}
}
