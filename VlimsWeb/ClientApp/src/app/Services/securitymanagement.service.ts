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
    
    return this.http.postJsonLogin(objrequest, "api/securitymanagement/GetAllSecurityManagement",this.type);
}
addsecurityconfiguration(objrequest:SecurityManagement ) {
  
  return this.http.postJsonLogin(objrequest, "api/securitymanagement/savesecuritymanagement",this.type);
}
}
