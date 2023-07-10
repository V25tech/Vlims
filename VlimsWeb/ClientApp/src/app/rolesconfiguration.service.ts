import { Injectable } from '@angular/core';
import { HttpbaseService } from './shared/httpbase.service';
import { RequestContext, RoleConfiguration } from './model/models';

@Injectable({
  providedIn: 'root'
})
export class RolesconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getroles(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/roleconfiguration/getroles",this.type);
}
addrole(objrequest: RoleConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/roleconfiguration/saveroleconfiguration",this.type);
}
}
