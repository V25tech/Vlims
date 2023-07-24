import { Injectable } from '@angular/core';
import { HttpbaseService } from 'src/app/shared/httpbase.service';

import { DocumentTemplateConfiguration } from '../models/DocumentTemplateConfiguration';
import { RequestContext } from 'src/app/models/model';


@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateServiceService {
  type:string="master";
  constructor(private http: HttpbaseService) { }

  getdocttemplate(objrequest: RequestContext) {
   
    return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/getalldoctemplate",this.type);
}
getdoctemplatebyname(objname: string) {
  debugger
  return this.http.getwithheader("api/documenttemplateconfiguration/getbyName"+"?name="+objname,this.type);
}
adddoctemplate(objrequest: DocumentTemplateConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/savedocumenttemplateconfiguration",this.type);
}
}
