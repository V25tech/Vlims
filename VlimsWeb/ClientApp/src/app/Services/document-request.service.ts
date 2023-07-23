import { Injectable } from '@angular/core';
import { DocumentRequestConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentRequestService {
  type:string="manager";
  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/GetAllDocreq",this.type);
  }
  adddocreqconfig(objrequest: DocumentRequestConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/SaveDocumentrequest",this.type);
  }
  getdocrequestbyname(docreq: string) {
    debugger
    return this.http.postJsonLogin(docreq, "api/documentrequest/GetDocumentRequestbyName", this.type);
  }
}
