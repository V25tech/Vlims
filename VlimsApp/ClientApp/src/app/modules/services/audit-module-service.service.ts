





import { Injectable } from '@angular/core';
import { AuditConfiguration, RequestContext } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuditConfiurationService {
  getbyId(id: number) {
    throw new Error('Method not implemented.');
  }
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getAuditModule(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/departmentconfiguration/getdepartments",this.type);
}

 

}
