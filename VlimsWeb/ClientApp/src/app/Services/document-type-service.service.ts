import { Injectable } from '@angular/core';
import { DocumentTypeConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeServiceService {

  constructor(private http: HttpbaseService) { }

  getdoctypeconfig(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/getalldoctypeconfig");
}
adddoctypeconfig(objrequest: DocumentTypeConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/documenttypeconfiguration/savedocumenttypeconfiguration");
}
}
