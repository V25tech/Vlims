import { Injectable } from '@angular/core';
import { HttpbaseService } from './shared/httpbase.service';
import { RequestContext, UserConfiguration } from './model/models';

@Injectable({
  providedIn: 'root'
})
export class UsersconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getusers(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/userconfiguration/getusers",this.type);
}
adduser(objrequest: UserConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/userconfiguration/saveuserconfiguration",this.type);
}
}
