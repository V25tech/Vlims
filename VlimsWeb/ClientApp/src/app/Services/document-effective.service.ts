import { Injectable } from '@angular/core';
import { DocumentEffectiveConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentEffectiveService {
  type: string = "manager";

  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/documenteffective/GetAllDocEff");
  }
  getdocumentrequestbyId(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/getdocId");
  }
  ManageDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {
    
    return this.http.postJsonLogin(adddocreq, "api/documenteffective/savedocumenteffective", this.type);
  }
  UpdateDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {
    
    return this.http.postJsonLogin(adddocreq, "api/documenteffective/updatedocumenteffective", this.type);
  }
  UpdateDocumentEffectiveApprove(adddocreq: DocumentEffectiveConfiguration) {
    
    return this.http.postJsonLogin(adddocreq, "api/documenteffective/UpdateDocumentEffectiveApprove", this.type);
  }
  getdocrequestbyname(docreq: string) {
    
    return this.http.getwithheader("api/documenteffective/GetDocumentRequestbyName" + "?name=" + docreq, this.type);
  }
}
