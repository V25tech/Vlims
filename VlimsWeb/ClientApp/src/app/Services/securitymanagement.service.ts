import { Injectable } from '@angular/core';
import { RequestContext, SecurityManagement } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class SecuritymanagementService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getsecuritymanagement(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/securitymanagement/GetAllSecurityManagement",this.type);
}
addsecurityconfiguration(objrequest:SecurityManagement ) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/securitymanagement/SaveSecurityManagement",this.type);
}
}
