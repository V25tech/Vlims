import { Injectable } from '@angular/core';
import { DocumentEffectiveConfiguration, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class DocumentEffectiveService {
  type: string = "manager";

  constructor(private http: HttpbaseService) { }
  getdocumenteffective(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/documenteffective/GetAllDocEff",this.type);
  }

  getdocumentrequestbyId(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/getdocId");
  }
  ManageDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {
    return this.http.postJsonLogin(adddocreq, "api/documenteffective/updatedocumenteffective", this.type);
  }
  getbyId(docreq: number) {        
    return this.http.getwithheader("api/documenteffective/getbyId" + "?dEID=" + docreq, this.type);
  }
}
