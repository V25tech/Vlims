
import { Injectable } from '@angular/core';
import { RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



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
  AddNewPrintRequest(objrequest: RequestContext) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/NewPrint/AddNewPrintRequest",this.type);
}
}


