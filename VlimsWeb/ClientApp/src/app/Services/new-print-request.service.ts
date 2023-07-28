
import { Injectable } from '@angular/core';
import { HttpbaseService } from '../shared/httpbase.service';
import { PrintRequest, RequestContext } from '../model/models';


@Injectable({
  providedIn: 'root'
})
export class NewPrintRequestService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  GetNewPrintRequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/NewPrint/GetNewPrintRequest",this.type);
}
AddNewPrintRequest(objrequest: PrintRequest) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/NewPrint/AddNewPrintRequest",this.type);
}
}


