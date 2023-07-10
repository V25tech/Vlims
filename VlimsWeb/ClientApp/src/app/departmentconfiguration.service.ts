import { Injectable } from '@angular/core';
import { HttpbaseService } from './shared/httpbase.service';
import { DepartmentConfiguration, RequestContext } from './model/models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getdepartments(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/getdepartments",this.type);
}
adddepartment(objrequest: DepartmentConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/savedepartmentconfiguration",this.type);
}
}
