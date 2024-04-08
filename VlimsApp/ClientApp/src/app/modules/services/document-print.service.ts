import { Injectable } from '@angular/core';
import { DepartmentConfiguration, DocumentPrintConfiguration, RequestContext } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class DocumentPrintService {
  getdepartments(objrequest: RequestContext) {
    throw new Error('Method not implemented.');
  }
  type:string="manager";
  constructor(private http: HttpbaseService) { }

  GetDocumentPrint(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/GetAllDocPrint",this.type);
}
adddDocumentPrint(objrequest: DepartmentConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/documentprint/adddDocumentPrint",this.type);
}
getbyId(docreq: number) {        
  return this.http.getwithheader("api/documentprint/getbyId" + "?dEID=" + docreq, this.type);
}
UpdatePrintRequestCount(objrequest: DocumentPrintConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/documentprint/updatedocumentprintcount", this.type);
}
}
