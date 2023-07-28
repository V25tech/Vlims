import { Injectable } from '@angular/core';
import { DepartmentConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentPrintService {
  getdepartments(objrequest: RequestContext) {
    throw new Error('Method not implemented.');
  }
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  GetDocumentPrint(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documentprint/GetDocumentPrint",this.type);
}
adddDocumentPrint(objrequest: DepartmentConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/documentprint/adddDocumentPrint",this.type);
}
}

