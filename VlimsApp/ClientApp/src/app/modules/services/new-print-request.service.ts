
import { Injectable } from '@angular/core';
import { DocumentPrintConfiguration, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class NewPrintRequestService {
  type: string = "manager";
  constructor(private http: HttpbaseService) { }

  GetNewPrintRequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/GetAllDocPrint", this.type);
  }
  AddNewPrintRequest(objrequest: DocumentPrintConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/savedocumentprint", this.type);
  }
  UpdatePrintRequest(objrequest: DocumentPrintConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/updatedocumentprint", this.type);
  }

  UpdatePrintRequestCount(objrequest: DocumentPrintConfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/updatedocumentprintcount", this.type);
  }
  getbyId(docreq: number) {
    return this.http.getwithheader("api/documentprint/getbyId" + "?dEID=" + docreq, this.type);
  }
  
}


