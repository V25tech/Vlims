import { Injectable } from '@angular/core';
import { DocumentAdditionalTasks, RequestContext } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentAdditionalTasksService {

  constructor(private http: HttpbaseService) { }
  getdocumentrequest(objrequest: RequestContext) {
    debugger
    return this.http.postJsonLogin(objrequest, "api/additionaltask/GetAddtask");
  }
}
