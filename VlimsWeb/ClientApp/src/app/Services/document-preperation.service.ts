import { Injectable } from '@angular/core';
import { DocumentPreperationConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentPreperationService {

  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/GetAllDocPrep");
  }
  ManageDocument(objrequest: DocumentPreperationConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/SaveDocumentPreparation");
  }
}
