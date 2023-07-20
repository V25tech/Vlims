
import { Injectable } from '@angular/core';
import { acticateDeactivateuser, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class ActivateDeactivateService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  get_activate_deactivateuser(objrequest: RequestContext) {
    debugger
    //Need to update correct method
    return this.http.postJsonLogin(objrequest, "api/userconfiguration/updateusermanagement", this.type);
}
add_activate_deactivate(objrequest:acticateDeactivateuser ) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/userconfiguration/updateusermanagement", this.type);
}
}


