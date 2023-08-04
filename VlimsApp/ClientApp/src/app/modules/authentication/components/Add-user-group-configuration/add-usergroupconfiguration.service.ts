import { Injectable } from '@angular/core';
import { RequestContext, Usergroupconfiguration } from '../../../../models/model';
import { HttpbaseService } from '../../../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class usergroupconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getusergroupconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/usergroupconfiguration/getusergroupconfiguration",this.type);
}
addusergroupconfiguration(objrequest: Usergroupconfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/usergroupconfiguration/saveusergroupconfiguration",this.type);
  }
  Updateusergroupconfiguration(objrequest: Usergroupconfiguration) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/usergroupconfiguration/updateusergroupconfiguration",this.type);
    }
  getbyId(objname: number) {
    debugger
    return this.http.getwithheader("api/usergroupconfiguration/getbyId" + "?ugcId=" + objname, this.type);
  }
}
