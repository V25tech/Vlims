

import { Injectable } from '@angular/core';
import { PlantConfiguration, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class NewPlantRegistrationConfigurationService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  GetPlantRegistrationconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/plantmanagement/GetAllPlantManagement",this.type);
  }
  addNewRegistrationconfiguration(objrequest: PlantConfiguration) {
  debugger
    return this.http.postJsonLogin(objrequest, "api/plantmanagement/saveplantmanagement",this.type);
}
}


