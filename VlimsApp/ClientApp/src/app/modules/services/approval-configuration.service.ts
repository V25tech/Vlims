
import { Injectable } from '@angular/core';
import { ApprovalManagament, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class ApprovalConfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getapprovalconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/approvalconfiguration/ApprovalConfiguration",this.type);
}
addapprovalconfiguration(objrequest: ApprovalManagament) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/approvalconfiguration/saveApprovalConfiguration",this.type);
}
}


