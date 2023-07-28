
import { Injectable } from '@angular/core';
import { PlantConfiguration, RequestContext } from '../../models/model';
import { HttpbaseService } from '../../shared/httpbase.service';



@Injectable({
  providedIn: 'root'
})
export class PlantmanagementService {
  type:string="admin";
  constructor(private http: HttpbaseService) { }

  getplantconfiguration(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/plantmanagement/GetAllPlantManagement",this.type);
}
addplantconfiguration(objrequest: PlantConfiguration) {
  debugger
  return this.http.postJsonLogin(objrequest, "api/plantmanagement/saveplantmanagement",this.type);
}
}


