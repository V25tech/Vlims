import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { DocumentTemplateConfiguration, RequestContext } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateServiceService {

  constructor(private http: HttpbaseService) { }

  getdocttemplate(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documenttemplateconfiguration/getalldoctemplate");
}
adddoctemplate(objrequest: DocumentTemplateConfiguration) {
  debugger
  return this.http.postJson(objrequest, "api/documenttemplateconfiguration/savedocumenttemplateconfiguration");
}
}
