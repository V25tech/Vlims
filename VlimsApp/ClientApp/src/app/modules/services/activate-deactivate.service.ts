
import { Injectable } from '@angular/core';
import { activateDeactivateuser, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class ActivateDeactivateService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  get_activate_deactivateuser(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/userconfiguration/getusers", this.type);
  }
  add_activate_deactivate(objrequest: activateDeactivateuser) {
  
  return this.http.postJsonLogin(objrequest, "api/userconfiguration/updateusermanagement", this.type);
}
}


