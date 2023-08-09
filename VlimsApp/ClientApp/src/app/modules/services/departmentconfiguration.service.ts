import { Injectable } from '@angular/core';
import { DepartmentConfiguration, RequestContext } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentconfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getdepartments(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/getdepartments",this.type);
}
adddepartment(objrequest: DepartmentConfiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/savedepartmentconfiguration",this.type);
  }
  update(objrequest: DepartmentConfiguration) {
  
    return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/updatedepartmentconfiguration",this.type);
    }
  getbyId(objname: number) {
    
    return this.http.getwithheader("api/departmentconfiguration/getbyId" + "?dTCId=" + objname, this.type);
  }
}
