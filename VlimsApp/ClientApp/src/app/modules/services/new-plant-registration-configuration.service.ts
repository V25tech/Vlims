

import { Injectable } from '@angular/core';
import { PlantConfiguration, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';


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

  updateNewRegistrationconfiguration(objrequest: PlantConfiguration) {
    debugger
      return this.http.postJsonLogin(objrequest, "api/plantmanagement/UpdatePlantManagement",this.type);
    }

  getbyId(objname: number) {
    debugger
    return this.http.getwithheader("api/plantmanagement/getbyId" + "?DPCFId=" + objname, this.type);
  }
}


