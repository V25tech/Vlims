import { Injectable } from '@angular/core';
import { RequestContext, Usergroupconfiguration } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class usergroupconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getusergroupconfiguration(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/UsergroupConfiguration/GetAllUserGroupConfiguration",this.type);
}
addusergroupconfiguration(objrequest: Usergroupconfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/usergroupconfiguration/saveusergroupconfiguration",this.type);
}
}
