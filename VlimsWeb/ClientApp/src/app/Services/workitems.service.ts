import { Injectable } from '@angular/core';
import { RequestContext, workflowconiguration } from '../model/models';
import { HttpbaseService } from '../shared/httpbase.service';

@Injectable({
  providedIn: 'root'
})
export class WorkitemsService {
  type: string = "master";

  constructor(private http: HttpbaseService) { }
  getworkitems(objrequest: RequestContext) {
    debugger
    //change this method
    return this.http.postJsonLogin(objrequest, "api/workitems/GetAllworkitems", this.type);
  }
  
}
