import { Injectable } from '@angular/core';
import { RequestContext, functionalprofile } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class setfunctionalprofileconfigurationservice {
  type: string = "admin";
  constructor(private http: HttpbaseService) { }

  getsetfunctionalprofileconfiguration(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/SetFunctionalProfile/getallprofileconfig", this.type);
  }
  addsetfunctionalprofileconfiguration(objrequest: functionalprofile) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/SetFunctionalProfile/save", this.type);
  }
  update(objrequest: functionalprofile) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/SetFunctionalProfile/update", this.type);
  }
}
