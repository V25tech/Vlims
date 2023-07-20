
import { Injectable } from '@angular/core';
import { RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class LoginServicepage {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getlogindetails(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/usermanagement/GetAllUserManagement",this.type);
  }
  savelogindetails(objrequest: LoginServicepage) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/usermanagement/SaveUserManagement",this.type);
}
}

