import { Injectable } from '@angular/core';
import { DocumentRequestConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentRequestService {

  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/GetAllDocreq");
  }
  adddocreqconfig(objrequest: DocumentRequestConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentrequest/SaveDocumentrequest");
  }
}
