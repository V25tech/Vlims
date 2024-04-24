import { Injectable } from '@angular/core';
import { RequestContext, RoleConfiguration } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class RolesconfigurationService {
  type: string = "admin";
  constructor(private http: HttpbaseService) { }

  getroles(objrequest: RequestContext) {
    return this.http.postJsonLogin(objrequest, "api/roleconfiguration/getroles", this.type);
  }
  addrole(objrequest: RoleConfiguration) {
    return this.http.postJsonLogin(objrequest, "api/roleconfiguration/saveroleconfiguration", this.type);
  }
  Updaterole(objrequest: RoleConfiguration) {
    return this.http.postJsonLogin(objrequest, "api/roleconfiguration/updateroleconfiguration", this.type);
  }
  getbyId(objname: number) {
    return this.http.getwithheader("api/roleconfiguration/getbyId" + "?roleId=" + objname, this.type);
  }
}
