import { Injectable } from '@angular/core';
import { RequestContext, UserConfiguration } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';



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
