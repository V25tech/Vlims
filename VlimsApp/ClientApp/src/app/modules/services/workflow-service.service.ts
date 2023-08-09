import { Injectable } from '@angular/core';
import { RequestContext, workflowconiguration } from 'src/app/models/model';
import { HttpbaseService } from 'src/app/shared/httpbase.service';


@Injectable({
  providedIn: 'root'
})
export class WorkflowServiceService {
  type: string = "master";
  constructor(private http: HttpbaseService) { }
  getworkflow(objrequest: RequestContext) {
    
    return this.http.postJsonLogin(objrequest, "api/workflowconiguration/getallworkflow",this.type);
}
getbyName(objname: string) {
  
  return this.http.getwithheader("api/workflowconiguration/getbyName"+"?name="+objname,this.type);
}
getbyId(objname: number) {
  
  return this.http.getwithheader("api/workflowconiguration/getbyId"+"?wFCId="+objname,this.type);
}
addworkflow(objrequest: workflowconiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/workflowconiguration/saveworkflowconiguration",this.type);
}
update(objrequest: workflowconiguration) {
  
  return this.http.postJsonLogin(objrequest, "api/workflowconiguration/updateworkflowconiguration",this.type);
}
}
