import { Injectable } from '@angular/core';
import { RequestContext, SecurityManagement } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class SecuritymanagementService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getsecuritymanagement(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/securitymanagement/GetAllSecurityManagement",this.type);
}
updatesecurityconfiguration(objrequest:SecurityManagement ) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/securitymanagement/savesecuritymanagement",this.type);
}
}
