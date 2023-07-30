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
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentpreparation/getdocId");
  }
  ManageDocumentEffective(adddocreq: DocumentEffectiveConfiguration) {
    debugger
    return this.http.postJsonLogin(adddocreq, "api/documenteffective/savedocumenteffective", this.type);
  }
}
