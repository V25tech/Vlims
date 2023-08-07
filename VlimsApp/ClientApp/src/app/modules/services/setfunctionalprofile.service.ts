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
    debugger
    return this.http.postJsonLogin(objrequest, "api/SetFunctionalProfile/getsetfunctionalprofileconfiguration", this.type);
  }
  addsetfunctionalprofileconfiguration(objrequest: functionalprofile) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/SetFunctionalProfile/saveprofileconfiguration", this.type);
  }
}
