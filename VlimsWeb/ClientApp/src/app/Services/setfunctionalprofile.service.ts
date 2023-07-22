import { Injectable } from '@angular/core';
import { RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class setfunctionalprofileconfigurationservice {
  type: string = "admin";
  constructor(private http: HttpbaseService) { }

  getsetfunctionalprofileconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/setfunctionalprofileconfiguration/getsetfunctionalprofileconfiguration", this.type);
  }
  addsetfunctionalprofileconfiguration(objrequest: setfunctionalprofileconfigurationservice) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/setfunctionalprofileconfiguration/addsetfunctionalprofileconfiguration", this.type);
  }
}
