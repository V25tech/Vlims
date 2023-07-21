

import { Injectable } from '@angular/core';
import { NewPlantRegistration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class NewPlantRegistrationConfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getNewRegistrationconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/NewRegistration/GetAllNewRegistration",this.type);
}
addNewRegistrationconfiguration(objrequest: NewPlantRegistration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/NewRegistration/SavePlantManagement",this.type);
}
}


