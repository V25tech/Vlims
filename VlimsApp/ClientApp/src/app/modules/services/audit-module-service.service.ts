import { Injectable } from '@angular/core';
import { AuditConfiguration, RequestContext, RequestContext1 } from 'src/app/models/model';
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

  getAuditModule(objrequest: RequestContext1) {
    debugger  
    const type = objrequest.type; // Assuming 'type' is a property in objrequest
    return this.http.postJsonLogin(objrequest, `api/auditconfiguration/getaudit?type=${type}`,this.type);
}

getAuditModuleByEntityName(objrequest: RequestContext1) {
  debugger;
  const type = objrequest.type; // Assuming 'type' is a property in objrequest
  return this.http.postJsonLogin(objrequest, `api/auditconfiguration/getauditByEntityInfo?type=${type}`, this.type);
}



 

}
